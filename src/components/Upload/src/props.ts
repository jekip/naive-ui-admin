import type { PropType } from 'vue';
import { NUpload } from 'naive-ui';

// NUpload.props 没有导出类型声明，直接展开会让 basicProps 退化成 any，
// 进而让组件的 props 类型整体丢失，这里先收敛成通用描述再展开
const nUploadProps = NUpload.props as Record<string, { type?: unknown; default?: unknown }>;

export const basicProps = {
  ...nUploadProps,
  accept: {
    type: String,
    default: '.jpg,.png,.jpeg,.svg,.gif',
  },
  helpText: {
    type: String as PropType<string>,
    default: '',
  },
  maxSize: {
    type: Number as PropType<number>,
    default: 2,
  },
  maxNumber: {
    type: Number as PropType<number>,
    default: Infinity,
  },
  value: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  width: {
    type: Number as PropType<number>,
    default: 104,
  },
  height: {
    type: Number as PropType<number>,
    default: 104, //建议不小于这个尺寸 太小页面可能显示有异常
  },
};
