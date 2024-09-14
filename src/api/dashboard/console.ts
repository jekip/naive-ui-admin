import { Alova } from '@/utils/http/alova/index';

export interface TypeVisits {
  dayVisits: number;
  rise: number;
  decline: number;
  amount: number;
}
export interface TypeSaleroom {
  weekSaleroom: number;
  amount: number;
  degree: number;
}

export interface TypeOrderLarge {
  weekLarge: number;
  rise: number;
  decline: number;
  amount: number;
}

export interface TypeConsole {
  visits: TypeVisits;
  //销售额
  saleroom: TypeSaleroom;
  //订单量
  orderLarge: TypeOrderLarge;
  //成交额度
  volume: TypeOrderLarge;
}

//获取主控台信息
export function getConsoleInfo() {
  return Alova.Get<TypeConsole>('/dashboard/console');
}
