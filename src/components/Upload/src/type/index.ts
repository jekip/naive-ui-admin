export interface BasicProps<T = any> {
    title?: string,
    dataSource: Function,
    columns: any[],
    pagination: object,
    showPagination: boolean
}
