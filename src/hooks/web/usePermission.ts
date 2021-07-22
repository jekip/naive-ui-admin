import { useUserStore } from '@/store/modules/user';

export function usePermission() {
  const userStore = useUserStore();

  /**
   * 检查权限
   * @param accesses
   */
  function _someRoles(accesses: string[]) {
    return userStore.getRoles.some((item) => {
      const { value }: any = item;
      return accesses.includes(value);
    });
  }

  /**
   * 判断是否存在权限
   * 可用于 v-if 显示逻辑
   * */
  function hasPermission(accesses: string[]): boolean {
    if (!accesses || !accesses.length) return true;
    return _someRoles(accesses);
  }

  /**
   * 是否包含指定的所有权限
   * @param accesses
   */
  function hasEveryPermission(accesses: string[]): boolean {
    const rolesList = userStore.getRoles;
    if (Array.isArray(accesses)) {
      return accesses.every((access) => !!rolesList[access]);
    }
    throw new Error(`[hasEveryPermission]: ${accesses} should be a array !`);
  }

  /**
   * 是否包含其中某个权限
   * @param accesses
   * @param accessMap
   */
  function hasSomePermission(accesses: string[]): boolean {
    const rolesList = userStore.getRoles;
    if (Array.isArray(accesses)) {
      return accesses.some((access) => !!rolesList[access]);
    }
    throw new Error(`[hasSomePermission]: ${accesses} should be a array !`);
  }

  return { hasPermission, hasEveryPermission, hasSomePermission };
}
