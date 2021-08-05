import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { DocumentTextOutline } from '@vicons/ionicons5';
import { renderIcon, renderNew } from '@/utils/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/external',
    name: 'https://jekip.github.io/docs/',
    component: Layout,
    meta: {
      title: '项目文档',
      icon: renderIcon(DocumentTextOutline),
      sort: 8,
      extra: renderNew(),
    },
  },
];

export default routes;
