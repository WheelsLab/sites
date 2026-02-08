# 裸机编程

本系列教程将**不依赖 ST 官方库（SPL / HAL）**，从零开始编写 STM32 裸机代码。
 目标不是“重复造轮子”，而是**拆解轮子是如何转起来的**，以便真正理解 MCU 开发的底层机制。

目的是探索背后的原理。

+ 当你理解并掌控每一个细节时，后期维护往往会变得更轻松。
+ 也能减少被迫花时间去排查那些测试不足、文档不全、甚至本身就有问题的底层库。

裸机开发并不依赖特定 IDE。你可以：

- 使用任意文本编辑器 + **Arm GCC 工具链**
- 或者使用 IDE（如 **Arm Keil**）

 无论如何，都需要理解几个关键概念：

+ 内存是如何被组织与映射的
+ MCU 外设的工作机制与寄存器模型
+ 编译后生成的二进制代码布局
+ 链接脚本如何定义并生成这些布局
+ 向量表、中断机制与弱符号的作用
+ CMSIS 头文件的角色：Arm 内核抽象与厂商外设描述

## 参考资料：

+ [A bare-metal programming guide](https://developer.arm.com/community/arm-community-blogs/b/internet-of-things-blog/posts/a-bare-metal-programming-guide) ---> GitHub@cpq [bare-metal-programming-guide](https://github.com/cpq/bare-metal-programming-guide)
+ [What are CMSIS software components?](https://developer.arm.com/community/arm-community-blogs/b/tools-software-ides-blog/posts/what-are-cmsis-software-components)
+ [What is CMSIS?](https://www.keil.arm.com/cmsis)
