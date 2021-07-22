import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { ProfileOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

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
    path: '/form',
    name: 'Form',
    redirect: '/form/basic-form',
    component: Layout,
    meta: {
      title: '表单页面',
      icon: renderIcon(ProfileOutlined),
      sort: 3,
    },
    children: [
      {
        path: 'basic-form',
        name: 'form-basic-form',
        meta: {
          title: '基础表单',
        },
        component: () => import('@/views/form/basicForm/index.vue'),
      },
      {
        path: 'step-form',
        name: 'form-step-form',
        meta: {
          title: '分步表单',
        },
        component: () => import('@/views/form/stepForm/stepForm.vue'),
      },
      {
        path: 'detail',
        name: 'form-detail',
        meta: {
          title: '表单详情',
        },
        component: () => import('@/views/form/detail/index.vue'),
      },
    ],
  },
];

export default routes;
