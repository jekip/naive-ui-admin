<template>
  <n-card :bordered="false" class="proCard">
    <BasicTable
      title="表格列表"
      titleTooltip="这是一个提示"
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      ref="actionRef"
      :actionColumn="actionColumn"
      @edit-end="editEnd"
      @edit-change="onEditChange"
      @update:checked-row-keys="onCheckedRow"
      :scroll-x="1590"
    >
      <template #toolbar>
        <n-button type="primary" @click="reloadTable">刷新数据</n-button>
      </template>
    </BasicTable>
  </n-card>
</template>

<script lang="ts" setup>
  import { reactive, ref, h } from 'vue';
  import { BasicTable, TableAction } from '@/components/Table';
  import { getTableList } from '@/api/table/list';
  import { columns } from './rowColumns';

  const actionRef = ref();
  const currentEditKeyRef = ref('');
  const params = reactive({
    pageSize: 5,
    name: 'xiaoMa',
  });

  const actionColumn = reactive({
    width: 150,
    title: '操作',
    key: 'action',
    fixed: 'right',
    align: 'center',
    render(record) {
      return h(TableAction, {
        style: 'button',
        actions: createActions(record),
      });
    },
  });

  function handleEdit(record) {
    currentEditKeyRef.value = record.key;
    record.onEdit?.(true);
  }

  function handleCancel(record) {
    currentEditKeyRef.value = '';
    record.onEdit?.(false, false);
  }

  function onEditChange({ column, value, record }) {
    if (column.key === 'id') {
      record.editValueRefs.name4.value = `${value}`;
    }
    console.log(column, value, record);
  }

  async function handleSave(record) {
    const pass = await record.onEdit?.(false, true);
    if (pass) {
      currentEditKeyRef.value = '';
    }
  }

  function createActions(record) {
    if (!record.editable) {
      return [
        {
          label: '编辑',
          onClick: handleEdit.bind(null, record),
        },
      ];
    } else {
      return [
        {
          label: '保存',
          onClick: handleSave.bind(null, record),
        },
        {
          label: '取消',
          onClick: handleCancel.bind(null, record),
        },
      ];
    }
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
