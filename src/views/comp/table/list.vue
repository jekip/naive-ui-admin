<template>
  <n-card :bordered="false" class="proCard">
    <ProTable
      title="表格列表"
      titleTooltip="这是一个提示"
      :columns="columns"
      :request="loadDataTable"
      :row-key="row => row.id"
      ref="actionRef"
      @update:checked-row-keys="onCheckedRow"
    >
      <template #toolbar>
        <n-button type="primary" @click="reloadTable">刷新数据</n-button>
      </template>
    </ProTable>
  </n-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref, h } from 'vue'
import { NTag, NButton, useMessage } from 'naive-ui'
import { ProTable } from '@/components/ProTable'
import { getTableList } from '@/api/table/list'
import { columns } from './columns'

export default defineComponent({
  components: { ProTable },
  setup() {
    const message = useMessage()
    const actionRef = ref()
    const state = reactive({
      params: {
        pageSize: 5,
        name: 'xiaoMa'
      },
    })
    const loadDataTable = async (params) => {
      const data = await getTableList(params);
      return data
    }

    function onCheckedRow(rowKeys) {
      console.log(rowKeys)
    }

    function reloadTable() {
      console.log(actionRef.value)
      actionRef.value.reload()
    }

    return {
      ...toRefs(state),
      columns,
      actionRef,
      loadDataTable,
      onCheckedRow,
      reloadTable
    }
  }
})
</script>

<style lang='less' scoped>

</style>
