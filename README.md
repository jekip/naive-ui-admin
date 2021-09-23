## 通知

自`Naive Ui Admin`发布`1.x`版本之后，受到了许多小伙伴使用和热爱，当中也收到了不少的建议和反馈，比如：文档访问稳定性，详细程度，组件和页面丰富性，版本更新频率等...
至此我们团队为了给大家更好的体验，以及能够真正做一款相对完善的`开箱即用中后台框架`，我们从`2021-08-14`号，决定停止更新`1.x`版本，重点构造一个`全新v2大版本`，
并更名为`NaiveAdmin`，发布将定义为商业版本，详情可移步官网查看 [NaiveAdmin](https://www.naiveadmin.com)，感谢大家给予的每一个建议包括，Pr，Star，
谢谢大家支持！

## 💄 v2更新如下
### ✨ Features
🔥🔥🔥 代码重构 `script setup` 语法，源码更加易读，性能更优，ts 类型更加全面
#### 💻 页面
- 🌟 `全新登录/注册页面`
- 🌟 `全新主控台页面`
- 🌟 `用户管理`
- 🌟 `字典管理`
#### ✨ 优化
- 🌟 `主结构布局优化`
- 🌟 `表格主从结构`
- 🌟 `多标签页可关闭左右侧标签`
- 🌟 `多标签页可自动滚动到当前页面`
- 🌟 `弹窗组件拖拽可配置`
#### 🏷️ 功能
- 🌟 `右键菜单`
- 🌟 `文件下载`
- 🌟 `Excel导出`
- 🌟 `剪贴板`
- 🌟 `打印`
- 🌟 `滚动条`
- 🌟 `消息通知`
- 🌟 `主控台图表示例`
- 🌟 `引导`
- 🌟 `修改密码`
- 🌟 `固定主体区域可配置`
- 🌟 `pinia 持久化存储`
#### 📦 组件
- 🌟 `省市区`
- 🌟 `顶部搜索`
- 🌟 `二维码`
- 🌟 `密码强度`
- 🌟 `图片裁剪，支持圆形矩形`
- 🌟 `选择器增强，支持缓存`


## 关于本仓库
该仓库将不再添加新功能，只修bug（过程可能会慢一些），有效pr会合并，所以当你选择这个版本的时候，需要衡量一下。

## 简介

[Naive Ui Admin](https://github.com/jekip/naive-ui-admin) 是一个基于 [Vue3.0](https://github.com/vuejs/vue-next)、[Vite](https://github.com/vitejs/vite)、 [Naive UI](https://www.naiveui.com/)、[TypeScript](https://www.typescriptlang.org/) 的中后台解决方案，它使用了最新的前端技术栈，并提炼了典型的业务模型，页面，包括二次封装组件、动态菜单、权限校验、粒子化权限控制等功能，它可以帮助你快速搭建企业级中后台项目，相信不管是从新技术使用还是其他方面，都能帮助到你。

## 特性
- **最新技术栈**：使用 Vue3/vite2 等前端前沿技术开发
- **TypeScript**: 应用程序级 JavaScript 的语言
- **主题**：可配置的主题
- **Mock 数据** 内置 Mock 数据方案
- **权限** 内置完善的动态路由权限生成方案
- **组件** 二次封装了多个常用的组件


## 在线预览
- [naive-ui-admin](https://naive-ui-admin.vercel.app)

账号：admin，密码：123456（随意）

## 文档

[文档地址](https://naive-ui-admin-docs.vercel.app) 

## 准备

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [Vite](https://vitejs.dev/) - 熟悉 vite 特性
- [Vue3](https://v3.vuejs.org/) - 熟悉 Vue 基础语法
- [TypeScript](https://www.typescriptlang.org/) - 熟悉`TypeScript`基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Vue-Router-Next](https://next.router.vuejs.org/) - 熟悉 vue-router 基本使用
- [Naive-ui-admin](https://www.naiveui.com/) - ui 基本使用
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs 基本语法

## 安装使用

- 获取项目代码

```bash
git clone https://github.com/jekip/naive-ui-admin.git
```

- 安装依赖

```bash
cd naive-ui-admin

yarn install

```

- 运行

```bash
yarn dev
```

- 打包

```bash
yarn build
```

## 更新日志

[CHANGELOG](./CHANGELOG.md)


## 如何贡献

非常欢迎你的加入！[提一个 Issue](https://github.com/jekip/naive-ui-admin/issues) 或者提交一个 Pull Request。

**Pull Request:**

1. Fork 代码!
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交`pull request`

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

## 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 维护者
[@Ah jung](https://github.com/jekip)

## 交流

`Naive Ui Admin` 是完全开源免费的项目，在帮助开发者更方便地进行中大型管理系统开发，同时也提供 QQ 交流群使用问题欢迎在群内提问。

- QQ 群 `328347666`

## 赞助
#### 如果你觉得这个项目帮助到了你，你可以帮作者买一杯果汁表示鼓励 🍹。

![donate](https://jekip.github.io/docs/images/sponsor.png)
