<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="基础表单">
        表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。表单域标签也可支持响应式。
      </n-card>
    </div>
    <n-card :bordered="false" class="mt-4 proCard">
      <n-grid cols="1 s:1 m:3 l:3 xl:3 2xl:3" responsive="screen">
        <n-grid-item offset="0 s:0 m:1 l:1 xl:1 2xl:1">
          <n-form
            :label-width="80"
            :model="formValue"
            :rules="rules"
            label-placement="left"
            ref="formRef"
            class="py-8"
          >
            <n-form-item label="预约姓名" path="name">
              <n-input v-model:value="formValue.name" placeholder="输入姓名" />
            </n-form-item>
            <n-form-item label="预约号码" path="mobile">
              <n-input placeholder="电话号码" v-model:value="formValue.mobile" />
            </n-form-item>
            <n-form-item label="预约时间" path="datetime">
              <n-date-picker type="datetime" v-model:value="formValue.datetime" />
            </n-form-item>
            <n-form-item label="预约医生" path="doctor">
              <n-select
                placeholder="请选择预约医生"
                :options="doctorList"
                v-model:value="formValue.doctor"
              />
            </n-form-item>
            <n-form-item label="预约事项" path="matter">
              <n-select
                placeholder="请选择预约事项"
                :options="matterList"
                v-model:value="formValue.matter"
                multiple
              />
            </n-form-item>
            <n-form-item label="性别" path="sex">
              <n-radio-group v-model:value="formValue.sex" name="sex">
                <n-space>
                  <n-radio :value="1">男</n-radio>
                  <n-radio :value="2">女</n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item>
            <n-form-item label="预约备注" path="remark">
              <n-input
                v-model:value="formValue.remark"
                type="textarea"
                placeholder="请输入预约备注"
              />
            </n-form-item>
            <n-form-item label="图片" path="img">
              <BasicUpload
                :action="`${uploadUrl}/v1.0/files`"
                :headers="uploadHeaders"
                :data="{ type: 0 }"
                name="files"
                :width="100"
                :height="100"
                @uploadChange="uploadChange"
                v-model:value="uploadList"
                helpText="单个文件不超过20MB，最多只能上传10个文件"
              />
            </n-form-item>
            <div style="margin-left: 80px">
              <n-space>
                <n-button type="primary" @click="formSubmit">提交预约</n-button>
                <n-button @click="resetForm">重置</n-button>
              </n-space>
            </div>
          </n-form>
        </n-grid-item>
      </n-grid>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, unref, reactive } from 'vue';
  import { useMessage } from 'naive-ui';
  import { BasicUpload } from '@/components/Upload';
  import { useGlobSetting } from '@/hooks/setting';

  const globSetting = useGlobSetting();

  const matterList = [
    {
      label: '种牙',
      value: 1,
    },
    {
      label: '补牙',
      value: 2,
    },
    {
      label: '根管',
      value: 3,
    },
  ];

  const doctorList = [
    {
      label: '李医生',
      value: 1,
    },
    {
      label: '黄医生',
      value: 2,
    },
    {
      label: '张医生',
      value: 3,
    },
  ];

  const rules = {
    name: {
      required: true,
      message: '请输入预约姓名',
      trigger: 'blur',
    },
    remark: {
      required: true,
      message: '请输入预约备注',
      trigger: 'blur',
    },
    mobile: {
      required: true,
      message: '请输入预约电话号码',
      trigger: ['input'],
    },
    datetime: {
      required: true,
      type: 'number',
      message: '请选择预约时间',
      trigger: ['blur', 'change'],
    },
    doctor: {
      required: true,
      type: 'number',
      message: '请选择预约医生',
      trigger: 'change',
    },
  };

  const formRef: any = ref(null);
  const message = useMessage();
  const { uploadUrl } = globSetting;

  const defaultValueRef = () => ({
    name: '',
    mobile: '',
    remark: '',
    sex: 1,
    matter: null,
    doctor: null,
    datetime: [],
  });

  let formValue = reactive(defaultValueRef());
  const uploadList = ref([
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  ]);
  const uploadHeaders = reactive({
    platform: 'miniPrograms',
    timestamp: new Date().getTime(),
    token: 'Q6fFCuhc1vkKn5JNFWaCLf6gRAc5n0LQHd08dSnG4qo=',
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

  function resetForm() {
    formRef.value.restoreValidation();
    formValue = Object.assign(unref(formValue), defaultValueRef());
  }

  function uploadChange(list: string[]) {
    console.log(list);
  }
</script>
