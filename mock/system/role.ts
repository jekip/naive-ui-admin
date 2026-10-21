import { defineMock } from '@alova/mock';
import { faker } from '@faker-js/faker';
import { resultSuccess, doCustomTimes } from '../_util';
import { format } from 'date-fns';
function getMenuKeys() {
  const keys = ['dashboard', 'console', 'workplace', 'basic-form', 'step-form', 'detail'];
  const newKeys = [];
  doCustomTimes(parseInt(Math.random() * 6), () => {
    const key = keys[Math.floor(Math.random() * keys.length)];
    newKeys.push(key as never);
  });
  return Array.from(new Set(newKeys));
}

const roleList = (pageSize) => {
  const result: any[] = [];
  doCustomTimes(pageSize, () => {
    result.push({
      id: faker.string.numeric(4),
      name: faker.person.firstName(),
      explain: faker.lorem.sentence({ min: 2, max: 4 }),
      isDefault: faker.helpers.arrayElement([true, false]),
      menu_keys: getMenuKeys(),
      create_date: format(faker.date.anytime(), 'yyyy-MM-dd HH:mm'),
      status: faker.helpers.arrayElement(['normal', 'enable', 'disable']),
    });
  });
  return result;
};

export default defineMock({
  '/api/role/list': ({ query }) => {
    const { page = 1, pageSize = 10, name } = query;
    const list = roleList(Number(pageSize));
    // 并非真实，只是为了模拟搜索结果
    const count = name ? 30 : 60;
    return resultSuccess({
      page: Number(page),
      pageSize: Number(pageSize),
      pageCount: count,
      itemCount: count * Number(pageSize),
      list,
    });
  },
});
