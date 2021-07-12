import { h } from 'vue';
import type { App, Plugin } from 'vue';
import { NIcon } from 'naive-ui'

/**
 * render 图标
 * */
export function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

/**
 * 递归组装菜单格式
 */
export function generatorMenu(routerMap: Array<any>, parent?: object) {
  return routerMap.filter(item => {
    return item.meta.hidden != true && !['/:path(.*)*', '/', '/redirect', '/login'].includes(item.path)
  }).map(item => {
    const currentMenu = {
      ...item,
      ...item.meta,
      label: item.meta.title,
      key: item.name
    }
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentMenu.children = generatorMenu(item.children, currentMenu)
    }
    return currentMenu
  })
}

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as T & Plugin;
};
