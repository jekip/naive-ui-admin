import { ref, onMounted, onUnmounted } from 'vue';
import { debounce } from 'lodash';

/**
 * description: 获取页面宽度
 */

export function useDomWidth() {
  const domWidth = ref(window.innerWidth);

  function resize() {
    domWidth.value = document.body.clientWidth;
  }

  onMounted(() => {
    window.addEventListener('resize', debounce(resize, 80));
  });
  onUnmounted(() => {
    window.removeEventListener('resize', resize);
  });

  return domWidth;
}
