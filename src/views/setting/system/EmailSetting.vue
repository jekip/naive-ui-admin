<template>
  <n-grid cols="2 s:2 m:2 l:3 xl:3 2xl:3" responsive="screen">
    <n-grid-item>
      <n-form :label-width="120" :model="formValue" :rules="rules" ref="formRef">
        <n-form-item label="发件人邮箱" path="originator">
          <n-input v-model:value="formValue.originator" placeholder="请输入发件人邮箱" />
        </n-form-item>

        <n-form-item label="SMTP服务器地址">
          <n-input placeholder="请输入SMTP服务器地址" />
        </n-form-item>

        <n-form-item label="SMTP服务器端口">
          <n-input placeholder="请输入SMTP服务器端口" />
        </n-form-item>

        <n-form-item label="SMTP用户名">
          <n-input placeholder="请输入SMTP用户名" />
        </n-form-item>

        <n-form-item label="SMTP密码">
          <n-input type="password" placeholder="请输入SMTP密码" />
        </n-form-item>

        <n-form-item label="邮件测试">
          <n-button>邮件测试</n-button>
        </n-form-item>

        <div>
          <n-space>
            <n-button type="primary" @click="formSubmit">更新邮件信息</n-button>
          </n-space>
        </div>
      </n-form>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs } from 'vue';
  import { useMessage } from 'naive-ui';

  const rules = {
    originator: {
      required: true,
      message: '请输入发件人邮箱',
      trigger: 'blur',
    },
  };
  export default defineComponent({
    setup() {
      const formRef: any = ref(null);
      const message = useMessage();

      const state = reactive({
        formValue: {
          originator: '',
        },
      });

      function formSubmit() {
        formRef.value.validate((errors) => {
          if (!errors) {
            message.success('验证成功');
          } else {
            message.error('验证失败，请填写完整信息');
          }
        });
      }

      return {
        formRef,
        ...toRefs(state),
        rules,
        formSubmit,
      };
    },
  });
</script>
