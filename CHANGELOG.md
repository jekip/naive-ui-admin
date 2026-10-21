# CHANGELOG

## 3.0.0（2026-10-21）

本次为基础设施现代化改造，包含破坏性变更，升级前请阅读下方"破坏性变更"。

### 🚀 包体优化（首屏 gzip：默认 458KB，关闭 mock 后 239KB，预算 500KB）

- **mock 可一键摇掉**：本项目定位为面向开发者的演示模板，`.env.production` 默认 `VITE_USE_MOCK=true` 以保留无后端演示能力；接入真实后端时改为 `false`，`@faker-js/faker` + `mockjs` 等 mock 依赖（约 220KB gzip）会被完整摇掉，首屏 gzip 458KB → 239KB
- **删除 naive-ui 全局注册**（`src/plugins/naive.ts`）：此前 66 个组件被整包注册，`unplugin-vue-components` 的按需引入完全失效
- **重写分包策略**：`manualChunks` 由「整库成块」改为只固定框架基座，naive-ui 与业务模块按路由自然分割，避免 1MB 的 naive-ui 块被入口同步引用
- **echarts 精简按需注册**：只保留 Bar / Line / Pie 与 Grid / Tooltip / Legend / Title，其余图表与组件改为注释可选（817KB → 578KB）
- 新增 `scripts/report-bundle-size.mjs`：统计首屏静态闭包体积（含 gzip / brotli），支持 `BUNDLE_BUDGET_KB` 体积预算，`pnpm build` 后自动输出
- 新增 `pnpm size` / `pnpm report`（`rollup-plugin-visualizer` 输出到 `.analyze/`）
- CI 增加体积预算校验：首屏 gzip 超过 500KB 直接失败

### 🌍 国际化（i18n）

- 接入 `vue-i18n@11`，内置 `zh-CN` / `en-US`；顶栏新增语言切换入口，选择持久化到 `localStorage`，首次访问按浏览器语言推断
- `naive-ui` 的 `locale` / `date-locale` 跟随当前语言切换（日期选择器、空状态等组件文案同步）
- 路由菜单国际化：`src/router/modules/*.ts` 的 `meta.title` 改为 i18n key（如 `route.dashboard_console`），侧边菜单 / 面包屑 / 多页签统一翻译，切换语言即时生效
- 后端返回的动态菜单若仍是中文标题，未命中语言包时原样回显，不会把 key 暴露给用户
- 语言包拆分到 `src/locales/lang/<locale>`，默认语言（`zh-CN`）随首屏加载，其余语言按需异步加载，不影响首屏体积
- 英文语言包使用 `satisfies typeof zhMessages` 约束，漏翻会在 `pnpm type-check` 阶段直接报错
- 已翻译范围：菜单与框架层（顶栏、多页签、项目配置面板、登录页、关于页）、浏览器标签页标题；页脚组件当前版本未启用；业务页面与 `src/components` 扩展组件保持原样，由使用方按需接入（README「国际化」章节有接入示例）
- 修复菜单不翻译：`NMenuOption` 渲染的是 option 的 `title` 字段而非 `label`，菜单对象由 `...meta` 展开后 `title` 仍是 i18n key，导致侧边菜单始终显示 `route.xxx`；现 `label` 与 `title` 统一赋翻译后的文案
- 修复首次切换语言时侧边菜单不刷新：`setLocale` 先更新 Pinia 状态、后加载语言包，菜单 watcher 会在 i18n 切到新语言前触发；现改为先 `await` 语言包加载与 i18n 切换，再更新响应式状态
- 修复浏览器标签页标题显示 i18n key（`router/guards.ts` 中 `document.title` 现走 `tr()`）
- 后端动态菜单不再在登录时预翻译：`src/router/generator.ts` 保留后端返回的原始 `meta.title`，菜单/面包屑渲染时再翻译，因此 BACK 模式下切换语言也能实时生效；纯中文标题未命中语言包时原样回显
- 项目配置面板的动画类型下拉改为按当前语言显示（`layout.setting.animate.*`）

### 🎨 登录页重构

