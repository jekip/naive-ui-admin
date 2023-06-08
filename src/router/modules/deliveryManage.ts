import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils';
import { BellOutlined } from '@vicons/antd';
const name = 'deliveryManage';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/' + name,
    name: name,
    component: Layout,
    meta: {
      title: '物流管理',
      sort: 4,
      isRoot: true,
      icon: renderIcon(BellOutlined),
    },
    children: [
      {
        path: 'index',
        name: `${name}_index`,
        meta: {
          title: '物流管理',
          activeMenu: `${name}_index`,
        },
        component: () => import('@/views/about/index.vue'),
      },
      {
        path: 'add',
        name: `${name}_add`,
        meta: {
          title: '新增物流管理',
          activeMenu: `${name}_add`,
        },
        component: () => import('@/views/about/index.vue'),
      },
    ],
  },
];

export default routes;
