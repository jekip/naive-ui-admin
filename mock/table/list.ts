import { Random } from 'mockjs'
import { resultSuccess, doCustomTimes, resultPageSuccess } from '../_util'

const tableList = ((pageSize) => {
  const result:any[] = []
  doCustomTimes(pageSize,()=> {
    result.push({
      id: '@integer(10,100)',
      beginTime: '@datetime',
      endTime: '@datetime',
      address: '@city()',
      name: '@cname()',
      avatar: Random.image('400x400', Random.color(), Random.color(), Random.first()),
      date: `@date('yyyy-MM-dd')`,
      time: `@time('HH:mm')`,
      'no|100000-10000000': 100000,
      'status|1': ['normal', 'enable', 'disable'],
    });
  })
  return result
});


export default [
  //表格数据列表
  {
    url: '/api/table/list',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { pageNumber = 1, pageSize = 10 } = query;
      const list = tableList(Number(pageSize))
      return resultSuccess({
        pageNumber:Number(pageNumber),
        pageSize:Number(pageSize),
        total: list.length,
        list
      }
      );
    },
  }
]


