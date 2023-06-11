export const notifyStatusList = [
  '未提交',
  '审核中',
  '待修改',
  '等待到货',
  '已经到货',
  '异常',
  '已取消',
];

export type ArriveMedia = '货柜' | '托盘' | '散货' | '认领件';
export const ArriveMediaTypes: Record<string, ArriveMedia> = {
  Container: '货柜',
  Tray: '托盘',
  Box: '散货',
  ClaimGood: '认领件',
};

export const arriveMedia: ArriveMedia[] = Object.values(ArriveMediaTypes);
