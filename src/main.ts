import './styles/tailwind.css';
import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from './router';
import { setupStore } from '@/store';
import MakeitCaptcha from 'makeit-captcha';
import 'makeit-captcha/dist/captcha.min.css';
import { setupNaive, setupDirectives, setupGlobalMethods, setupCustomComponents } from '@/plugins';

async function bootstrap() {
  const app = createApp(App);

  app.use(MakeitCaptcha);

  // 注册全局常用的 naive-ui 组件
  setupNaive(app);

  // 注册全局自定义组件,如：<svg-icon />
  setupCustomComponents(app);

  // 注册全局自定义指令，如：v-permission权限指令
  setupDirectives(app);

  // 注册全局方法，如：app.config.globalProperties.$message = message
  setupGlobalMethods(app);

  // 挂载状态管理
  setupStore(app);

  // 挂载路由
  await setupRouter(app);

  // 路由准备就绪后挂载APP实例
  await router.isReady();

  app.mount('#app', true);
}

void bootstrap();
