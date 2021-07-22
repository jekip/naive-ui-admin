import { resultSuccess, doCustomTimes } from '../_util';

function getMenuKeys() {
  const keys = ['dashboard', 'console', 'workplace', 'basic-form', 'step-form', 'detail'];
  const newKeys = [];
  doCustomTimes(parseInt(Math.random() * 6), () => {
    const key = keys[Math.floor(Math.random() * keys.length)];
    newKeys.push(key);
  });
  return Array.from(new Set(newKeys));
}

const roleList = (pageSize) => {
  const result: any[] = [];
  doCustomTimes(pageSize, () => {
    result.push({
      id: '@integer(10,100)',
      name: '@cname()',
      explain: '@cname()',
      isDefault: '@boolean()',
      menu_keys: getMenuKeys(),
      create_date: `@date('yyyy-MM-dd hh:mm:ss')`,
      'status|1': ['normal', 'enable', 'disable'],
    });
  });
  return result;
};

export default [
  {
    url: '/api/role/list',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 10 } = query;
      const list = roleList(Number(pageSize));
      return resultSuccess({
        page: Number(page),
        pageSize: Number(pageSize),
        pageCount: 60,
        list,
      });
    },
  },
];
