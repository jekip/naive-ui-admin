import { RouteRecordRaw } from 'vue-router';
import { Layout, ParentLayout } from '@/router/constant';
import { WalletOutlined } from '@vicons/antd';
import { renderIcon, renderNew } from '@/utils';

const routeName = 'comp';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/comp',
    name: routeName,
    component: Layout,
    redirect: '/comp/table',
    meta: {
      title: 'route.comp',
      icon: renderIcon(WalletOutlined),
      sort: 8,
    },
    children: [
      {
        path: 'table',
        name: `${routeName}_table`,
        redirect: '/comp/table/basic',
        component: ParentLayout,
        meta: {
          title: 'route.comp_table',
        },
        children: [
          {
            path: 'basic',
            name: `${routeName}_table_basic`,
            meta: {
              title: 'route.comp_table_basic',
            },
            component: () => import('@/views/comp/table/basic.vue'),
          },
          {
            path: 'editCell',
            name: `${routeName}_table_editCell`,
            meta: {
              title: 'route.comp_table_editCell',
            },
            component: () => import('@/views/comp/table/editCell.vue'),
          },
          {
            path: 'editRow',
            name: `${routeName}_table_editRow`,
            meta: {
              title: 'route.comp_table_editRow',
            },
            component: () => import('@/views/comp/table/editRow.vue'),
          },
        ],
      },
      {
        path: 'form',
        name: `${routeName}_form`,
        redirect: '/comp/form/basic',
        component: ParentLayout,
        meta: {
          title: 'route.comp_form',
        },
        children: [
          {
            path: 'basic',
            name: `${routeName}_form_basic`,
            meta: {
              title: 'route.comp_form_basic',
            },
            component: () => import('@/views/comp/form/basic.vue'),
          },
          {
            path: 'useForm',
            name: `useForm`,
            meta: {
              title: 'route.comp_useForm',
            },
            component: () => import('@/views/comp/form/useForm.vue'),
          },
        ],
      },
      {
        path: 'upload',
        name: `${routeName}_upload`,
        meta: {
          title: 'route.comp_upload',
        },
        component: () => import('@/views/comp/upload/index.vue'),
      },
      {
        path: 'modal',
        name: `${routeName}_modal`,
        meta: {
          title: 'route.comp_modal',
        },
        component: () => import('@/views/comp/modal/index.vue'),
      },
      {
        path: 'richtext',
        name: `richtext`,
        meta: {
          title: 'route.comp_richtext',
          extra: renderNew(),
        },
        component: () => import('@/views/comp/richtext/vue-quill.vue'),
      },
      {
        path: 'drag',
        name: `Drag`,
        meta: {
          title: 'route.comp_drag',
          extra: renderNew(),
        },
        component: () => import('@/views/comp/drag/index.vue'),
      },
    ],
  },
];

export default routes;