- 重新设计 `src/views/login/index.vue`：由「居中浮空卡片 + 全屏装饰动画」改为「左侧品牌区 / 右侧表单区」的分栏布局
- 移除全部装饰元素与动效：波浪、漂浮几何图形、按钮 ripple、卡片悬浮位移、`animate.css` 入场类（依赖本就未安装，类名无效）
- 主题联动：通过 `useThemeVars()` 把主题色 / 背景色 / 边框色透传为 CSS 变量，登录页自动跟随系统主题色与深色模式
- 表单增强：回车提交、用户名自动聚焦（改用 `NInput` 实例 `focus()`，不再 `querySelector`）、按钮 loading 防重复提交、请求异常兜底提示
- 小屏（< 960px）自动收起品牌区，只保留居中表单卡片

### ✨ 工程化

- 新增 `type-check` 脚本（`vue-tsc --noEmit`），项目历史上第一次真正做类型检查
- 新增 GitHub Actions CI（安装依赖 → 类型检查 → ESLint → Stylelint → 构建）
- 新增 `eslint.config.mjs`（ESLint 10 flat config），删除 `.eslintrc.js` / `.eslintignore`
- 新增 `commitlint.config.cjs`、`.cz-config.js`，补装缺失的 `cz-customizable`
- 新增 `.husky` 钩子（`pre-commit` 跑 lint-staged、`commit-msg` 跑 commitlint），并补上 `prepare` 脚本
- 新增 `pnpm-workspace.yaml`，声明 `allowBuilds`（esbuild），解决新版 pnpm 默认拦截构建脚本导致装完跑不起来的问题
- 修复 `build` 脚本依赖了未声明的 `chalk`、`fs-extra`（此前靠依赖提升侥幸可用）

### ⬆️ 依赖升级

- `vite` 5.4 → 7.3，`@vitejs/plugin-vue` 3.2 → 6.0，`@vitejs/plugin-vue-jsx` 2.1 → 5.1
- `typescript` 4.9 → 5.9，新增 `vue-tsc` 3.3
- `eslint` 8 → 10、`stylelint` 14 → 17（补 `postcss-html` / `postcss-less`）、`prettier` 2 → 3
- `unplugin-vue-components` 0.22 → 32、`husky` 8 → 9、`lint-staged` 13 → 17、`commitlint` 17 → 21、`rimraf` 3 → 6、`gh-pages` 4 → 6
- `vue` 3.5.21 → 3.5.44、`naive-ui` 2.43 → 2.45、`vue-router` → 4.6、`alova` → 3.5、`@vueuse/core` 9 → 15、`echarts` 5 → 6、`date-fns` 2 → 4

### 🐛 修复

- 移除 `vue-types`：`vue-types@4` 会破坏 Vue 3.5 的 props 类型推断，导致 `BasicTable` 可编辑单元格等组件 props 全部塌成 `{}`
- 修复 `BasicUpload` 读取了不存在的 `globSetting.imgUrl`（应为 `fileUrl`），图片地址拼接一直是错的
- 修复生产环境 `.env.production` 仍使用旧变量名 `VITE_GLOB_IMG_URL`（代码读取的是 `VITE_GLOB_FILE_URL`），导致上传/图片前缀为 `undefined`
- 清理 `types/global.d.ts` 中已废弃的 `VITE_GLOB_PROD_MOCK` / `VITE_GLOB_IMG_URL` 声明，补充 `VITE_GLOB_FILE_URL`
- `tsconfig.json` 的 include 指向 `vite.config.mts`，修复配置文件类型检查被跳过
- 登录页、关于页、登录/404 路由标题接入 i18n；关于页版本号与技术栈描述更新为当前实际（Vue 3 / Vite 7 / TypeScript），预览站点链接修正为 `gratis.naiveadmin.com`
- 修复 `CreateDrawer` 未暴露 `openDrawer`，父组件通过 ref 调用在部分场景失效
- 修复 `zoom.less` 中 `transition: opacity 0.1`（缺单位）
- 修复登录后锁屏定时器类型导致的 `clearInterval` 重载错误
- 修复 `downloadFile` 中 `canvas.toBlob` 返回 null 时的空指针
- 清理 `BasicSetting` / `EmailSetting` / `RevealSetting` / `system.vue` 中的未使用导入与死代码

### 💥 破坏性变更

