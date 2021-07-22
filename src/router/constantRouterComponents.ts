import { renderIcon } from '@/utils/index';
import { DashboardOutlined } from '@vicons/antd';
// import { RouterTransition } from '@/components/transition'

//前端路由映射表
export const constantRouterComponents = {
  Layout: () => import('@/layout/index.vue'), //布局
  DashboardConsole: () => import('@/views/dashboard/console/console.vue'), // 主控台
  DashboardMonitor: () => import('@/views/dashboard/monitor/monitor.vue'), // 监控页
  DashboardWorkplace: () => import('@/views/dashboard/workplace/workplace.vue'), // 工作台
};

//前端路由图标映射表
export const constantRouterIcon = {
  DashboardOutlined: renderIcon(DashboardOutlined),
};
