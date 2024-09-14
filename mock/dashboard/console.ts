import { defineMock } from '@alova/mock';
import { faker } from '@faker-js/faker';
import { resultSuccess } from '../_util';

function getRandom(options) {
  return Number(faker.commerce.price(options));
}

const result = {
  //访问量
  visits: {
    dayVisits: getRandom({ min: 10000, max: 99999, dec: 2 }),
    rise: getRandom({ min: 10000, max: 99999, dec: 0 }),
    decline: getRandom({ min: 10000, max: 99999, dec: 0 }),
    amount: getRandom({ min: 10000, max: 99999, dec: 2 }),
  },
  //销售额
  saleroom: {
    weekSaleroom: getRandom({ min: 10000, max: 99999, dec: 2 }),
    amount: getRandom({ min: 10000, max: 99999, dec: 2 }),
    degree: getRandom({ min: 10000, max: 99999, dec: 0 }),
  },
  //订单量
  orderLarge: {
    weekLarge: getRandom({ min: 10000, max: 99999, dec: 2 }),
    rise: getRandom({ min: 10000, max: 99999, dec: 0 }),
    decline: getRandom({ min: 10000, max: 99999, dec: 0 }),
    amount: getRandom({ min: 10000, max: 99999, dec: 2 }),
  },
  //成交额度
  volume: {
    weekLarge: getRandom({ min: 10000, max: 99999, dec: 2 }),
    rise: getRandom({ min: 10000, max: 99999, dec: 0 }),
    decline: getRandom({ min: 10000, max: 99999, dec: 0 }),
    amount: getRandom({ min: 10000, max: 99999, dec: 2 }),
  },
};

export default defineMock({
  // 主控台数据
  '/api/dashboard/console': () => {
    return resultSuccess(result);
  },
});
