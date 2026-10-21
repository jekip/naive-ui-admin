/**
 * ECharts 按需注册
 *
 * echarts 全量引入约 1MB，这里只注册项目实际用到的图表与组件。
 * 需要新增图表类型时，在下方 `echarts.use([...])` 中补上对应的 Chart / Component 即可，
 * 可选的模块都已在注释中列出，取消注释即可启用（代价是产物变大）。
 */
import * as echarts from 'echarts/core';

import {
  BarChart,
  LineChart,
  PieChart,
  // 可选：按需取消注释
  // MapChart,
  // PictorialBarChart,
  // RadarChart,
  // ScatterChart,
  // GaugeChart,
} from 'echarts/charts';

import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  // 可选：按需取消注释
  // AriaComponent,
  // CalendarComponent,
  // DataZoomComponent,
  // GraphicComponent,
  // ParallelComponent,
  // PolarComponent,
  // RadarComponent,
  // TimelineComponent,
  // ToolboxComponent,
  // VisualMapComponent,
} from 'echarts/components';

import { SVGRenderer } from 'echarts/renderers';

echarts.use([
  // 图表
  BarChart,
  LineChart,
  PieChart,
  // 组件
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  // 渲染器：SVG 体积小且在高清屏下更清晰，需要大数据量渲染时改用 CanvasRenderer
  SVGRenderer,
]);

export default echarts;
