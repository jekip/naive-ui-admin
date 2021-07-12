import Pagination from 'naive-ui/lib/pagination';
import { VNodeChild } from 'vue';

export interface PaginationProps {
  page?: number;
  pageCount?: number,
  pageSize?: number,
  pageSizes?: number[],
  showSizePicker?: boolean,
  showQuickJumper?: boolean,
}
