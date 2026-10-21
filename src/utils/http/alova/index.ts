import { createAlova } from 'alova';
import VueHook from 'alova/vue';
import adapterFetch from 'alova/fetch';
import { createAlovaMockAdapter } from '@alova/mock';
import { isString } from 'lodash-es';
import mocks from './mocks';
import { useUser } from '@/store/modules/user';
import { storage } from '@/utils/Storage';
import { useGlobSetting, useLocalSetting } from '@/hooks/setting';
import { PageEnum } from '@/enums/pageEnum';
import { ResultEnum } from '@/enums/httpEnum';
import { isUrl } from '@/utils';

const { apiUrl, urlPrefix } = useGlobSetting();

const { useMock, loggerMock } = useLocalSetting();

// mock 数据（faker + mockjs，约 0.5MB）只在 VITE_USE_MOCK=true 时才进入产物。
// 该值由 Vite 在构建期静态替换，因此关闭时整段会被摇掉，
// 生产构建不再把 mock 数据与造数库一起打包给用户。
const enableMock = import.meta.env.VITE_USE_MOCK === 'true';

const requestAdapter = enableMock
  ? createAlovaMockAdapter([...mocks], {
      // 全局控制是否启用mock接口，默认为true
      enable: useMock,

      // 非模拟请求适配器，用于未匹配mock接口时发送请求
      httpAdapter: adapterFetch(),

      // mock接口响应延迟，单位毫秒
      delay: 1000,

      // 自定义打印mock接口请求信息
      // mockRequestLogger: (res) => {
      //   loggerMock && console.log(`Mock Request ${res.url}`, res);
      // },
      mockRequestLogger: loggerMock,
      onMockError(error, currentMethod) {
        console.error('🚀 ~ onMockError ~ currentMethod:', currentMethod);
        console.error('🚀 ~ onMockError ~ error:', error);
      },
    })
  : adapterFetch();

export const Alova = createAlova({
  baseURL: apiUrl,
  statesHook: VueHook,
  // 关闭全局请求缓存
  // cacheFor: null,
  // 全局缓存配置
  // cacheFor: {
  //   POST: {
  //     mode: 'memory',
  //     expire: 60 * 10 * 1000
  //   },
  //   GET: {
  //     mode: 'memory',
  //     expire: 60 * 10 * 1000
  //   },
  //   HEAD: 60 * 10 * 1000 // 统一设置HEAD请求的缓存模式
  // },
  // 在开发环境开启缓存命中日志
  cacheLogger: process.env.NODE_ENV === 'development',
  requestAdapter,
  beforeRequest(method) {
    const userStore = useUser();
    const token = userStore.getToken;
    // 添加 token 到请求头
    if (!method.meta?.ignoreToken && token) {
      method.config.headers['token'] = token;
    }
    // 处理 api 请求前缀
    const isUrlStr = isUrl(method.url as string);
    if (!isUrlStr && urlPrefix) {
      method.url = `${urlPrefix}${method.url}`;
    }
    if (!isUrlStr && apiUrl && isString(apiUrl)) {
      method.url = `${apiUrl}${method.url}`;
    }
  },
  responded: {
    onSuccess: async (response, method) => {
      const res = (response.json && (await response.json())) || response.body;

      // 是否返回原生响应头 比如：需要获取响应头时使用该属性
      if (method.meta?.isReturnNativeResponse) {
        return res;
      }
      // 请根据自身情况修改数据结构
      const { message, code, result } = res;

      // 不进行任何处理，直接返回
      // 用于需要直接获取 code、result、 message 这些信息时开启
      if (method.meta?.isTransformResponse === false) {
        return res.data;
      }

      // @ts-expect-error 全局挂载的 naive-ui discrete api
      const Message = window.$message;
      // @ts-expect-error 全局挂载的 naive-ui discrete api
      const Modal = window.$dialog;

      const LoginPath = PageEnum.BASE_LOGIN;
      if (ResultEnum.SUCCESS === code) {
        return result;
      }
      // 需要登录
      if (code === 912) {
        Modal?.warning({
          title: '提示',
          content: '登录身份已失效，请重新登录!',
          okText: '确定',
          closable: false,
          maskClosable: false,
          onOk: async () => {
            storage.clear();
            window.location.href = LoginPath;
          },
        });
      } else {
        // 可按需处理错误 一般情况下不是 912 错误，不一定需要弹出 message
        Message?.error(message);
        throw new Error(message);
      }
    },
  },
});

// 项目，多个不同 api 地址，可导出多个实例
// export const AlovaTwo = createAlova({
//   baseURL: 'http://localhost:9001',
// });
