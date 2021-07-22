<template>
  <n-card :bordered="false" class="proCard">
    <BasicTable
      title="表格列表"
      titleTooltip="这是一个提示"
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      ref="actionRef"
      @update:checked-row-keys="onCheckedRow"
    >
      <template #toolbar>
        <n-button type="primary" @click="reloadTable">刷新数据</n-button>
      </template>
    </BasicTable>
  </n-card>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, ref } from 'vue';
  import { BasicTable } from '@/components/Table';
  import { getTableList } from '@/api/table/list';
  import { columns } from './columns';

  export default defineComponent({
    components: { BasicTable },
    setup() {
      const actionRef = ref();
      const state = reactive({
        params: {
          pageSize: 5,
          name: 'xiaoMa',
        },
      });
      const loadDataTable = async (params) => {
        const data = await getTableList(params);
        return data;
      };

      function onCheckedRow(rowKeys) {
        console.log(rowKeys);
      }

      function reloadTable() {
        console.log(actionRef.value);
        actionRef.value.reload();
      }

      return {
        ...toRefs(state),
        columns,
        actionRef,
        loadDataTable,
        onCheckedRow,
        reloadTable,
      };
    },
  });
</script>

<style lang="less" scoped></style>
