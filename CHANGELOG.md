# CHANGELOG

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
