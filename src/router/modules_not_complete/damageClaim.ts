import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils';
import { BellOutlined } from '@vicons/antd';
const name = 'damageClaim';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/' + name,
    name: name,
    component: Layout,
    meta: {
      title: '索赔管理',
      sort: 5,
      isRoot: true,
      icon: renderIcon(BellOutlined),
    },
    children: [
      {
        path: 'index',
        name: `${name}_index`,
        meta: {
          title: '索赔管理',
          activeMenu: `${name}_index`,
        },
        component: () => import('@/views/about/index.vue'),
      },
      {
        path: 'add',
        name: `${name}_add`,
        meta: {
          title: '新增索赔管理',
          activeMenu: `${name}_add`,
        },
        component: () => import('@/views/about/index.vue'),
      },
    ],
  },
];

export default routes;
