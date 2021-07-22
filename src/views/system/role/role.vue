<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="角色权限管理">
        页面数据为 Mock 示例数据，非真实数据。
      </n-card>
    </div>
    <n-card :bordered="false" class="mt-4 proCard">
      <BasicTable
        :columns="columns"
        :request="loadDataTable"
        :row-key="(row) => row.id"
        ref="actionRef"
        :actionColumn="actionColumn"
        @update:checked-row-keys="onCheckedRow"
      >
        <template #tableTitle>
          <n-button type="primary">
            <template #icon>
              <n-icon>
                <PlusOutlined />
              </n-icon>
            </template>
            添加角色
          </n-button>
        </template>

        <template #action>
          <TableAction />
        </template>
      </BasicTable>
    </n-card>

    <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" :title="editRoleTitle">
      <div class="py-3 menu-list">
        <n-tree
          block-line
          cascade
          checkable
          :virtual-scroll="true"
          :data="treeData"
          :expandedKeys="expandedKeys"
          :checked-keys="checkedKeys"
          style="max-height: 950px; overflow: hidden"
          @update:checked-keys="checkedTree"
        />
      </div>
      <template #action>
        <n-space>
          <n-button type="info" ghost icon-placement="left" @click="packHandle">
            全部{{ expandedKeys.length ? '收起' : '展开' }}
          </n-button>

          <n-button type="info" ghost icon-placement="left" @click="checkedAllHandle">
            全部{{ checkedAll ? '取消' : '选择' }}
          </n-button>
          <n-button type="primary" :loading="formBtnLoading" @click="confirmForm">提交</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, ref, h, onMounted } from 'vue';
  import { useMessage } from 'naive-ui';
  import { BasicTable, TableAction } from '@/components/Table';
  import { getRoleList } from '@/api/system/role';
  import { getMenuList } from '@/api/system/menu';
  import { columns } from './columns';
  import { PlusOutlined } from '@vicons/antd';
  import { getTreeAll } from '@/utils';

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
    components: { BasicTable, TableAction, PlusOutlined },
    setup() {
      const formRef: any = ref(null);
      const message = useMessage();
      const actionRef = ref();
      const state = reactive({
        showModal: false,
        formBtnLoading: false,
        checkedAll: false,
        editRoleTitle: '',
        treeData: [],
        expandedKeys: [],
        checkedKeys: ['console', 'step-form'],
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
                  label: '菜单权限',
                  onClick: handleMenuAuth.bind(null, record),
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
              ],
            });
          },
        },
      });

      const loadDataTable = async (params) => {
        const data = await getRoleList(params);
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

      function handleMenuAuth(record: Recordable) {
        state.editRoleTitle = `分配 ${record.name} 的菜单权限`;
        state.checkedKeys = record.menu_keys;
        state.showModal = true;
      }

      function checkedTree(keys) {
        state.checkedKeys = [state.checkedKeys, ...keys];
      }

      function packHandle() {
        if (state.expandedKeys.length) {
          state.expandedKeys = [];
        } else {
          state.expandedKeys = state.treeData.map((item) => item.key);
        }
      }

      function checkedAllHandle() {
        if (!state.checkedAll) {
          state.checkedKeys = getTreeAll(state.treeData);
          state.checkedAll = true;
        } else {
          state.checkedKeys = [];
          state.checkedAll = false;
        }
      }

      onMounted(async () => {
        const treeMenuList = await getMenuList();
        state.expandedKeys = treeMenuList.list.map((item) => item.key);
        state.treeData = treeMenuList.list;
      });

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
        handleEdit,
        handleDelete,
        handleOpen,
        handleMenuAuth,
        checkedTree,
        packHandle,
        checkedAllHandle,
      };
    },
  });
</script>

<style lang="less" scoped></style>
