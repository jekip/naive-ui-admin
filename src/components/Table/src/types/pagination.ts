export interface PaginationProps {
  page?: number; //受控模式下的当前页
  itemCount?: number; //总条数
  pageCount?: number; //总页数
  pageSize?: number; //受控模式下的分页大小
  pageSizes?: number[]; //每页条数， 可自定义
  showSizePicker?: boolean; //是否显示每页条数的选择器
  showQuickJumper?: boolean; //是否显示快速跳转
  prefix?: any; //分页前缀
}
