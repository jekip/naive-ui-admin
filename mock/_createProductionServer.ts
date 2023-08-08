import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

interface IModuleType {
  default: any[];
}

const modules = import.meta.glob<IModuleType>('./**/*.ts', { eager: true });

const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) {
    return;
  }
  mockModules.push(...modules[key].default);
});

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
