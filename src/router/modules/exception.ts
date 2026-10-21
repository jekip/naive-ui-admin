import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { ExclamationCircleOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/exception',
    name: 'Exception',
    redirect: '/exception/403',
    component: Layout,
    meta: {
      title: 'route.exception',
      icon: renderIcon(ExclamationCircleOutlined),
      sort: 3,
    },
    children: [
      {
        path: '403',
        name: 'exception-403',
        meta: {
          title: 'route.exception_403',
        },
        component: () => import('@/views/exception/403.vue'),
      },
      {
        path: '404',
        name: 'exception-404',
        meta: {
          title: 'route.exception_404',
        },
        component: () => import('@/views/exception/404.vue'),
      },
      {
        path: '500',
        name: 'exception-500',
        meta: {
          title: 'route.exception_500',
        },
        component: () => import('@/views/exception/500.vue'),
      },
    ],
  },
];

export default routes;
