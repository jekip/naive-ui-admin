import { Random } from 'mockjs';
import { doCustomTimes, resultSuccess } from '../_util';
import { deliveryMethod } from '@/api/deliveryMethod';
import { salesNameList } from '@/api/sales';
import {
  completedList,
  linkList,
  operationalRequirementList,
  salesTypeList,
  taskStatusList,
} from '@/api/task/statusList';

Random.extend({
  deliveryMethod: function () {
    return this.pick(deliveryMethod);
  },
  salesName: function () {
    return this.pick(salesNameList);
  },
  taskStatus: function () {
    return this.pick(taskStatusList);
  },
  salesType: function () {
    return this.pick(salesTypeList);
  },
  completed: function () {
    return this.pick(completedList);
  },
  operationalRequire: function () {
    return this.pick(operationalRequirementList);
  },
  link: function () {
    return this.pick(linkList);
  },
});

const taskList = (pageSize) => {
  const result: any[] = [];
  doCustomTimes(pageSize, () => {
    result.push({
      id: '@integer(10,999999)',
      operateTime: '@datetime',
      customerID: '@salesName()',
      salesName: '@salesName()',
      planAmount: '@integer(1,999)',
      finishAmount: '@integer(10,999)',
      salesType: '@salesType()',
      totalCount: '@natural(10,999)',
      deliveryMethod: '@deliveryMethod()',
      status: '@taskStatus()',
      operatorID: '@salesName()',
      deliveryDate: '@datetime',
      completionRate: '@completed()',
      note: `@sentence()`,
      annex: 'excel1',
      operationalRequirement: '@operationalRequire()',
      timeLine: `@time('HH:mm')`,
      businessLink: '@link()',
      'no|100000-10000000': 100000,
    });
  });
  return result;
};

export default [
  //表格数据列表
  {
    url: '/api/task/list',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 10 } = query;
      const list = taskList(Number(pageSize));
      return resultSuccess({
        page: Number(page),
        pageSize: Number(pageSize),
        pageCount: 60,
        list,
      });
    },
  },
];
