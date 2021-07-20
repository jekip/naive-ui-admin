import { resultSuccess, doCustomTimes } from '../_util'

const roleList = ((pageSize) => {
    const result:any[] = []
    doCustomTimes(pageSize,()=> {
        result.push({
            id: '@integer(10,100)',
            name: '@cname()',
            explain:'@cname()',
            isDefault:'@boolean()',
            create_date: `@date('yyyy-MM-dd')`,
            'status|1': ['normal', 'enable', 'disable'],
        });
    })
    return result
});


export default [
    //表格数据列表
    {
        url: '/api/role/list',
        timeout: 1000,
        method: 'get',
        response: ({ query }) => {
            const { page = 1, pageSize = 10 } = query;
            const list = roleList(Number(pageSize))
            return resultSuccess({
                    page:Number(page),
                    pageSize:Number(pageSize),
                    pageCount: 60,
                    list
                }
            );
        },
    }
]


