<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="菜单权限管理">
        页面数据为 Mock 示例数据，非真实数据。
      </n-card>
    </div>

    <n-grid class="mt-4" cols="1 s:1 m:1 l:3 xl:3 2xl:3" responsive="screen" :x-gap="12">
      <n-gi span="1">
        <n-card :segmented="{ content: 'hard' }" :bordered="false" size="small">
          <template #header>
            <n-space>
              <n-dropdown trigger="hover" @select="selectAddMenu" :options="addMenuOptions">
                <n-button type="info" ghost icon-placement="right">
                  添加菜单
                  <template #icon>
                    <div class="flex items-center">
                      <n-icon size="14">
                        <DownOutlined />
                      </n-icon>
                    </div>
                  </template>
                </n-button>
              </n-dropdown>
              <n-button type="info" ghost icon-placement="left" @click="packHandle">
                全部{{ expandedKeys.length ? '收起' : '展开' }}
                <template #icon>
                  <div class="flex items-center">
                    <n-icon size="14">
                      <AlignLeftOutlined />
                    </n-icon>
                  </div>
                </template>
              </n-button>
            </n-space>
          </template>

          <div class="w-full menu">
            <n-input type="input" v-model:value="pattern" placeholder="输入菜单名称搜索">
              <template #suffix>
                <n-icon size="18" class="cursor-pointer">
                  <SearchOutlined />
                </n-icon>
              </template>
            </n-input>
            <div class="py-3 menu-list">
              <template v-if="loading">
                <div class="flex items-center justify-center py-4">
                  <n-spin size="medium" />
                </div>
              </template>
              <template v-else>
                <n-tree
                  block-line
                  cascade
                  checkable
                  :virtual-scroll="true"
                  :pattern="pattern"
                  :data="treeData"
                  :expandedKeys="expandedKeys"
                  style="max-height: 650px; overflow: hidden"
                  @update:selected-keys="selectedTree"
                />
              </template>
            </div>
          </div>
        </n-card>
      </n-gi>
      <n-gi span="2">
        <n-card :segmented="{ content: 'hard' }" :bordered="false" size="small">
          <template #header>
            <n-space>
              <n-icon size="18">
                <FormOutlined />
              </n-icon>
              <span>编辑菜单{{ treeItemTitle ? `：${treeItemTitle}` : '' }}</span>
            </n-space>
          </template>
          <n-alert type="info" closable> 从菜单列表选择一项后，进行编辑 </n-alert>
          <n-form
            :model="formParams"
            :rules="rules"
            ref="formRef"
            label-placement="left"
            :label-width="100"
            v-if="isEditMenu"
            class="py-4"
          >
            <n-form-item label="类型" path="type">
              <span>{{ formParams.type === 1 ? '侧边栏菜单' : '' }}</span>
            </n-form-item>
            <n-form-item label="标题" path="label">
              <n-input placeholder="请输入标题" v-model:value="formParams.label" />
            </n-form-item>
            <n-form-item label="副标题" path="subtitle">
              <n-input placeholder="请输入副标题" v-model:value="formParams.subtitle" />
            </n-form-item>
            <n-form-item label="路径" path="path">
              <n-input placeholder="请输入路径" v-model:value="formParams.path" />
            </n-form-item>
            <n-form-item label="打开方式" path="openType">
              <n-radio-group v-model:value="formParams.openType" name="openType">
                <n-space>
                  <n-radio :value="1">当前窗口</n-radio>
                  <n-radio :value="2">新窗口</n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item>
            <n-form-item label="菜单权限" path="auth">
              <n-input placeholder="请输入权限，多个权限用，分割" v-model:value="formParams.auth" />
            </n-form-item>
            <n-form-item path="auth" style="margin-left: 100px">
              <n-space>
                <n-button type="primary" :loading="subLoading" @click="formSubmit"
                  >保存修改</n-button
                >
                <n-button @click="handleReset">重置</n-button>
              </n-space>
            </n-form-item>
          </n-form>
        </n-card>
      </n-gi>
    </n-grid>

    <CreateDrawer ref="createDrawerRef" :title="drawerTitle" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, unref, reactive, toRefs, onMounted, computed } from 'vue';
  import { useMessage } from 'naive-ui';
  import { DownOutlined, AlignLeftOutlined, SearchOutlined, FormOutlined } from '@vicons/antd';
  import { getMenuList } from '@/api/system/menu';
  import { getTreeItem } from '@/utils/index';
  import CreateDrawer from './CreateDrawer.vue';

  const rules = {
    label: {
      required: true,
      message: '请输入标题',
      trigger: 'blur',
    },
    path: {
      required: true,
      message: '请输入路径',
      trigger: 'blur',
    },
  };

  export default defineComponent({
    components: { DownOutlined, AlignLeftOutlined, SearchOutlined, FormOutlined, CreateDrawer },
    setup() {
      const formRef: any = ref(null);
      const createDrawerRef = ref();
      const message = useMessage();

      const isAddSon = computed(() => {
        return state.treeItemKey.length ? false : true;
      });

      const state = reactive({
        addMenuOptions: [
          {
            label: '添加顶级菜单',
            key: 'home',
            disabled: false,
          },
          {
            label: '添加子菜单',
            key: 'son',
            disabled: isAddSon,
          },
        ],
        loading: true,
        subLoading: false,
        isEditMenu: false,
        treeData: [],
        treeItemKey: [],
        treeItemTitle: '',
        expandedKeys: [],
        formParams: {},
        pattern: '',
        drawerTitle: '',
      });

      function selectAddMenu(key) {
        state.drawerTitle = key === 'home' ? '添加顶栏菜单' : `添加子菜单：${state.treeItemTitle}`;
        openCreateDrawer();
      }

      function openCreateDrawer() {
        const { openDrawer } = createDrawerRef.value;
        openDrawer();
      }

      function selectedTree(keys) {
        if (keys.length) {
          const treeItem = getTreeItem(unref(state.treeData), keys[0]);
          state.treeItemKey = keys;
          state.treeItemTitle = treeItem.label;
          state.formParams = Object.assign(state.formParams, treeItem);
          state.isEditMenu = true;
        } else {
          state.isEditMenu = false;
          state.treeItemKey = [];
          state.treeItemTitle = '';
        }
      }

      function handleReset() {
        const treeItem = getTreeItem(unref(state.treeData), state.treeItemKey[0]);
        state.formParams = Object.assign(state.formParams, treeItem);
      }

      function formSubmit() {
        formRef.value.validate((errors) => {
          if (!errors) {
            message.error('抱歉，您没有该权限');
          } else {
            message.error('请填写完整信息');
          }
        });
      }

      function packHandle() {
        if (state.expandedKeys.length) {
          state.expandedKeys = [];
        } else {
          state.expandedKeys = state.treeData.map((item) => item.key);
        }
      }

      function onExpandedKeys() {
        // let key = keys[0]
        // console.log(state.expandedKeys)
        // if(state.expandedKeys.includes(key)){
        //   state.expandedKeys.splice(state.expandedKeys.findIndex(item => item === key), 1)
        //   console.log(state.expandedKeys)
        // }else{
        //   state.expandedKeys.push(key)
        // }
      }

      onMounted(async () => {
        const treeMenuList = await getMenuList();
        state.expandedKeys = treeMenuList.list.map((item) => item.key);
        state.treeData = treeMenuList.list;
        state.loading = false;
      });

      return {
        ...toRefs(state),
        createDrawerRef,
        formRef,
        rules,
        selectedTree,
        handleReset,
        formSubmit,
        packHandle,
        onExpandedKeys,
        selectAddMenu,
      };
    },
  });
</script>
