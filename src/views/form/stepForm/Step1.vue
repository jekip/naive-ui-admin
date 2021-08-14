<template>
  <n-form
    :label-width="90"
    :model="formValue"
    :rules="rules"
    label-placement="left"
    ref="form1Ref"
    style="max-width: 500px; margin: 40px auto 0 80px"
  >
    <n-form-item label="付款账户" path="myAccount">
      <n-select
        placeholder="请选择付款账户"
        :options="myAccountList"
        v-model:value="formValue.myAccount"
      />
    </n-form-item>
    <n-form-item label="收款账户" path="account">
      <n-input-group>
        <n-select
          placeholder="请选择"
          :options="accountTypeList"
          :style="{ width: '20%' }"
          v-model:value="formValue.accountType"
        />
        <n-input
          placeholder="请输入收款账户"
          :style="{ width: '80%' }"
          v-model:value="formValue.account"
        />
      </n-input-group>
    </n-form-item>
    <n-form-item label="收款人姓名" path="name">
      <n-input placeholder="请输入收款人姓名" v-model:value="formValue.name" />
    </n-form-item>
    <n-form-item label="转账金额" path="money">
      <n-input placeholder="请输入转账金额" v-model:value="formValue.money">
        <template #prefix>
          <span class="text-gray-400">￥</span>
        </template>
      </n-input>
    </n-form-item>
    <div style="margin-left: 80px">
      <n-space>
        <n-button type="primary" @click="formSubmit">下一步</n-button>
      </n-space>
    </div>
  </n-form>
</template>

<script lang="ts" setup>
  import { ref, defineEmits } from 'vue';
  import { useMessage } from 'naive-ui';

  const myAccountList = [
    {
      label: 'NaiveUiAdmin@163.com',
      value: 1,
    },
    {
      label: 'NaiveUiAdmin@qq.com',
      value: 2,
    },
  ];

  const accountTypeList = [
    {
      label: '微信',
      value: 1,
    },
    {
      label: '支付宝',
      value: 2,
    },
  ];

  const emit = defineEmits(['nextStep']);

  const form1Ref: any = ref(null);
  const message = useMessage();

  const formValue = ref({
    accountType: 1,
    myAccount: null,
    account: 'xioama@qq.com',
    money: '1980',
    name: 'Ah jung',
  });

  const rules = {
    name: {
      required: true,
      message: '请输入收款人姓名',
      trigger: 'blur',
    },
    account: {
      required: true,
      message: '请输入收款账户',
      trigger: 'blur',
    },
    money: {
      required: true,
      message: '请输入转账金额',
      trigger: 'blur',
    },
    myAccount: {
      required: true,
      type: 'number',
      message: '请选择付款账户',
      trigger: 'change',
    },
  };

  function formSubmit() {
    form1Ref.value.validate((errors) => {
      if (!errors) {
        emit('nextStep');
      } else {
        message.error('验证失败，请填写完整信息');
      }
    });
  }
</script>
