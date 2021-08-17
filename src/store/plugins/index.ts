import type { PiniaPluginContext } from 'pinia';

interface CustomObject {
  [key: string]: {
    [key: string]: any;
  };
}

export interface StorageApi {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: any) => void;
  removeItem: (key: string) => void;
}

export interface ReducerOptionsArray {
  [key: string]: string[] | boolean;
}

export interface PersistedOptions {
  stroage?: StorageApi;
  reducer?: string[] | ReducerOptionsArray;
  name?: string;
}

function formateReducer(value: PersistedOptions['reducer'], ctx: PiniaPluginContext): CustomObject {
  const state = ctx.pinia.state.value;
  if (!value) return state;
  const saveState: CustomObject = {};
  if (Array.isArray(value)) {
    value.forEach((moduleName) => {
      saveState[moduleName] = state[moduleName];
    });
  } else if (typeof value === 'object' && !Array.isArray(value)) {
    // 遍历 reducer
    Object.keys(value).forEach((moduleName) => {
      // 添加模块
      saveState[moduleName] = {};
      const moduleValue = value[moduleName]; // 模块值
      const stateModule = state[moduleName]; // 状态值
      if (typeof moduleValue === 'boolean') {
        stateModule && (saveState[moduleName] = stateModule);
      } else if (Array.isArray(moduleValue)) {
        moduleValue.forEach((item) => {
          stateModule && (saveState[moduleName][item] = stateModule[item]);
        });
      }
    });
  }
  return saveState;
}

/**
 * 持久化存储
 * @param options
 * @returns
 */
export function createPersistedState(
  options?: PersistedOptions
): (ctx: PiniaPluginContext) => object {
  // 存储方式
  const stroage = options?.stroage || window.localStorage;
  // 前缀
  const name = options?.name || 'vuex-pinia';
  function piniaPlugin(ctx: PiniaPluginContext) {
    // this subscription will be removed after the component is unmounted, so we need need to fill in the second parameter
    ctx.store.$subscribe(() => {
      const sv = JSON.parse(stroage.getItem(name) as string) || {};
      const reducer = formateReducer(options?.reducer, ctx);
      stroage.setItem(name, JSON.stringify(Object.assign(sv, reducer)));
    }, true);
    const rv = JSON.parse(stroage.getItem(name) as string);
    return rv && rv[ctx.store.$id];
  }
  return piniaPlugin;
}
