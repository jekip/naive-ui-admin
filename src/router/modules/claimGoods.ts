import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils';
import { BellOutlined } from '@vicons/antd';
const name = 'claimGoods';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/' + name,
    name: name,
    component: Layout,
    meta: {
      title: '无主货管理',
      sort: 5,
      isRoot: true,
      icon: renderIcon(BellOutlined),
    },
    children: [
      {
        path: 'index',
        name: `${name}_index`,
        meta: {
          title: '无主货管理',
          activeMenu: `${name}_index`,
        },
        component: () => import('@/views/claimGoods/list/index.vue'),
      },
    ],
  },
];

export default routes;
