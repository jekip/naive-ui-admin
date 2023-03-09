const allModules = import.meta.glob('./*/index.ts', { eager: true });
const modules = {} as any;
Object.keys(allModules).forEach((path) => {
  const fileName = path.split('/')[1];
  modules[fileName] = allModules[path][fileName] || allModules[path].default || allModules[path];
});

// export default modules
import asyncRoute from './async-route';
import user from './user';
import tabsView from './tabs-view';
import lockscreen from './lockscreen';

export default {
  asyncRoute,
  user,
  tabsView,
  lockscreen,
};
