import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils';
import { BellOutlined } from '@vicons/antd';
const name = 'task';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/' + name,
    name: name,
    component: Layout,
    meta: {
      title: '任务管理',
      sort: 2,
      isRoot: true,
      icon: renderIcon(BellOutlined),
    },
    children: [
      {
        path: 'index',
        name: `${name}_index`,
        meta: {
          title: '任务管理',
          activeMenu: `${name}_index`,
        },
        component: () => import('@/views/task/list/index.vue'),
      },
    ],
  },
];

export default routes;
