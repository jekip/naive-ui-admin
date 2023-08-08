<template>
  <n-drawer v-model:show="isDrawer" :width="width" :placement="placement">
    <n-drawer-content :title="title" closable>
      <n-form
        :model="formParams"
        :rules="rules"
        ref="formRef"
        label-placement="left"
        :label-width="100"
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
        <n-form-item label="隐藏侧边栏" path="hidden">
          <n-switch v-model:value="formParams.hidden" />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space>
          <n-button type="primary" :loading="subLoading" @click="formSubmit">提交</n-button>
          <n-button @click="handleReset">重置</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs } from 'vue';
  import { useMessage } from 'naive-ui';

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
    name: 'CreateDrawer',
    components: {},
    props: {
      title: {
        type: String,
        default: '添加顶级菜单',
      },
      width: {
        type: Number,
        default: 450,
      },
    },
    setup() {
      const message = useMessage();
      const formRef: any = ref(null);
      const defaultValueRef = () => ({
        label: '',
        type: 1,
        subtitle: '',
        openType: 1,
        auth: '',
        path: '',
        hidden: false,
      });

      const state = reactive({
        isDrawer: false,
        subLoading: false,
        formParams: defaultValueRef(),
        placement: 'right' as const,
        alertText:
          '该功能主要实时预览各种布局效果，更多完整配置在 projectSetting.ts 中设置，建议在生产环境关闭该布局预览功能。',
      });

      function openDrawer() {
        state.isDrawer = true;
      }

      function closeDrawer() {
        state.isDrawer = false;
      }

      function formSubmit() {
        formRef.value.validate((errors) => {
          if (!errors) {
            message.success('添加成功');
            handleReset();
            closeDrawer();
          } else {
            message.error('请填写完整信息');
          }
        });
      }

      function handleReset() {
        formRef.value.restoreValidation();
        state.formParams = Object.assign(state.formParams, defaultValueRef());
      }

      return {
        ...toRefs(state),
        formRef,
        rules,
        formSubmit,
        handleReset,
        openDrawer,
        closeDrawer,
      };
    },
  });
</script>
