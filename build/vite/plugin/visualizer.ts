/**
 * 打包体积分析（rollup-plugin-visualizer）
 *
 * 默认关闭，避免污染产物目录。需要分析时执行 `pnpm report`，
 * 报告输出到项目根目录的 `.analyze/` 下（已 gitignore）。
 */
import { resolve } from 'path';
import type { Plugin } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export function configVisualizerPlugin(): Plugin[] {
  if (process.env.ANALYZE !== 'true') return [];

  return [
    visualizer({
      // 输出到 .analyze 而不是 dist，产物目录保持干净
      filename: resolve(process.cwd(), '.analyze/stats.html'),
      title: 'naive-ui-admin 打包体积分析',
      template: 'treemap',
      gzipSize: true,
      brotliSize: true,
    }) as unknown as Plugin,
  ];
}
