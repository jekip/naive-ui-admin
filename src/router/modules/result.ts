import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { CheckCircleOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

/**
  * @param name route name, must be set, and cannot have the same name
  * @param meta routing meta information (route comes with extended information)
  * @param redirect redirect address, when accessing this route, redirect it by yourself
  * @param meta.disabled disable the entire menu
  * @param meta.title menu name
  * @param meta.icon menu icon
  * @param meta.keepAlive cache the route
  * @param meta.sort The smaller the order, the higher the order
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/result',
    name: 'Result',
    redirect: '/result/success',
    component: Layout,
    meta: {
      title: '结果页面',
      icon: renderIcon(CheckCircleOutlined),
      sort: 4,
    },
    children: [
      {
        path: 'success',
        name: 'result-success',
        meta: {
          title: '成功页',
        },
        component: () => import('@/views/result/success.vue'),
      },
      {
        path: 'fail',
        name: 'result-fail',
        meta: {
          title: '失败页',
        },
        component: () => import('@/views/result/fail.vue'),
      },
      {
        path: 'info',
        name: 'result-info',
        meta: {
          title: '信息页',
        },
        component: () => import('@/views/result/info.vue'),
      },
    ],
  },
];

export default routes;
