import type {
    TableBaseColumn,
} from 'naive-ui/lib/data-table/src/interface';

export interface BasicColumn extends TableBaseColumn {

}

export interface TableActionType {
    reload: (opt) => Promise<void>;
    emit?: any;
    getColumns: (opt) => BasicColumn[];
    setColumns: (columns: BasicColumn[] | string[]) => void;
}

export interface BasicTableProps<T = any> {
    title?: string,
    dataSource: Function,
    columns: any[],
    pagination: object,
    showPagination: boolean
}