- 路由 `meta.title` 语义变更：由中文文案改为 i18n key（如 `'主控台'` → `'route.dashboard_console'`）。自定义路由请同步调整，或在 `src/locales/lang/<locale>/route.ts` 中补上对应词条
- `vite.config.ts` 改名为 `vite.config.mts`（体积分析插件为纯 ESM，需以 ESM 方式加载配置）
- 默认构建携带 mock：`.env.production` 的 `VITE_USE_MOCK` 默认 `true`（面向开发者演示，无需后端即可跑通）。接入真实后端时请改为 `false` 并配置 `VITE_GLOB_API_URL`；`pnpm build` 即演示包，无需额外的 demo 配置
- 品牌变量调整：`.env` 中 `VITE_GLOB_APP_TITLE` 为 `Naive Ui Admin`、`VITE_GLOB_APP_SHORT_NAME` 为 `NaiveAdmin`。浏览器标签标题随之变化；`VITE_GLOB_APP_SHORT_NAME` 同时决定生产环境 `app.config.js` 的全局变量名，请与部署侧保持一致
- Node 要求提升到 `>=20.19.0`，pnpm 要求 `>=10`
- 删除 `src/utils/propTypes.ts` 及 `vue-types` 依赖，请改用 Vue 原生 props 声明
- 依赖 `dayjs` 被移除（统一使用 `date-fns`）；`qs`、`vue-draggable-next`、`jest` 等未使用依赖一并移除
- ESLint 配置改为 flat config（不再读取 `.eslintrc.js`）

## 2.1.0

- 优化 `登录页面` 排版
- 新增 `构建分包策略`
- 新增 `useLocalSetting` hook
- 依赖升级

## 2.0.0

- 新增 `alova` 请求库
- 新增 `@faker-js/faker` 可配合 `mock` 数据模拟
- 新增 `VITE_USE_MOCK` 环境变量-开启 `mock` 
- 新增 `demo` 实例，新增/编辑角色
- 移除 `axios` 请求封装，使用 `alova` 代替
- 移除 `vite-plugin-mock` 使用 `@alova/mock` 代替
- 移除 `VITE_GLOB_PROD_MOCK` 环境变量
- 变更 `VITE_GLOB_IMG_URL` 环境变量变更成 `VITE_GLOB_FILE_URL` 
- 优化 `BasicTable` 组件相关样式
- 优化 `TS` 类型定义
- 依赖升级

## 1.9.2

- 升级 `vite` 到 `5.x` 版本
- 优化 `BasicTable` 组件，编辑样式
- 新增 `BasicTable` 组件，支持 `striped` 入参
- 依赖升级

## 1.9.1

- 优化 `typeSctipt` 类型定义
- 优化 `setup` 语法
- 依赖升级

## 1.9.0

