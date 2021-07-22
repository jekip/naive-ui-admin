<template>
  <n-grid cols="2 s:2 m:2 l:3 xl:3 2xl:3" responsive="screen">
    <n-grid-item>
      <n-form :label-width="120" :model="formValue" :rules="rules" ref="formRef">
        <n-form-item label="商品图片(大)">
          <n-space align="center">
            <span>宽度：</span>
            <n-input
              v-model:value="formValue.bigWidth"
              style="width: 80px"
              placeholder="宽度像素"
            />
            <span>高度：</span>
            <n-input
              v-model:value="formValue.bigHeight"
              style="width: 80px"
              placeholder="高度像素"
            />
          </n-space>
        </n-form-item>

        <n-form-item label="商品图片(小)">
          <n-space align="center">
            <span>宽度：</span>
            <n-input
              v-model:value="formValue.smallWidth"
              style="width: 80px"
              placeholder="宽度像素"
            />
            <span>高度：</span>
            <n-input
              v-model:value="formValue.smallHeight"
              style="width: 80px"
              placeholder="高度像素"
            />
          </n-space>
        </n-form-item>

        <n-form-item label="水印透明度" path="watermarkClarity">
          <n-input-number
            v-model:value="formValue.watermarkClarity"
            :show-button="false"
            placeholder="请输入水印透明度"
          />
        </n-form-item>

        <n-form-item label="水印图片" path="watermarkClarity">
          <n-upload action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f">
            <n-button>上传文件</n-button>
          </n-upload>
        </n-form-item>

        <n-form-item label="水印位置" path="watermarkPlace">
          <n-select
            placeholder="请选择价格精确方式"
            :options="watermarkPlaceList"
            v-model:value="formValue.watermarkPlace"
          />
        </n-form-item>

        <n-form-item label="价格精确位数" path="pricePreciseNum">
          <n-select
            placeholder="请选择价格精确位数"
            :options="pricePreciseNumList"
            v-model:value="formValue.pricePreciseNum"
          />
        </n-form-item>

        <n-form-item label="价格精确方式" path="pricePrecise">
          <n-select
            placeholder="请选择价格精确方式"
            :options="pricePreciseList"
            v-model:value="formValue.pricePrecise"
          />
        </n-form-item>

        <n-form-item label="前台显示市场价" path="isMarketPrice">
          <n-switch size="large" v-model:value="formValue.isMarketPrice" />
        </n-form-item>

        <div>
          <n-space>
            <n-button type="primary" @click="formSubmit">更新显示信息</n-button>
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
  const watermarkPlaceList = [
    {
      label: '左上',
      value: 1,
    },
    {
      label: '右上',
      value: 2,
    },
    {
      label: '居中',
      value: 3,
    },
    {
      label: '右下',
      value: 4,
    },
  ];

  const pricePreciseNumList = [
    {
      label: '2位',
      value: 1,
    },
    {
      label: '3位',
      value: 2,
    },
    {
      label: '4位',
      value: 3,
    },
  ];
  const pricePreciseList = [
    {
      label: '四舍五入',
      value: 1,
    },
    {
      label: '向上取整',
      value: 2,
    },
    {
      label: '向下取整',
      value: 3,
    },
  ];

  export default defineComponent({
    setup() {
      const formRef: any = ref(null);
      const message = useMessage();
      const dialog = useDialog();

      const state = reactive({
        formValue: {
          bigWidth: '',
          bigHeight: '',
          smallWidth: '',
          smallHeight: '',
          watermarkClarity: null,
          pricePrecise: 1,
          isMarketPrice: true,
          pricePreciseNum: null,
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
        pricePreciseList,
        watermarkPlaceList,
        pricePreciseNumList,
        rules,
        formSubmit,
        resetForm,
        systemOpenChange,
      };
    },
  });
</script>
