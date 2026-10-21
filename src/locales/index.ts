import { createI18n } from 'vue-i18n';
import type { App } from 'vue';
import zhCN from './lang/zh-CN';
import { detectBrowserLocale, setHtmlPageLang } from './helper';
import { DEFAULT_LOCALE, LOCALE_KEY, isLocaleType, type LocaleType } from './types';
import { storage } from '@/utils/Storage';

type LocaleMessages = typeof zhCN;

/**
 * 默认语言（zh-CN）随首屏加载，其余语言按需异步加载，
 * 避免语言包随语言数量增长拖累首屏体积
 */
const asyncLocaleLoaders: Partial<Record<LocaleType, () => Promise<{ default: LocaleMessages }>>> =
  {
    'en-US': () => import('./lang/en-US/index'),
  };

export const messages: Record<string, LocaleMessages> = {
  'zh-CN': zhCN,
};

/** 优先使用持久化的语言，首次访问则按浏览器语言推断 */
function getInitialLocale(): LocaleType {
  const cached = storage.get(LOCALE_KEY, null);
  return isLocaleType(cached) ? cached : detectBrowserLocale();
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getInitialLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages,
  // 后端返回的菜单标题可能是纯中文，未命中语言包时直接回显原文
  missingWarn: false,
  fallbackWarn: false,
});

/** 供 ts 文件使用的翻译函数 */
export const t = i18n.global.t;

/** 判断某个 key 是否存在于语言包 */
export const te = i18n.global.te;

/**
 * 翻译标题类文案（路由 title、后端菜单标题等）
 * 未命中语言包时回显原文，避免把 i18n key 直接暴露给用户
 */
export function tr(key?: unknown): string {
  if (typeof key !== 'string' || key === '') return '';
  const value = i18n.global.t(key);
  return typeof value === 'string' && value ? value : key;
}

/** 按需加载语言包，已加载过的不会重复请求 */
export async function loadLocaleMessages(locale: LocaleType): Promise<void> {
  if (i18n.global.messages.value[locale]) return;
  const loader = asyncLocaleLoaders[locale];
  if (!loader) return;
  const module = await loader();
  i18n.global.setLocaleMessage(locale, module.default);
}

/**
 * 切换语言：加载语言包 → 更新 i18n → 持久化 → 同步 <html lang>
 */
export async function setI18nLocale(locale: LocaleType): Promise<void> {
  await loadLocaleMessages(locale);
  i18n.global.locale.value = locale;
  // 语言设置长期有效，不设置过期时间
  storage.set(LOCALE_KEY, locale, null);
  setHtmlPageLang(locale);
}

export function getI18nLocale(): LocaleType {
  const current = i18n.global.locale.value;
  return isLocaleType(current) ? current : DEFAULT_LOCALE;
}

export async function setupI18n(app: App<Element>): Promise<void> {
  app.use(i18n);
  const locale = getI18nLocale();
  await loadLocaleMessages(locale);
  setHtmlPageLang(locale);
}

export * from './types';
export { naiveLocales } from './naive';
export { detectBrowserLocale } from './helper';
