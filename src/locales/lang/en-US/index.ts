import type zhMessages from '../zh-CN';
import common from './common';
import route from './route';
import layout from './layout';
import login from './login';
import about from './about';

// satisfies 保证英文语言包与中文语言包的 key 完全一致，漏翻会在类型检查阶段报错
const messages = {
  common,
  route,
  layout,
  login,
  about,
} satisfies typeof zhMessages;

export default messages;
