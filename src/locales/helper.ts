import { DEFAULT_LOCALE, isLocaleType, type LocaleType } from './types';

/** 从浏览器语言推断首选语言，未命中则返回默认语言 */
export function detectBrowserLocale(): LocaleType {
  const navigatorLanguage =
    (typeof navigator !== 'undefined' && (navigator.language || (navigator as any).userLanguage)) ||
    '';

  // 先精确匹配（zh-CN），再匹配主语言（zh / en）
  if (isLocaleType(navigatorLanguage)) {
    return navigatorLanguage;
  }

  const short = String(navigatorLanguage).toLowerCase().split('-')[0];
  const matched = (['zh-CN', 'en-US'] as LocaleType[]).find(
    (item) => item.toLowerCase().split('-')[0] === short
  );

  return matched ?? DEFAULT_LOCALE;
}

/** 同步 <html lang>，利于 SEO 与屏幕阅读器 */
export function setHtmlPageLang(locale: LocaleType): void {
  if (typeof document === 'undefined') return;
  document.querySelector('html')?.setAttribute('lang', locale);
}
