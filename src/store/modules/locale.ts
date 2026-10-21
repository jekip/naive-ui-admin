import { defineStore } from 'pinia';
import { store } from '@/store';
import { getI18nLocale, setI18nLocale } from '@/locales';
import { DEFAULT_LOCALE, type LocaleType } from '@/locales/types';

interface LocaleState {
  //当前语言
  locale: LocaleType;
}

export const useLocaleStore = defineStore({
  id: 'app-locale',
  state: (): LocaleState => ({
    locale: getI18nLocale(),
  }),
  getters: {
    getLocale(): LocaleType {
      return this.locale || DEFAULT_LOCALE;
    },
  },
  actions: {
    async setLocale(locale: LocaleType) {
      try {
        // 先加载语言包并切换 i18n，再更新响应式状态，
        // 保证依赖 localeStore.locale 的菜单 watcher 触发时 i18n 已是新语言
        await setI18nLocale(locale);
        this.locale = locale;
      } catch (error) {
        console.error('[i18n] 切换语言失败', error);
      }
    },
  },
});

// Need to be used outside the setup
export function useLocale() {
  return useLocaleStore(store);
}
