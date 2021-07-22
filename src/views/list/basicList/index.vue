<template>
  <n-card :bordered="false" class="proCard">
    <BasicTable
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      ref="actionRef"
      :actionColumn="actionColumn"
      @update:checked-row-keys="onCheckedRow"
    >
      <template #tableTitle>
        <n-button type="primary" @click="addTable">
          <template #icon>
            <n-icon>
              <PlusOutlined />
            </n-icon>
          </template>
          新建
        </n-button>
      </template>

      <template #toolbar>
        <n-button type="primary" @click="reloadTable">刷新数据</n-button>
      </template>

      <template #action>
        <TableAction />
      </template>
    </BasicTable>

    <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" title="新建">
      <n-form
        :model="formParams"
        :rules="rules"
        ref="formRef"
        label-placement="left"
        :label-width="80"
        class="py-4"
      >
        <n-form-item label="名称" path="name">
          <n-input placeholder="请输入名称" v-model:value="formParams.name" />
        </n-form-item>
        <n-form-item label="地址" path="address">
          <n-input type="textarea" placeholder="请输入地址" v-model:value="formParams.address" />
        </n-form-item>
        <n-form-item label="日期" path="date">
          <n-date-picker type="datetime" placeholder="请选择日期" v-model:value="formParams.date" />
        </n-form-item>
      </n-form>

      <template #action>
        <n-space>
          <n-button @click="() => (showModal = false)">取消</n-button>
          <n-button type="info" :loading="formBtnLoading" @click="confirmForm">确定</n-button>
        </n-space>
      </template>
    </n-modal>
  </n-card>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, ref, h } from 'vue';
  import { useMessage } from 'naive-ui';
  import { BasicTable, TableAction } from '@/components/Table';
  import { getTableList } from '@/api/table/list';
  import { columns } from './columns';
  import { PlusOutlined } from '@vicons/antd';
  import { useRouter } from 'vue-router';

  const rules = {
    name: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入名称',
    },
    address: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入地址',
    },
    date: {
      type: 'number',
      required: true,
      trigger: ['blur', 'change'],
      message: '请选择日期',
    },
  };

  export default defineComponent({
    components: { BasicTable, PlusOutlined, TableAction },
    setup() {
      const router = useRouter();
      const formRef: any = ref(null);
      const message = useMessage();
      const actionRef = ref();
      const state = reactive({
        showModal: false,
        formBtnLoading: false,
        formParams: {
          name: '',
          address: '',
          date: [],
        },
        params: {
          pageSize: 5,
          name: 'xiaoMa',
        },
        actionColumn: {
          width: 250,
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
          render(record) {
            return h(TableAction, {
              style: 'button',
              actions: [
                {
                  label: '删除',
                  icon: 'ic:outline-delete-outline',
                  onClick: handleDelete.bind(null, record),
                  // 根据业务控制是否显示 isShow 和 auth 是并且关系
                  ifShow: () => {
                    return true;
                  },
                  // 根据权限控制是否显示: 有权限，会显示，支持多个
                  auth: ['basic_list'],
                },
                {
                  label: '编辑',
                  onClick: handleEdit.bind(null, record),
                  ifShow: () => {
                    return true;
                  },
                  auth: ['basic_list'],
                },
              ],
              dropDownActions: [
                {
                  label: '启用',
                  key: 'enabled',
                  // 根据业务控制是否显示: 非enable状态的不显示启用按钮
                  ifShow: () => {
                    return true;
                  },
                },
                {
                  label: '禁用',
                  key: 'disabled',
                  ifShow: () => {
                    return true;
                  },
                },
              ],
              select: (key) => {
                message.info(`您点击了，${key} 按钮`);
              },
            });
          },
        },
      });

      function addTable() {
        state.showModal = true;
      }

      const loadDataTable = async (params) => {
        const data = await getTableList(params);
        return data;
      };

      function onCheckedRow(rowKeys) {
        console.log(rowKeys);
      }

      function reloadTable() {
        actionRef.value.reload();
      }

      function confirmForm(e) {
        e.preventDefault();
        state.formBtnLoading = true;
        formRef.value.validate((errors) => {
          if (!errors) {
            message.success('新建成功');
            setTimeout(() => {
              state.showModal = false;
              reloadTable();
            });
          } else {
            message.error('请填写完整信息');
          }
          state.formBtnLoading = false;
        });
      }

      function handleEdit(record: Recordable) {
        console.log('点击了编辑', record);
        router.push({ name: 'basic-info', params: { id: record.id } });
      }

      function handleDelete(record: Recordable) {
        console.log('点击了删除', record);
        message.info('点击了删除');
      }

      function handleOpen(record: Recordable) {
        console.log('点击了启用', record);
        message.info('点击了删除');
      }

      return {
        ...toRefs(state),
        formRef,
        columns,
        rules,
        actionRef,
        confirmForm,
        loadDataTable,
        onCheckedRow,
        reloadTable,
        addTable,
        handleEdit,
        handleDelete,
        handleOpen,
      };
    },
  });
</script>

<style lang="less" scoped></style>
