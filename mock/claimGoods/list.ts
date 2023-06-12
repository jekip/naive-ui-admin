import { Random } from 'mockjs';
import { doCustomTimes, resultSuccess } from '../_util';
import { deliveryMethod } from '@/api/deliveryMethod';
import { salesNameList } from '@/api/sales';
import {
  channelFeedback,
  claimStatusList,
  goodStatus,
  warehouseFeedback,
} from '@/api/claimGoods/serve';
import { warehouseList } from '@/api/warehouse';

Random.extend({
  deliveryMethod: function () {
    return this.pick(deliveryMethod);
  },
  salesName: function () {
    return this.pick(salesNameList);
  },
  warehouse: function () {
    return this.pick(warehouseList);
  },
  goodStatus: function () {
    return this.pick(goodStatus);
  },
  claimStatus: function () {
    return this.pick(claimStatusList);
  },
  channelFeedback: function () {
    return this.pick(channelFeedback);
  },
  warehouseFeedback: function () {
    return this.pick(warehouseFeedback);
  },
});

const claimList = (pageSize) => {
  const result: any[] = [];
  doCustomTimes(pageSize, () => {
    result.push({
      getGoodsTime: '@datetime',
      id: '@integer(10000,99999)',
      deliveryMethod: '@deliveryMethod()',
      deliveryID: '@integer(10000,99999)',
      status: '@claimStatus()',
      getGoodsWareHouse: '@warehouse()',
      note: `@sentence()`,
      claimCustomer: '@salesName()',
      discardTime: '@datetime',
      image: '@integer(0,1000)',
      timeLine: `@time('HH:mm')`,
      'no|100000-10000000': 100000,
    });
  });
  return result;
};

export default [
  //表格数据列表
  {
    url: '/api/claim/list',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 10 } = query;
      const list = claimList(Number(pageSize));
      return resultSuccess({
        page: Number(page),
        pageSize: Number(pageSize),
        pageCount: 60,
        list,
      });
    },
  },
];
