import { Random } from 'mockjs';
import { doCustomTimes, resultSuccess } from '../_util';
import { deliveryMethod } from '@/api/deliveryMethod';
import { salesNameList } from '@/api/sales';
import {
  damageStatusList,
  channelFeedback,
  goodStatus,
  warehouseFeedback,
} from '@/api/damageClaim/serve';

Random.extend({
  deliveryMethod: function () {
    return this.pick(deliveryMethod);
  },
  salesName: function () {
    return this.pick(salesNameList);
  },
  goodStatus: function () {
    return this.pick(goodStatus);
  },
  claimStatus: function () {
    return this.pick(damageStatusList);
  },
  channelFeedback: function () {
    return this.pick(channelFeedback);
  },
  warehouseFeedback: function () {
    return this.pick(warehouseFeedback);
  },
});

const damageList = (pageSize) => {
  const result: any[] = [];
  doCustomTimes(pageSize, () => {
    result.push({
      submitTime: '@datetime',
      orderID: '@integer(10000,99999)',
      deliveryMethod: '@deliveryMethod()',
      trackId: '@integer(10000,99999)',
      goodsStatus: '@goodStatus()',
      channelFeedback: '@channelFeedback()',
      warehouseFeedback: '@warehouseFeedback()',
      claimId: '@integer(10000,99999)',
      applicationsAmount: '@integer(0,1000)',
      claimAmount: '@integer(0,1000)',
      salesName: '@salesName()',
      status: '@claimStatus()',
      annex: 'excel1',
      timeLine: `@time('HH:mm')`,
      'no|100000-10000000': 100000,
    });
  });
  return result;
};

export default [
  //表格数据列表
  {
    url: '/api/damageClaim/list',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 10 } = query;
      const list = damageList(Number(pageSize));
      return resultSuccess({
        page: Number(page),
        pageSize: Number(pageSize),
        pageCount: 60,
        list,
      });
    },
  },
];
