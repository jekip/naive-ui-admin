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
          @update:expanded-keys="onExpandedKeys"
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

<script lang="ts" setup>
  import { reactive, ref, unref, h, onMounted } from 'vue';
  import { useMessage } from 'naive-ui';
  import { BasicTable, TableAction } from '@/components/Table';
  import { getRoleList } from '@/api/system/role';
  import { getMenuList } from '@/api/system/menu';
  import { columns } from './columns';
  import { PlusOutlined } from '@vicons/antd';
  import { getTreeAll } from '@/utils';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const message = useMessage();
  const actionRef = ref();

  const showModal = ref(false);
  const formBtnLoading = ref(false);
  const checkedAll = ref(false);
  const editRoleTitle = ref('');
  const treeData = ref([]);
  const expandedKeys = ref([]);
  const checkedKeys = ref(['console', 'step-form']);

  const params = reactive({
    pageSize: 5,
    name: 'xiaoMa',
  });

  const actionColumn = reactive({
    width: 250,
    title: '操作',
    key: 'action',
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
  });

  const loadDataTable = async (res: any) => {
    let _params = {
      ...unref(params),
      ...res,
    };
    return await getRoleList(_params);
  };

  function onCheckedRow(rowKeys: any[]) {
    console.log(rowKeys);
  }

  function reloadTable() {
    actionRef.value.reload();
  }

  function confirmForm(e: any) {
    e.preventDefault();
    formBtnLoading.value = true;
    setTimeout(() => {
      showModal.value = false;
      message.success('提交成功');
      reloadTable();
      formBtnLoading.value = false;
    }, 200);
  }

  function handleEdit(record: Recordable) {
    console.log('点击了编辑', record);
    router.push({ name: 'basic-info', params: { id: record.id } });
  }

  function handleDelete(record: Recordable) {
    console.log('点击了删除', record);
    message.info('点击了删除');
  }

  function handleMenuAuth(record: Recordable) {
    editRoleTitle.value = `分配 ${record.name} 的菜单权限`;
    checkedKeys.value = record.menu_keys;
    showModal.value = true;
  }

  function checkedTree(keys) {
    checkedKeys.value = [checkedKeys.value, ...keys];
  }

  function onExpandedKeys(keys) {
    expandedKeys.value = keys;
  }

  function packHandle() {
    if (expandedKeys.value.length) {
      expandedKeys.value = [];
    } else {
      expandedKeys.value = treeData.value.map((item: any) => item.key) as [];
    }
  }

  function checkedAllHandle() {
    if (!checkedAll.value) {
      checkedKeys.value = getTreeAll(treeData.value);
      checkedAll.value = true;
    } else {
      checkedKeys.value = [];
      checkedAll.value = false;
    }
  }

  onMounted(async () => {
    const treeMenuList = await getMenuList();
    expandedKeys.value = treeMenuList.list.map((item) => item.key);
    treeData.value = treeMenuList.list;
  });
</script>

<style lang="less" scoped></style>
