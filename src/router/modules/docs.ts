import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { DocumentTextOutline } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/external',
    name: 'https://docs.naiveadmin.com',
    component: Layout,
    meta: {
      title: 'route.docs',
      icon: renderIcon(DocumentTextOutline),
      sort: 11,
    },
  },
];

export default routes;
