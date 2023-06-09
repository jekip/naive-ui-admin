import { Random } from 'mockjs';
import { doCustomTimes, resultSuccess } from '../_util';
import { deliveryMethod } from '@/api/deliveryMethod';
import { warehouseList } from '@/api/warehouse';
import { salesNameList } from '@/api/sales';
import { arriveMedia, notifyStatusList } from '@/api/notify/statusList';

Random.extend({
  deliveryMethod: function () {
    return this.pick(deliveryMethod);
  },
  warehouse: function () {
    return this.pick(warehouseList);
  },
  salesName: function () {
    return this.pick(salesNameList);
  },
  notifyStatus: function () {
    return this.pick(notifyStatusList);
  },
  arriveMedia: function () {
    return this.pick(arriveMedia);
  },
});

const notifyList = (pageSize) => {
  const result: any[] = [];
  doCustomTimes(pageSize, () => {
    result.push({
      id: '@integer(10,999999)',
      salesName: '@salesName()',
      planArriveDate: '@datetime',
      arrivedCount: '@integer(10,999)',
      arriveWarehouseName: '@warehouse()',
      totalCount: '@natural(10,999)',
      deliveryMethod: '@deliveryMethod()',
      status: '@notifyStatus()',
      arriveMedia: '@arriveMedia()',
      note: `@sentence()`,
      time: `@time('HH:mm')`,
      'no|100000-10000000': 100000,
    });
  });
  return result;
};

export default [
  //表格数据列表
  {
    url: '/api/notify/list',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 10 } = query;
      const list = notifyList(Number(pageSize));
      return resultSuccess({
        page: Number(page),
        pageSize: Number(pageSize),
        pageCount: 60,
        list,
      });
    },
  },
];
