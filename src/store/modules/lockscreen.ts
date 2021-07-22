import { defineStore } from 'pinia';
import { IS_LOCKSCREEN } from '@/store/mutation-types';
import { storage } from '@/utils/Storage';

// 长时间不操作默认锁屏时间
const initTime = 60 * 60;

const isLock = storage.get(IS_LOCKSCREEN, false);

export type ILockscreenState = {
  isLock: boolean; // 是否锁屏
  lockTime: number;
};

export const useLockscreenStore = defineStore({
  id: 'app-lockscreen',
  state: (): ILockscreenState => ({
    isLock: isLock === true, // 是否锁屏
    lockTime: isLock == 'true' ? initTime : 0,
  }),
  getters: {},
  actions: {
    setLock(payload) {
      this.isLock = payload;
      storage.set(IS_LOCKSCREEN, this.isLock);
    },
    setLockTime(payload = initTime) {
      this.lockTime = payload;
    },
  },
});
