import { MainView } from '@/layout/components/Main'

export const RedirectName = 'Redirect';

export const ParentLayout = 'ParentLayout';

export const ErrorPage = () => import('@/views/exception/404.vue');

/**
 * @description: default layout
 */
export const Layout = () => import('@/layout/index.vue');

/**
 * @description: parent-layout
 */
export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: PARENT_LAYOUT_NAME,
      });
    });
};
