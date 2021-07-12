export default {
  table: {
    apiSetting: {
      // 当前页的字段名
      pageField: 'page',
      // 每页数量字段名
      sizeField: 'pageSize',
      // 接口返回的数据字段名
      listField: 'list',
      // 接口返回总页数字段名
      totalField: 'pageCount',
    },
    //默认分页数量
    defaultPageSize: 10,
    //可切换每页数量集合
    pageSizes: [10, 20, 30, 40, 50],
  }
}
