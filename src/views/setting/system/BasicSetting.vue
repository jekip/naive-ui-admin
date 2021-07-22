<template>
  <n-grid cols="2 s:2 m:2 l:3 xl:3 2xl:3" responsive="screen">
    <n-grid-item>
      <n-form :label-width="80" :model="formValue" :rules="rules" ref="formRef">
        <n-form-item label="网站名称" path="name">
          <n-input v-model:value="formValue.name" placeholder="请输入网站名称" />
        </n-form-item>

        <n-form-item label="备案编号" path="icpCode">
          <n-input placeholder="请输入备案编号" v-model:value="formValue.icpCode" />
        </n-form-item>

        <n-form-item label="联系电话" path="mobile">
          <n-input placeholder="请输入联系电话" v-model:value="formValue.mobile" />
        </n-form-item>

        <n-form-item label="联系地址" path="address">
          <n-input v-model:value="formValue.address" type="textarea" placeholder="请输入联系地址" />
        </n-form-item>

        <n-form-item label="登录验证码" path="loginCode">
          <n-radio-group v-model:value="formValue.loginCode" name="loginCode">
            <n-space>
              <n-radio :value="1">开启</n-radio>
              <n-radio :value="0">关闭</n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>

        <n-form-item label="网站开启访问" path="systemOpen">
          <n-switch
            size="large"
            v-model:value="formValue.systemOpen"
            @update:value="systemOpenChange"
          />
        </n-form-item>

        <n-form-item label="网站关闭提示" path="closeText">
          <n-input
            v-model:value="formValue.closeText"
            type="textarea"
            placeholder="请输入网站关闭提示"
          />
        </n-form-item>

        <div>
          <n-space>
            <n-button type="primary" @click="formSubmit">更新基本信息</n-button>
          </n-space>
        </div>
      </n-form>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs } from 'vue';
  import { useDialog, useMessage } from 'naive-ui';

  const rules = {
    name: {
      required: true,
      message: '请输入网站名称',
      trigger: 'blur',
    },
    mobile: {
      required: true,
      message: '请输入联系电话',
      trigger: 'input',
    },
  };

  export default defineComponent({
    setup() {
      const formRef: any = ref(null);
      const message = useMessage();
      const dialog = useDialog();

      const state = reactive({
        formValue: {
          name: '',
          mobile: '',
          icpCode: '',
          address: '',
          loginCode: 0,
          closeText:
            '网站维护中，暂时无法访问！本网站正在进行系统维护和技术升级，网站暂时无法访问，敬请谅解！',
          systemOpen: true,
        },
      });

      function systemOpenChange(value) {
        if (!value) {
          dialog.warning({
            title: '提示',
            content: '您确定要关闭系统访问吗？该操作立马生效，请慎重操作！',
            positiveText: '确定',
            negativeText: '取消',
            onPositiveClick: () => {
              message.success('操作成功');
            },
            onNegativeClick: () => {
              state.formValue.systemOpen = true;
            },
          });
        }
      }

      function formSubmit() {
        formRef.value.validate((errors) => {
          if (!errors) {
            message.success('验证成功');
          } else {
            message.error('验证失败，请填写完整信息');
          }
        });
      }

      function resetForm() {
        formRef.value.restoreValidation();
      }

      return {
        formRef,
        ...toRefs(state),
        rules,
        formSubmit,
        resetForm,
        systemOpenChange,
      };
    },
  });
</script>
