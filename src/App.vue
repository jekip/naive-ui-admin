<template>
  <NConfigProvider
    v-if="!isLock"
    :locale="zhCN"
    :theme="getDarkTheme"
    :theme-overrides="getThemeOverrides"
    :date-locale="dateZhCN"
  >
    <AppProvider>
      <RouterView />
    </AppProvider>
  </NConfigProvider>

  <transition v-if="isLock && $route.name != 'login'" name="slide-up">
    <LockScreen />
  </transition>
</template>

<script lang="ts">
  import { defineComponent, computed, onMounted, onUnmounted } from 'vue';
  import { zhCN, dateZhCN, createTheme, inputDark, datePickerDark, darkTheme } from 'naive-ui';
  import { LockScreen } from '@/components/Lockscreen';
  import { AppProvider } from '@/components/Application';
  import { useLockscreenStore } from '@/store/modules/lockscreen';
  import { useRoute } from 'vue-router';
  import { useDesignSettingStore } from '@/store/modules/designSetting';

  export default defineComponent({
    name: 'App',
    components: { LockScreen, AppProvider },
    setup() {
      const route = useRoute();
      const useLockscreen = useLockscreenStore();
      const designStore = useDesignSettingStore();
      const isLock = computed(() => useLockscreen.isLock);
      const lockTime = computed(() => useLockscreen.lockTime);
      /**
       * @type import('naive-ui').GlobalThemeOverrides
       */
      const getThemeOverrides = computed(() => {
        return {
          common: {
            primaryColor: designStore.appTheme,
            primaryColorHover: '#57a3f3',
          },
        };
      });

      const getDarkTheme = computed(() => (designStore.darkTheme ? darkTheme : undefined));

      let timer;

      const timekeeping = () => {
        clearInterval(timer);
        if (route.name == 'login' || isLock.value) return;
        // 设置不锁屏
        useLockscreen.setLock(false);
        // 重置锁屏时间
        useLockscreen.setLockTime();
        timer = setInterval(() => {
          // 锁屏倒计时递减
          useLockscreen.setLockTime(lockTime.value - 1);
          if (lockTime.value <= 0) {
            // 设置锁屏
            useLockscreen.setLock(true);
            return clearInterval(timer);
          }
        }, 1000);
      };

      onMounted(() => {
        document.addEventListener('mousedown', timekeeping);
      });

      onUnmounted(() => {
        document.removeEventListener('mousedown', timekeeping);
      });

      return {
        darkTheme: createTheme([inputDark, datePickerDark]),
        getDarkTheme,
        zhCN,
        dateZhCN,
        isLock,
        getThemeOverrides,
      };
    },
  });
</script>

<style lang="less">
  @import 'styles/global.less';
  @import 'styles/common.less';
  @import 'styles/override.less';

  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: transform 0.35s ease-in;
  }

  .slide-up-enter-form,
  .slide-up-leave-to {
    transform: translateY(-100%);
  }
</style>
