import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { ExclamationCircleOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils';

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/exception',
    name: 'Exception',
    redirect: '/exception/403',
    component: Layout,
    meta: {
      title: '异常页面',
      icon: renderIcon(ExclamationCircleOutlined),
      sort: 3,
    },
    children: [
      {
        path: '403',
        name: 'exception-403',
        meta: {
          title: '403',
        },
        component: () => import('@/views/exception/403.vue'),
      },
      {
        path: '404',
        name: 'exception-404',
        meta: {
          title: '404',
        },
        component: () => import('@/views/exception/404.vue'),
      },
      {
        path: '500',
        name: 'exception-500',
        meta: {
          title: '500',
        },
        component: () => import('@/views/exception/500.vue'),
      },
    ],
  },
];

export default routes;
