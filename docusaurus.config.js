// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'WheelsLab',
  tagline: 'Learning computer systems by building them from scratch.',
  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://WheelsLab.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/doc',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'WheelsLab', // Usually your GitHub org/user name.
  projectName: 'doc', // Usually your repo name.
  deploymentBranch: "github-pages",
  trailingSlash:false,

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/WheelsLab/doc/tree/master',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/WheelsLab/doc/tree/master',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.27/dist/katex.css',
      type: 'text/css',
      integrity:
        'sha384-m7LqaUc4JRc2uA7D4zSVUs/sgkYhmOOe9+Gd8DFmmAXH8vzs15fmw05YXvpxsoQB',
      crossorigin: 'anonymous',
    },
  ],
  themeConfig: // https://docusaurus.io/docs/api/themes/configuration
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: { // 文档插件配置
        sidebar: {
          hideable: true, // 在侧边栏显示一个隐藏/显示按钮
          autoCollapseCategories: false, // 自动折叠你所导航到类别的兄弟类别
        }
      },
      blog: { // 博客插件配置
        sidebar: {
          groupByYear: true, // 按年分组侧边栏博客文章
        }
      },
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: { // 颜色模式设置，支持浅色和深色模式
        respectPrefersColorScheme: true, // 主题根据用户的系统设置变化
      },
      navbar: { // 导航栏配置
        title: 'WheelsLab', // 导航栏标题
        logo: { // 网站徽标（更多属性参考 https://docusaurus.io/docs/api/themes/configuration#navbar-logo）
          alt: 'My Site Logo', // Logo 图片的 Alt 标签
          src: 'img/favicon.png', // Logo 图片的 URL
          srcDark: 'img/favicon.png', // 深色模式的 Logo 图片 URL
          href: '/', // 点击 Logo 时跳转到的 URL
        },
        hideOnScroll: true, // 自动隐藏导航栏
        items: [ // 导航栏项目列表
          {
            type: 'dropdown', // 下拉菜单
            label: '知识库',
            position: 'left',
            items: [
              {
                type: 'docSidebar', // 文档侧边栏
                sidebarId: 'csCompleteSidebar',
                label: 'CS 补完计划',
              },
              {
                type: 'docSidebar',
                sidebarId: 'linuxplaySidebar',
                label: 'Linux 折腾笔记',
              },
              {
                type: 'docSidebar',
                sidebarId: 'scientificNetworking',
                label: '科学上网',
              },
              {
                type: 'docSidebar',
                sidebarId: 'miscellaneous',
                label: '杂项'
              },
              {
                to: 'docs/about-this-site',
                label: '关于本站',
              },
            ]
          },
          {to: '/blog', label: '博客', position: 'left'},
          // {
          //   type: 'search',
          //   position: 'right',
          // },
          // { // 自定义 Navbar item
          //   type: 'html',
          //   position: 'right',
          //   value: '<button>Give feedback</button>',
          // },
          {
            href: 'https://github.com/WheelsLab/doc',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档',
            items: [
              {
                label: 'CS 补完计划',
                to: '/docs/cs-complete',
              },
            ],
          },
          {
            title: '社交网站',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/',
              },
              {
                label: 'X',
                href: 'https://x.com/',
              },
            ],
          },
          {
            title: '其他',
            items: [
              {
                label: '博客',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/WheelsLab',
              },
            ],
          },
        ],
        copyright: `Copyleft © ${new Date().getFullYear()} Wheels Lab. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.vsDark,
        additionalLanguages: ["c", "cpp", "markdown"]
      },
      tableOfContents: { // 目录标题显示的层级
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
    //   announcementBar: { // 网站顶部的公告栏
    //   id: 'support_us',
    //   content:
    //     'We are looking to revamp our docs, please fill <a target="_blank" rel="noopener noreferrer" href="#">this survey</a>',
    //   backgroundColor: '#fafbfc',
    //   textColor: '#091E42',
    //   isCloseable: false,
    // },
    }),
  markdown: { // 
    // format: 'detect' // 自动检测文档格式，`.md` 使用 CommonMark（CommonMark 支持是实验性的），`.mdx` 使用 MDX 编译器。
    mermaid: true, // 代码块中使用流程图
  },
  themes: [
    '@docusaurus/theme-mermaid', // mermaid 插件
  ]
};

export default config;