- 新增 `BasicForm` 组件，支持 `setLoading`, `setSchema` 方法
- 新增 `countField` 总数字段名配置
- 优化 `yarn` 切换至 `pnpm`
- 优化 `BasicForm` 组件，验证返回值
- 优化 `BasicTable` 组件
- 修复 `TableAction组件，左右间隔不生效` 关闭[253](https://github.com/jekip/naive-ui-admin/issues/253)
- 修复 `BasicTable组件没有数据会一直请求接口` 关闭[#251](https://github.com/jekip/naive-ui-admin/issues/251)
- 修复 `useModal+useForm组件的bug` 关闭[#250](https://github.com/jekip/naive-ui-admin/issues/250)
- 修复 `手机端侧边导航风格不一致bug` 关闭[#247](https://github.com/jekip/naive-ui-admin/issues/247)
- 移除 `yarn.lock` 文件
- 依赖升级

## 1.8.2

- ### ✨ Features
- 新增 `directive` 示例
- 依赖升级

### 🐛 Bug Fixes
- 修复 `样式异常` 图片

## 1.8.1

- ### ✨ Features
- 新增 `clean:cache` 删除缓存命令
- 新增 `clean:lib` 删除 `node_modules` 命令
- 依赖升级

### 🐛 Bug Fixes
- 修复 `开发环境` 运行控制台错误提示

## 1.8.0 (2022-04-01)

- ### ✨ Features
- 新增 `多页签` 支持配置 `affix` 固定属性
- 新增 `usePage` Hooks
- 表格列支持 `draggable` 配置拖拽 合并 [#114](https://github.com/jekip/naive-ui-admin/pull/114)
- 依赖升级

### 🐛 Bug Fixes
- 修复 `多页签` 关闭全部缺陷
- 修复 `多页签` 跳转缺陷（记得清空多页签缓存）
## 1.7.0 (2022-02-14)

### 🐛 Bug Fixes
- 移除 `登录页面` 滑动验证组件
- 修复 `BasicUpload` 组件，回显问题
- 修复 `ts类型` 配置缺陷
- 修复 `登录页面` message 交互缺陷
- 修复 `表格编辑` 时间格式化异常 [#92](https://github.com/jekip/naive-ui-admin/issues/92)

- ### ✨ Features
- 依赖升级

## 1.6.1 (2022-01-06)

### 🐛 Bug Fixes
- 修复 `项目配置` 打开空白
- 修复 `多标签` 背景和字体色变量丢失

- ### ✨ Features
- 依赖升级

## 1.6.0 (2021-12-24)

### 🐛 Bug Fixes
- 修复 `低版本浏览器` 报 globalThis 未定义
- 修复 `Axios` api地址拼接异常
- 修复 `createStorage存在prefixKey` 会出bug

- ### ✨ Features
- 破坏 `Axios` 取消默认导出 `http` 可支持多个请求导出
- 搜索 `import http from '@/utils/http/axios'` 替换为 `import { http } from '@/utils/http/axios`
- 新增 `Axios` 多项配置 `urlPrefix`，`joinTime`，`ignoreCancelToken`，`withToken`，`uploadFile方法`
- 依赖升级

## 1.5.5 (2021-08-14)

### 🐛 Bug Fixes
- 修复路由只存在一个子路由，图标不显示问题
- UI样式美化

- ### ✨ Features
- 支持 Vue 3.2.x 
- 代码全部按 `script setup` 语法重写（完成80%）  
- 新增 `回到顶部` 功能  
- 新增 `拖拽` 示例页面
- 新增 `富文本` 组件
- 新增 `路由切换动画` 可在项目设置切换  
- 依赖升级

# CHANGELOG

## 1.5.4 (2021-08-10)

### 🐛 Bug Fixes

- `暗色模式下多页签背景问题 ` 合并 [#23](https://github.com/jekip/naive-ui-admin/pull/23) 感谢 [@Dishone](https://github.com/Dishone)
- `表格设置列，重复添加action列样式错乱问题` 合并 [#24](https://github.com/jekip/naive-ui-admin/pull/24) 感谢 [@CasbaL](https://github.com/CasbaL)

- ### ✨ Features
- 新增 `路由支持（内联外部地址）`配置
- 新增 `顶部菜单` logo展示
-（破坏性更新）
- 优化 `动态路由配置` 取消`constantRouterComponents.ts`，中组件映射配置，更名为 `router-icons.ts`
- 优化 `admin_info接口结构`，roles 更名为：permissions，roles.roleName，更名为：label
- 优化 多级路由，当没有配置`redirect`时，默认为第一个子路由，配置则优先按配置
- 依赖升级

# 1.5.3 (2021-08-09)
### 🐛 Bug Fixes
- 修复顶部菜单，选中联动
- 修复混合菜单模式，切换其他模式菜单未重置
- 实例基础列表，和表格组件实例，开启横向滚动特性
- `naiveui` 升级成最新版

- ### ✨ Features
- table组件，默认开启 `ellipsis` 特性



# 1.5.2 (2021-08-06)
### 🐛 Bug Fixes
- 修复已知bug

- ### ✨ Features
- 新增 `混合菜单模式`
- 新增 `根路由`
- 新增 `关于` 根路由示例页面
- 文档同步更新，组件和示例



# 1.5.1 (2021-08-05)
### 🐛 Bug Fixes
- 修复windows系统获取项目换行符问题
- 修复表格分页计算问题 [@Chika99](https://github.com/Chika99)
- 修复锁屏样式自适应问题 [@Chika99](https://github.com/Chika99)
- 依赖 dayjs 移除，用date-fns，和UI框架底层保持一致
- 修复已知bug 

- ### ✨ Features
- 新增 `baseForm` 组件，和`基础`，`useForm`使用方式
- 新增 `baseModal`，组件，和 `useForm`使用方式  
- 新增`子菜单` new Tag标签
- 菜单支持 `根路由`配置




# 1.5.0 (2021-07-30)
### 🐛 Bug Fixes
- 修复表格列配置，拖拽时最后的操作列重复增加
- 多标签页交互优化

- ### ✨ Features
- `项目文档`已上线
- `Application`组件加载机制优化，解决路由守卫，Axios中可使用，Dialog，Message 等之类组件
- `BasicTable` 组件新增`高度自适应`，`单元格编辑`，`整行编辑` 特性
- `nprogress` 移除，用 `Loading Bar`代替
- 打包支持`gzip`，`brotli` 压缩
- 新增代理`VITE_PROXY`配置
- 路由菜单，支持多级菜单
- 依赖升级
- 本次更新，有破坏性更新，涉及文件重命名，增删调整


# 1.4.0 (2021-07-21)
### 🐛 Bug Fixes
- vite降至2.3.6
- 多标签页交互优化

- ### ✨ Features
- 新增 `TableAction` 组件
- 新增 `菜单权限管理` 示例
- 新增 `角色权限管理` 示例
- 持续更新更多实用组件及示例，感谢Star


# 1.3.0 (2021-07-19)
### 🐛 Bug Fixes
- 修复多标签页左右切换按钮自适应展示
- 修复登录页面出现多标签页

- ### ✨ Features
- 新增 `Upload` 组件及配置
- 新增 `VITE_GLOB_IMG_URL` 图片前缀地址，配合Upload
- 新增 `滑块验证码` 组件
- 新增 `登录页面-滑块验证码` 示例
- 持续更新更多实用组件及示例，感谢Star


# 1.2.0 (2021-07-16)
### 🐛 Bug Fixes
- 修复面包屑显示登录页面
- 菜单支持只展开当前父级菜单
  
- ### ✨ Features
- 新增 `列表页面-基础列表` 示例页面
- 新增 `异常页面-404-403-500` 示例页面
- 新增 `结果页面-成功-失败-信息` 示例页面
- 新增 `设置页面-个人设置-系统设置` 示例页面
- tips `示例页面，可能在深色主题显示不佳`  
- 持续更新更多实用示例，同时也演示`Naive UI`使用方法


# 1.1.0 (2021-07-15)
- ### ✨ Features
- 新增 `基础表单` 示例页面
- 新增 `分步表单` 示例页面
- 新增 `表单详情` 示例页面
- 持续更新更多实用示例，同时也演示`Naive UI`使用方法


# 1.0.0 (2021-07-12)
### 🐛 Bug Fixes
- 修复页面切换面包屑未及时更新

- ### ✨ Features
- 1.0骨架发布 
- Naive UI 升级至2.15.4  
- 菜单新增排序字段  
- 新增 `ProTable` 组件，封装了常用的分页列配置等逻辑
- 新增 `ProTable` 组件示例页面 
- 持续更新中...


# 0.1.1-beta (2021-07-07)
### 🐛 Bug Fixes
- 修正黑色主题，页面背景色和导航风格问题
  
- ### ✨ Features
- 主控台，工作台，自适应支持
- 左侧菜单屏幕可视宽度<=950 自动收起
- 页脚是否显示，可配置
- 新增页面缓存，演示页面在>工作台>动态卡片>输入框



# 0.1.0-beta (2021-07-04)
- Naive Ui Admin 骨架
- ### ✨ Features 
- 菜单模式（左侧/顶部）
- 权限（固定角色/动态路由菜单）
- 主题（深色/浅色）引用 naiveui 特性，黑暗主题/自定义组件，暗黑主题信手捏来
- 系统主题（十种安全色，可切换预览，可自定义）
- 导航风格（三种，可自由搭配，暗色侧边/白色侧边和通栏/暗色侧边和顶部通栏）
- 多页签，持久化，拖拽，关闭，固定
- 面包屑，图标，子菜单下拉联动展示
- 漂亮的锁屏界面
- 在线配置抽屉（布局预览功能）
- 主控台，简单写了一下，能看了
- 工作台随意撸了一下（不想写style）用 tailwindcss大开杀戒了
- echarts，官网例子很全了，没啥好撸的，偷懒再次引用vben作者的代码，再感谢一次，哈哈
- 挑个合适的时间，发布一下源码到 github
