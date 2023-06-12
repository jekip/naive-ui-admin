export const taskStatusList = [
  '未提交',
  '待审核',
  '未通过',
  '未处理',
  '处理中',
  '已处理',
  '已完成',
];

export type ArriveMedia = '货柜' | '托盘' | '散货' | '认领件';
export const ArriveMediaTypes: Record<string, ArriveMedia> = {
  Container: '货柜',
  Tray: '托盘',
  Box: '散货',
  ClaimGood: '认领件',
};

export const arriveMedia: ArriveMedia[] = Object.values(ArriveMediaTypes);

export type SalesType =
  | '上架'
  | '散货中转'
  | '快转'
  | '一件代发'
  | '换标'
  | '退货'
  | '异常'
  | '盘点';
export const SalesTypes: Record<string, SalesType> = {
  Shelves: '上架',
  Transshipment: '散货中转',
  FastTurn: '快转',
  OneForSend: '一件代发',
  ChangeLogo: '换标',
  Return: '退货',
  Wrong: '异常',
  Check: '盘点',
};

export const salesTypeList: SalesType[] = Object.values(SalesTypes);

export const completedList = ['0%', '25%', '50%', '75%', '100%'];

export const operationalRequirementList = ['认真', '仔细'];
export const linkList = ['www.baidu.com', 'www.bilibili.com'];
