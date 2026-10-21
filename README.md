# Naive Ui Admin

## 🚀 简介

`Naive Ui Admin` 是一款基于 MIT 协议开源、可免费商用的中后台解决方案，基于 Vue 3、Vite、Naive UI 和 TypeScript 构建。

它融合了最新的前端技术栈，提炼了典型的业务模型和页面，包括二次封装组件、动态菜单、权限校验等功能，助力快速搭建企业级中后台项目。项目自 2021 年发布，已持续维护五年。

> 3.0.0 包含破坏性变更（依赖大版本升级、路由 `meta.title` 改为 i18n key 等），升级前请先阅读 [CHANGELOG](./CHANGELOG.md)。

## 🌈 特性
📦 二次封装的实用高扩展性组件
🎨 响应式、多主题、多配置，快速集成，开箱即用
🚀 支持前端固定路由 / 后端动态菜单两种路由权限模式，并提供按钮级权限控制
🌍 内置简体中文 / English 国际化，顶栏可实时切换
🌐 持续更新的实用性页面模板和交互设计，简化页面构建


## 🎥 预览
- [naive-ui-admin](https://gratis.naiveadmin.com)

账号：admin，密码：123456（随意）


## 💼 Naive Admin 商业版

> 商业版与开源版是相互独立的产品线，无代码继承，源码不公开。

| 交付形态 | 档位 | UI 组件库 | 后端 | 在线预览 |
| --- | --- | --- | --- | --- |
| 前端版 | Max | Naive UI | — | [max.naiveadmin.com](https://max.naiveadmin.com) |
| 前端版 | Next | AntdvNext | — | [next.naiveadmin.com](https://next.naiveadmin.com) |
| 全栈版 | Max | Naive UI | PHP / Laravel | [max-full.naiveadmin.com](https://max-full.naiveadmin.com) |
| 全栈版 | Next | AntdvNext | PHP / Laravel | [next-full.naiveadmin.com](https://next-full.naiveadmin.com) |

一次买断，全量源码交付，享一年免费更新。价格与活动以官网为准。

[商业版官网](https://www.naiveadmin.com) · [更新日志](https://www.yuque.com/u5825/zaqu0e) · [常见问题](https://www.yuque.com/u5825/qg1lta)


## 📚 文档

[开源版本文档](https://docs.naiveadmin.com)

## 🛠 准备

- [Node.js](https://nodejs.org/) 和 [Git](https://git-scm.com/) - 项目开发环境（Node `>=20.19.0`）
- [pnpm](https://pnpm.io/) - 包管理器（`>=10`）
- [Vite](https://vite.dev/) - 熟悉 Vite 特性
- [Vue 3](https://vuejs.org/) - 熟悉 Vue 基础语法
- [TypeScript](https://www.typescriptlang.org/) - 熟悉`TypeScript`基本语法
- [ES6+](https://es6.ruanyifeng.com/) - 熟悉 ES6 基本语法
- [Vue Router](https://router.vuejs.org/) - 熟悉 Vue Router 基本使用
- [Naive UI](https://www.naiveui.com/) - UI 基本使用
- [@alova/mock](https://alova.js.org/extension/alova-mock) / [@faker-js/faker](https://fakerjs.dev/) - mock 数据与造数


## 🏗️ 使用

- 获取项目代码

```bash
git clone https://github.com/jekip/naive-ui-admin.git
```

- 安装依赖

```bash
cd naive-ui-admin

pnpm install

```

- 运行

```bash
pnpm run dev
```

- 打包

```bash
pnpm build          # 生产包（默认携带 mock 数据，无需后端即可部署演示）
pnpm build:no-cache # 清缓存后重新构建
```

构建结束后会自动输出体积报告（首屏静态资源，含 gzip / brotli）：

```bash
pnpm size    # 只输出体积报告
pnpm report  # 额外生成 rollup-plugin-visualizer 报告到 .analyze/
```

> 首屏体积受 CI 体积预算保护（gzip ≤ 500KB），超限即失败。
> 默认 `VITE_USE_MOCK=true`，接口全部走本地 mock，产物约 458KB（gzip）。
> 接入真实后端时把 `.env.production` 的 `VITE_USE_MOCK` 改为 `false`，
> mock 数据与 `@faker-js/faker`、`mockjs` 会被完整摇掉，首屏降至约 239KB。

- 类型检查与代码检查

```bash
pnpm type-check     # vue-tsc 类型检查（只读）
pnpm lint:eslint    # ESLint（flat config，自动修复）
pnpm lint:stylelint # Stylelint（自动修复）
```

> 两个 lint 脚本都会加 `--fix` 修改文件；CI 中使用的是不带 `--fix` 的只读检查（`pnpm exec eslint` / `pnpm exec stylelint`）。

## 🌍 国际化（i18n）

基于 `vue-i18n@11`，内置 **简体中文 / English**。顶栏可实时切换，选择会持久化到 `localStorage`（`LOCALE__KEY__`），并同步 Naive UI 的 `locale` / `date-locale`。

已接入范围：路由菜单、面包屑、多页签、顶栏、项目配置面板、登录页、关于页。业务页面与 `src/components` 扩展组件保持原样，由使用方按需接入。

路由标题使用 i18n key（如 `route.dashboard_console`），词条位于 `src/locales/lang/<locale>/route.ts`。后端动态菜单同样保留原始 `title`：返回 key 时跟随切换，返回纯中文标题时因未命中语言包而原样显示。

最小接入示例：

```ts
// src/locales/lang/zh-CN/common.ts
export default {
  welcome: '欢迎',
};

// src/locales/lang/en-US/common.ts（英文包由 satisfies 约束，漏翻会在 type-check 报错）
export default {
  welcome: 'Welcome',
};
```

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <div>{{ t('common.welcome') }}</div>
</template>
```

非组件环境（路由生成、菜单转换等）可使用 `src/locales/index.ts` 导出的 `tr()`。更多说明见 [文档](https://docs.naiveadmin.com)。

## 📜 更新日志

[CHANGELOG](./CHANGELOG.md)


## 🤝 如何贡献

非常欢迎你的加入！[提一个 Issue](https://github.com/jekip/naive-ui-admin/issues) 或者提交一个 `Pull Request`

**Pull Request:**

1. Fork 代码!
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交`pull request`

## 📋 Git 贡献提交规范

- 参考 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/) 规范（[Angular 约定](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular)）

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `docs` 文档/注释
  - `style` 代码风格相关无影响运行结果的
  - `refactor` 重构
  - `perf` 优化/性能提升
  - `test` 测试相关
  - `build` 构建/依赖变更
  - `ci` 持续集成
  - `chore` 依赖更新/脚手架配置修改等
  - `revert` 撤销修改

  > 以上类型由 `commitlint.config.cjs` 校验，未列出的类型会被 `commit-msg` 钩子拒绝。

## 🌐 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 👥 维护者
[@Ah jung](https://github.com/jekip)

## 💬 交流

有关 `Naive Ui Admin` 的使用或其他问题，可以加入讨论群交流问题

QQ1群：328347666 （已满）
QQ2群：741353560

## 💖 赞助
#### 如果项目有帮到你，不妨请作者喝一杯咖啡吧！

![donate](https://assets.naiveadmin.com/assets/images/sponsor.png)
[Paypal Me](https://www.paypal.com/paypalme/majunping)
