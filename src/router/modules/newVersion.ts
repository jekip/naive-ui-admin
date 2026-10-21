import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { SketchOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/newversion',
    name: 'https://www.naiveadmin.com',
    component: Layout,
    meta: {
      title: 'route.newVersion',
      icon: renderIcon(SketchOutlined),
      sort: 12,
    },
  },
];

export default routes;
