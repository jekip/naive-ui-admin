<template>
  <n-card :bordered="false" class="proCard">
    <BasicTable
      title="表格列表"
      titleTooltip="这是一个提示"
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      ref="actionRef"
      @edit-end="editEnd"
      @edit-change="onEditChange"
      @update:checked-row-keys="onCheckedRow"
      :scroll-x="1360"
    >
      <template #toolbar>
        <n-button type="primary" @click="reloadTable">刷新数据</n-button>
      </template>
    </BasicTable>
  </n-card>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { BasicTable } from '@/components/Table';
  import { getTableList } from '@/api/table/list';
  import { columns } from './CellColumns';

  const actionRef = ref();
  const params = reactive({
    pageSize: 5,
    name: 'xiaoMa',
  });

  function onEditChange({ column, value, record }) {
    if (column.key === 'id') {
      record.editValueRefs.name4.value = `${value}`;
    }
    console.log(column, value, record);
  }

  const loadDataTable = async (res) => {
    return await getTableList({ ...params, ...res });
  };

  function onCheckedRow(rowKeys) {
    console.log(rowKeys);
  }

  function reloadTable() {
    console.log(actionRef.value);
    actionRef.value.reload();
  }

  function editEnd({ record, index, key, value }) {
    console.log(value);
  }
</script>

<style lang="less" scoped></style>
