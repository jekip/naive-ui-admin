import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
import { resolve } from 'path';
import { wrapperEnv } from './build/utils';
import { createVitePlugins } from './build/vite/plugin';
import { OUTPUT_DIR } from './build/constant';
import { createProxy } from './build/vite/proxy';
import pkg from './package.json';
import { format } from 'date-fns';
const { dependencies, devDependencies, name, version } = pkg;

const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
};

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PUBLIC_PATH, VITE_PORT, VITE_PROXY } = viteEnv;
  const isBuild = command === 'build';
  return {
    base: VITE_PUBLIC_PATH,
    esbuild: {},
    resolve: {
      alias: [
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
        {
          find: '@',
          replacement: pathResolve('src') + '/',
        },
      ],
      dedupe: ['vue'],
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      __APP_INFO__: JSON.stringify(__APP_INFO__),
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    },
    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
    optimizeDeps: {
      include: [],
    },
    build: {
      target: 'es2020',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000,
      // 构建分包策略
      rollupOptions: {
        treeshake: {
          // mock 目录下的文件都是「导出值被显式消费」的纯数据模块，标记无副作用后
          // 使用方把 VITE_USE_MOCK 改成 false 时能被完整摇掉（faker + mockjs 约 0.5MB）。
          // 默认构建 mock 是开着的，此配置不参与裁剪；这里只对项目自身的 mock/ 目录生效，
          // 避免误伤 node_modules 里路径同样含 mock 的包（如 @alova/mock）。
          moduleSideEffects: (id) =>
            id.includes('node_modules') ? true : !/[\\/]mock[\\/]/.test(id),
        },
        output: {
          // 只固定「几乎不会变」的第三方基座，便于长期缓存；
          // naive-ui / 业务模块交给 rollup 按路由入口自然分割，
          // 避免整库被提前拉进首屏（此前 naive-ui 单块 1MB 且被入口同步引用）。
          manualChunks(id) {
            if (!id.includes('node_modules')) return;
            if (id.includes('/node_modules/vue/') || id.includes('/node_modules/@vue/')) {
              return 'vue';
            }
            if (id.includes('/node_modules/vue-router/')) return 'vue-router';
            if (id.includes('/node_modules/pinia/')) return 'pinia';
            if (id.includes('/node_modules/@vueuse/')) return 'vueuse';
            if (id.includes('/node_modules/lodash-es/')) return 'lodash-es';
            if (id.includes('/node_modules/@vicons/')) return 'vicons';
            // 以下均为体积大、且只被个别路由使用的库，单独成块后仍保持按需加载
            if (id.includes('/node_modules/echarts/') || id.includes('/node_modules/zrender/')) {
              return 'echarts';
            }
            if (
              id.includes('/node_modules/vuedraggable/') ||
              id.includes('/node_modules/sortablejs/')
            ) {
              return 'vuedraggable';
            }
            if (id.includes('/node_modules/@vueup/') || id.includes('/node_modules/quill/')) {
              return 'vue-quill';
            }
          },
        },
      },
    },
  };
};
