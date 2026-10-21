/**
 * 支持的语言列表
 * 新增语言：在 SUPPORT_LOCALES 中追加，并实现 src/locales/lang/<locale> 语言包
 */
export const SUPPORT_LOCALES = ['zh-CN', 'en-US'] as const;

export type LocaleType = (typeof SUPPORT_LOCALES)[number];

/** 默认语言（同时作为回退语言） */
export const DEFAULT_LOCALE: LocaleType = 'zh-CN';

/** 语言持久化 key */
export const LOCALE_KEY = 'LOCALE__KEY__';

/** 语言选择项（label 为该语言的母语写法，不随语言切换变化） */
export const LOCALE_OPTIONS: { label: string; value: LocaleType }[] = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
];

export function isLocaleType(value: unknown): value is LocaleType {
  return typeof value === 'string' && (SUPPORT_LOCALES as readonly string[]).includes(value);
}
