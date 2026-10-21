import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { CheckCircleOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/result',
    name: 'Result',
    redirect: '/result/success',
    component: Layout,
    meta: {
      title: 'route.result',
      icon: renderIcon(CheckCircleOutlined),
      sort: 4,
    },
    children: [
      {
        path: 'success',
        name: 'result-success',
        meta: {
          title: 'route.result_success',
        },
        component: () => import('@/views/result/success.vue'),
      },
      {
        path: 'fail',
        name: 'result-fail',
        meta: {
          title: 'route.result_fail',
        },
        component: () => import('@/views/result/fail.vue'),
      },
      {
        path: 'info',
        name: 'result-info',
        meta: {
          title: 'route.result_info',
        },
        component: () => import('@/views/result/info.vue'),
      },
    ],
  },
];

export default routes;
