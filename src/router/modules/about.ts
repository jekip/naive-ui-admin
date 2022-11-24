import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { ProjectOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/about',
    name: 'about',
    component: Layout,
    meta: {
      sort: 10,
      isRoot: true,
      activeMenu: 'about_index',
      icon: renderIcon(ProjectOutlined),
    },
    children: [
      {
        path: 'index',
        name: `about_index`,
        meta: {
          title: '关于项目',
          activeMenu: 'about_index',
        },
        component: () => import('@/views/about/index.vue'),
      },
    ],
  },
];

export default routes;
