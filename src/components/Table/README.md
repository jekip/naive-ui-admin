BasicTable 重封装组件说明
====

封装说明
----

> 基础的使用方式与 API 与 [官方版(data-table)](https://www.naiveui.com/zh-CN/os-theme/components/data-table#tree) 本一致，在其基础上，封装了加载数据的方法。
>
> 你无需在你是用表格的页面进行分页逻辑处理，仅需向 BasicTable 组件传递绑定 `:api="Promise"` 对象即可
>
> 例子1
----
（基础使用）

```vue

<template>
    <BasicTable
      title="表格列表"
      :columns="columns"
      :api="loadDataTable"
      :row-key="row => row.id"
      @update:checked-row-keys="onCheckedRow"
    >
      <template #toolbar>
        <n-button type="primary">添加会员</n-button>
      </template>
    </BasicTable>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicTable } from '@/components/Table'
import { getTableList } from '@/api/table/list'
const columns = [
    {
      title: 'id',
      key: 'id'
    },
    {
      title: '名称',
      key: 'name'
    },
    {
      title: '地址',
      key: 'address',
      auth: ['amdin'], // 同时根据权限控制是否显示
      ifShow: (row) => {
        return true; // 根据业务控制是否显示
      },
    },
    {
      title: '日期',
      key: 'date'
    },
]
export default defineComponent({
  components: { BasicTable },
  setup() {
      const loadDataTable = async (params) => {
        const data = await getTableList(params);
        return data
      }
    return {
      columns,
      loadDataTable
    }
  }
})
</script>
```

API
----
BasicTable 在 NaiveUi 的 data-table 上进行了一层封装，支持了一些预设，并且封装了一些行为。这里只列出与 data-table 不同的 api。

> request：Promise 参考上面例子写法
> ref：可绑定ref 调用组件内部方法（data-table本身的方法和参数）

Methods
----
> reload：actionRef.value.reload()

> 其余方法，请打印查看

Slots
----
> 名称：tableTitle | 表格顶部左侧区域                          
> 名称：toolbar | 表格顶部右侧区域


更新时间
----

该文档最后更新于： 2021-07-12 PM 10:13
