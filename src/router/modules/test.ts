import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { ProjectOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/test',
    name: 'test',
    component: Layout,
    meta: {
      sort: 12,
      isRoot: true,
      activeMenu: 'test_index',
      icon: renderIcon(ProjectOutlined),
    },
    children: [
      {
        path: 'index',
        name: `test_index`,
        meta: {
          title: '指令测试',
          activeMenu: 'test_index',
        },
        component: () => import('@/views/test/index.vue'),
      },
    ],
  },
];

export default routes;
