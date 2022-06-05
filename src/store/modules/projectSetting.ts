import { defineStore } from 'pinia';
import { store } from '@/store';
import projectSetting from '@/settings/projectSetting';
import type { IheaderSetting, ImenuSetting, ImultiTabsSetting, IcrumbsSetting } from '/#/config';

const {
  navMode,
  navTheme,
  isMobile,
  headerSetting,
  showFooter,
  menuSetting,
  multiTabsSetting,
  crumbsSetting,
  permissionMode,
  isPageAnimate,
  pageAnimateType,
} = projectSetting;

interface ProjectSettingState {
  navMode: string; //导航模式
  navTheme: string; //导航风格
  headerSetting: IheaderSetting; //顶部设置
  showFooter: boolean; //页脚
  menuSetting: ImenuSetting; //多标签
  multiTabsSetting: ImultiTabsSetting; //多标签
  crumbsSetting: IcrumbsSetting; //面包屑
  permissionMode: string; //权限模式
  isPageAnimate: boolean; //是否开启路由动画
  pageAnimateType: string; //路由动画类型
  isMobile: boolean; // 是否处于移动端模式
}

export const useProjectSettingStore = defineStore({
  id: 'app-project-setting',
  state: (): ProjectSettingState => ({
    navMode: navMode,
    navTheme,
    isMobile,
    headerSetting,
    showFooter,
    menuSetting,
    multiTabsSetting,
    crumbsSetting,
    permissionMode,
    isPageAnimate,
    pageAnimateType,
  }),
  getters: {
    getNavMode(): string {
      return this.navMode;
    },
    getNavTheme(): string {
      return this.navTheme;
    },
    getIsMobile(): boolean {
      return this.isMobile;
    },
    getHeaderSetting(): object {
      return this.headerSetting;
    },
    getShowFooter(): boolean {
      return this.showFooter;
    },
    getMenuSetting(): object {
      return this.menuSetting;
    },
    getMultiTabsSetting(): object {
      return this.multiTabsSetting;
    },
    getCrumbsSetting(): object {
      return this.multiTabsSetting;
    },
    getPermissionMode(): string {
      return this.permissionMode;
    },
    getIsPageAnimate(): boolean {
      return this.isPageAnimate;
    },
    getPageAnimateType(): string {
      return this.pageAnimateType;
    },
  },
  actions: {
    setNavTheme(value: string): void {
      this.navTheme = value;
    },
    setIsMobile(value: boolean): void {
      this.isMobile = value;
    },
  },

  // 官方文档：https://seb-l.github.io/pinia-plugin-persist/
  // 示例：https://juejin.cn/post/7094552264739651615
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'APP-PROJECT-SETTING', // 自定义 Key 值
        storage: localStorage, // 选择存储方式 localStorage | sessionStorage
        // 指定缓存项
        paths: [
          'navMode',
          'navTheme',
          'menuSetting',
          'headerSetting',
          'multiTabsSetting',
          'crumbsSetting',
          'isPageAnimate',
          'pageAnimateType',
        ],
      },
    ],
  },
});

// Need to be used outside the setup
export function useProjectSettingStoreWithOut() {
  return useProjectSettingStore(store);
}
