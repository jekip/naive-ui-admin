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
              <n-dropdown trigger="hover" :options="addMenuOptions">
                <n-button type="info" ghost icon-placement="right">
                  添加菜单
                  <template #icon>
                    <div class="flex items-center">
                      <n-icon size="14">
                        <DownOutlined/>
                      </n-icon>
                    </div>
                  </template>
                </n-button>
              </n-dropdown>
              <n-button type="info" ghost icon-placement="left">
                全部收起
                <template #icon>
                  <div class="flex items-center">
                    <n-icon size="14">
                      <AlignLeftOutlined/>
                    </n-icon>
                  </div>
                </template>
              </n-button>
            </n-space>
          </template>

          <div class="w-full menu">
            <n-input type="input" placeholder="输入菜单名称搜索">
              <template #suffix>
                <n-icon size="18" class="cursor-pointer">
                  <SearchOutlined/>
                </n-icon>
              </template>
            </n-input>
            <div class="py-3 menu-list">
              <n-tree
                  block-line
                  cascade
                  checkable
                  :data="treeData"
                  :default-expanded-keys="defaultExpandedKeys"
              />
            </div>
          </div>

        </n-card>
      </n-gi>
      <n-gi span="2">
        <n-card :segmented="{ content: 'hard' }" :bordered="false" size="small">
          <template #header>
            <n-space>
              <n-icon size="18">
                <EditOutlined />
              </n-icon>
              编辑菜单
            </n-space>
          </template>
          <n-alert type="info" closable>
            从菜单列表选择一项后，进行编辑
          </n-alert>
          <n-form
              :model="formParams"
              :rules="rules"
              ref="formRef"
              label-placement="left"
              :label-width="100"
          >
            <n-form-item label="类型" path="type">
              <span>{{formParams.type}}</span>
            </n-form-item>
            <n-form-item label="标题" path="title">
              <n-input placeholder="请输入标题" v-model:value="formParams.title" />
            </n-form-item>
            <n-form-item label="副标题" path="subTitle">
              <n-input placeholder="请输入副标题" v-model:value="formParams.subTitle" />
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
                <n-button type="primary">保存修改</n-button>
                <n-button>重置</n-button>
              </n-space>
            </n-form-item>
          </n-form>
        </n-card>
      </n-gi>
    </n-grid>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, } from 'vue'
import { useMessage } from 'naive-ui'
import { DownOutlined, AlignLeftOutlined, SearchOutlined, EditOutlined } from '@vicons/antd'

const rules = {

}

export default defineComponent({
  components: { DownOutlined, AlignLeftOutlined, SearchOutlined, EditOutlined },
  setup() {

    const message = useMessage()

    const state = reactive({
      addMenuOptions: [
        {
          label: '添加顶级菜单',
          key: 'home',
          disabled: false
        },
        {
          label: '添加子菜单',
          key: 'son',
          disabled: false
        },
      ],
      treeData: [
        {
          label: 'Dashboard',
          key: 'dashboard',
          children: [
            {
              label: '主控台',
              key: 'console',
            },
            {
              label: '工作台',
              key: 'workplace',
            }
          ]
        },
        {
          label: '表单管理',
          key: 'form',
          children: [
            {
              label: '基础表单',
              key: 'basic-form',
            },
            {
              label: '分步表单',
              key: 'step-form',
            },
            {
              label: '表单详情',
              key: 'detail',
            }
          ]
        }

      ],
      defaultExpandedKeys: ref(['home', 'dashboard']),
      formParams: {
        type: '侧边栏菜单',
        title: '工作台',
        subTitle:'',
        path:'/dashboard/workplace',
        openType:1
      },
    })

    return {
      ...toRefs(state),
      rules
    }
  }
})
</script>
