# 容器化 Docusaurus

## 创建 Dockerfile

> 参照 [Docker Deployment](https://docusaurus.community/knowledge/deployment/docker/)，容器化一个应用，是指把应用程序打包为镜像并作为容器运行。

首先需要在 Docusaurus 项目根目录中创建一个 `Dockerfile`，这个文件包含了构建 Docker 镜像的指令。容器就像应用的沙盒，而镜像是容器的模板，包含了应用的代码极其依赖（运行时、系统工具、系统库以及设置）。

有如下 3 种方式可以容器化一个 Docusaurus 站点：
1. 在一个容器中构建站点并将输出发送到卷（Docker volume），然后使用另一个容器挂载该卷，运行 web 服务器提供该站点。
2. 在一个容器中构建站点，并使用同一个容器提供服务进程（serve process）
3. 在容器中运行 `start` 进程，并将本地源码（local source code）挂载为卷

下面将提供一个涵盖了上述三种部署方式的 `Dockerfile`，你可以通过 `docker build` 的 `--target` 指定需要使用哪一种。此外这个 `Dockerfile` 还利用了Docker 的多阶段（multi-stage build）构建，以减少镜像大小。
> 多阶段构建是指在 `Dockerfile` 中使用多个 `FROM` 指令，每个 `FROM` 指令都代表一个新的构建阶段，每个阶段都会构建一个镜像，但只保留最后一个阶段的镜像作为多阶段构建的产物。具体参见 `Docker` 文档：[multi-stage](https://docs.docker.com/build/building/multi-stage/)

```dockerfile
# syntax=docker/dockerfile:1

# 阶段 1: 准备基础镜像
## 使用包含 Node.js 运行环境的镜像以提供构建 Docusaurus 站点的工具
FROM node:lts AS base
## 禁用彩色输出以便让日志更加易读
ENV FORCE_COLOR=0
## 启用 corepack
RUN corepack enable
## 将工作目录设置为 `/opt/docusaurus`.
WORKDIR /opt/docusaurus

# 阶段 2a：开发模式
FROM base AS dev
## 把工作目录设置为 `/opt/docusaurus`.
WORKDIR /opt/docusaurus
## 暴露 Docusaurus 运行的端口（只是文档，需要在 run 中通过 -p 进行实际的端口映射）
EXPOSE 3000
## 运行开发服务器
CMD [ -d "node_modules" ] && npm run start -- --host 0.0.0.0 --poll 1000 || npm install && npm run start -- --host 0.0.0.0 --poll 1000

# 阶段 2b：生产构建模式
FROM base AS prod
## 设置工作目录 `/opt/docusaurus`.
WORKDIR /opt/docusaurus
## 从宿主机的当前目录复制源码到容器的 /opt/docusaurus 目录
COPY . /opt/docusaurus/
## 使用 `--immutable` 安装依赖确保可复现构建
RUN npm ci
## 构建站点
RUN npm run build

# 阶段 3a：提供站点 `docusaurus serve`.
FROM prod AS serve
## 暴露端口（只是文档）
EXPOSE 3000
## 运行生产服务器
CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0", "--no-open"]

# 阶段 3b：使用 Caddy 提供站点
FROM caddy:2-alpine AS caddy
## 从生产构建阶段复制 Caddyfile.
COPY --from=prod /opt/docusaurus/Caddyfile /etc/caddy/Caddyfile
## 从生产构建阶段复制输出
COPY --from=prod /opt/docusaurus/build /var/docusaurus
```

根据构建目标 `Dockerfile` 分为 2 到 3 个阶段：
+ 阶段 1 `base`：此阶段会被后面所有目标使用。此阶段拉取了一个基础镜像，启用 `corepack` 并设置工作目录。
+ 阶段 2a `dev`：此阶段安装所有依赖并启动 `start` 进程（开发服务器）。
+ 阶段 2b `build`：此阶段由 `serve` 和 `caddy` 阶段使用，会安装依赖并构建站点。 
+ 阶段 3a `serve`：此阶段复制 `build` 阶段的产物并运行 `serve` 进程（生产服务器）。
+ 阶段 3b `caddy`：此阶段复制 `build` 阶段的产物，运行 `Caddy` 服务器并提供自动 TLS 加密。

如果需要 `Caddy` 部署（阶段 3b），需要在项目根目录中新建配置文件 `caddyfile`
> Caddy 默认使用 HTTPS 提供服务。如果无法从 [Let's Encrypt](https://letsencrypt.org/) 获取证书，就会使用自签名证书。你需要设置 2 个环境变量 `DOCUSAURUS_EMAIL` 和 `DOCUSAURUS_DOMAIN`（可以通过 `docker run` 或者 `compose.yaml` 中传递）。其中 `{$DOCUSAURUS_DOMAIN}` 是网站域名
```caddyfile
{$DOCUSAURUS_DOMAIN:localhost} {
  root * /var/docusaurus
  encode gzip
  try_files {path} /index.html
  file_server
  email: {$DOCUSAURUS_EMAIL}
}
```

## 构建 Docker 镜像

运行如下命令以构建镜像
```bash
docker build --target <target> -t <tag> .
```
+ `docker build`：构建镜像的命令
+ `--target <target>`：指定构建目标，指的是 `Dockerfile` 中的阶段名，可选的有 `dev`、`serve`、`caddy`
+ `-t <tag>`：镜像的标签，格式是 `<name>:<tag>`（方便推送到 Docker Hub），不指定 `<tag>` 默认是 `latest`。
+ `.`：使用当前目录作为构建上下文（一般是项目根目录，也是 Dockerfile 所在目录）

## 运行容器

`dev` 阶段
```
docker run --rm -d -p 3000:3000 -v $(pwd):/opt/docusaurus <tag>
```

+ `docker run`：从镜像启动容器的命令
+ `--rm`：当容器退出时删除容器
+ `-d`：在后台运行容器
+ `-p 3000:3000`：端口映射 `<host>:<container>`
+ `-v $(pwd):/var/docusaurus`：把当前目录挂载为容器的卷
+ `<tag>`：容器使用的镜像

## 使用 Docker Compose 运行应用

[Docker Compose]() 是定义和运行多容器 Docker 应用的方式。通过 Compose，可以在一个 `YAML` 文件中配置应用服务。然后使用单个命令，创建并启动服务。虽然这里没有运行多个容器，但是可以使用 Compose 让运行容器简单点。

需要在项目根目录中创建 `docker-compose.yaml` 以使用 Compose。

下面是 `dev` 阶段的 Compose 文件：
```
name: "docusaurus"
services:
    dev:
        build:
            context: .
            target: dev
        ports:
            - "3000:3000"
        volumes:
            - .:/opt/docusaurus
        environment:
            - NODE_ENV=development
```

启动应用
```
docker compose --file <composefile> up -d --build
```

+ `docker compose`：运行一个 Compose 应用
+ `--file <composefile>`：指定 Compose 文件。
+ `up`：启动容器
+ `-d`：在后台运行
+ `--build`（可选）：强制重新构建