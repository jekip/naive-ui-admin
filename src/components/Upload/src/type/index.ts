export interface BasicProps {
  title?: string;
  dataSource: (...args: any[]) => any;
  columns: any[];
  pagination: object;
  showPagination: boolean;
}
