import type { EChartsOption } from 'echarts';
import type { Ref } from 'vue';

import { useTimeoutFn } from '@/hooks/core/useTimeout';
import { tryOnUnmounted } from '@vueuse/core';
import { unref, nextTick, watch, computed, ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { useEventListener } from '@/hooks/event/useEventListener';
import { useBreakpoint } from '@/hooks/event/useBreakpoint';

import echarts from '@/utils/lib/echarts';

import { useDesignSetting } from '@/hooks/setting/useDesignSetting';

export function useECharts(
  elRef: Ref<HTMLDivElement>,
  theme: 'light' | 'dark' | 'default' = 'default'
) {
  const { getDarkTheme: getSysDarkTheme } = useDesignSetting();

  const getDarkTheme = computed(() => {
    const sysTheme: string = getSysDarkTheme.value ? 'dark' : 'light';
    return theme === 'default' ? sysTheme : theme;
  });

  let chartInstance: echarts.ECharts | null = null;
  let resizeFn: Fn = resize;
  const cacheOptions = ref({});
  let removeResizeFn: Fn = () => {};
  resizeFn = useDebounceFn(resize, 200);

  const getOptions = computed((): EChartsOption => {
    if (getDarkTheme.value !== 'dark') {
      return cacheOptions.value;
    }
    return {
      backgroundColor: 'transparent',
      ...cacheOptions.value,
    };
  });

  function initCharts(t = theme) {
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }

    chartInstance = echarts.init(el, t);
    const { removeEvent } = useEventListener({
      el: window,
      name: 'resize',
      listener: resizeFn,
    });
    removeResizeFn = removeEvent;
    const { widthRef, screenEnum } = useBreakpoint();
    if (unref(widthRef) <= screenEnum.MD || el.offsetHeight === 0) {
      useTimeoutFn(() => {
        resizeFn();
      }, 30);
    }
  }

  function setOptions(options: EChartsOption, clear = true) {
    cacheOptions.value = options;
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(unref(getOptions));
      }, 30);
      return;
    }
    nextTick(() => {
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts(getDarkTheme.value as 'default');

          if (!chartInstance) return;
        }
        clear && chartInstance?.clear();

        chartInstance?.setOption(unref(getOptions));
      }, 30);
    });
  }

  function resize() {
    chartInstance?.resize();
  }

  watch(
    () => getDarkTheme.value,
    (theme) => {
      if (chartInstance) {
        chartInstance.dispose();
        initCharts(theme as 'default');
        setOptions(cacheOptions.value);
      }
    }
  );

  tryOnUnmounted(disposeInstance);

  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts(getDarkTheme.value as 'default');
    }
    return chartInstance;
  }

  function disposeInstance() {
    if (!chartInstance) return;
    removeResizeFn();
    chartInstance.dispose();
    chartInstance = null;
  }

  return {
    setOptions,
    resize,
    echarts,
    getInstance,
    disposeInstance,
  };
}
