import { computed } from 'vue';
import { useProjectSettingStore } from '@/store/modules/projectSetting';

export function useProjectSetting() {
  const projectStore = useProjectSettingStore();

  const navMode = computed(() => projectStore.navMode);

  const navTheme = computed(() => projectStore.navTheme);

  const isMobile = computed(() => projectStore.isMobile);

  const headerSetting = computed(() => projectStore.headerSetting);

  const multiTabsSetting = computed(() => projectStore.multiTabsSetting);

  const menuSetting = computed(() => projectStore.menuSetting);

  const crumbsSetting = computed(() => projectStore.crumbsSetting);

  const permissionMode = computed(() => projectStore.permissionMode);

  const showFooter = computed(() => projectStore.showFooter);

  const isPageAnimate = computed(() => projectStore.isPageAnimate);

  const pageAnimateType = computed(() => projectStore.pageAnimateType);

  return {
    navMode,
    navTheme,
    isMobile,
    headerSetting,
    multiTabsSetting,
    menuSetting,
    crumbsSetting,
    permissionMode,
    showFooter,
    isPageAnimate,
    pageAnimateType,
  };
}
