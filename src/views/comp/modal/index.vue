<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="模态框">
        模态框，用于向用户收集或展示信息，Modal 采用 Dialog 预设，扩展拖拽效果
        <br />
        以下是 useModal
        方式，ref方式，也支持，使用方式和其他组件一致，如：modalRef.value.closeModal()
      </n-card>
    </div>
    <n-card :bordered="false" class="proCard mt-4">
      <n-alert title="Modal嵌套Form" type="info">
        使用 useModal 进行弹窗展示和操作，并演示了在Modal内和Form组件，组合使用方法
      </n-alert>
      <n-divider />
      <n-space>
        <n-button type="primary" @click="showModal">打开Modal嵌套Form例子</n-button>
      </n-space>
      <n-divider />
      <n-alert title="个性化轻量级" type="info">
        使用 useModal 进行弹窗展示和操作，自定义配置，实现轻量级效果，更多配置，请参考文档
      </n-alert>
      <n-divider />
      <n-space>
        <n-button type="primary" @click="showLightModal">轻量级确认</n-button>
      </n-space>
      <n-divider />
      <n-alert title="提示" type="info">
        组件暴露了，setProps 方法，用于修改组件内部
        Props，比如标题，等，具体参考UI框架文档，DialogReactive Properties
      </n-alert>
    </n-card>

    <basicModal @register="modalRegister" ref="modalRef" class="basicModal" @on-ok="okModal">
      <template #default>
        <BasicForm @register="register" @reset="handleReset" class="basicForm">
          <template #statusSlot="{ model, field }">
            <n-input v-model:value="model[field]" />
          </template>
        </BasicForm>
      </template>
    </basicModal>

    <basicModal
      @register="lightModalRegister"
      class="basicModalLight"
      ref="modalRef"
      @on-ok="lightOkModal"
    >
      <template #default>
        <p class="text-gray-500" style="padding-left: 35px">一些对话框内容</p>
      </template>
    </basicModal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, toRefs } from 'vue';
  import { useMessage } from 'naive-ui';
  import { basicModal, useModal } from '@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '@/components/Form/index';

  const schemas: FormSchema[] = [
    {
      field: 'name',
      component: 'NInput',
      label: '姓名',
      labelMessage: '这是一个提示',
      giProps: {
        span: 1,
      },
      componentProps: {
        placeholder: '请输入姓名',
        onInput: (e: any) => {
          console.log(e);
        },
      },
      rules: [{ required: true, message: '请输入姓名', trigger: ['blur'] }],
    },
    {
      field: 'mobile',
      component: 'NInputNumber',
      label: '手机',
      componentProps: {
        placeholder: '请输入手机号码',
        showButton: false,
        onInput: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'type',
      component: 'NSelect',
      label: '类型',
      giProps: {
        //span: 24,
      },
      componentProps: {
        placeholder: '请选择类型',
        options: [
          {
            label: '舒适性',
            value: 1,
          },
          {
            label: '经济性',
            value: 2,
          },
        ],
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'makeDate',
      component: 'NDatePicker',
      label: '预约时间',
      giProps: {
        //span: 24,
      },
      defaultValue: 1183135260000,
      componentProps: {
        type: 'date',
        clearable: true,
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'makeTime',
      component: 'NTimePicker',
      label: '停留时间',
      giProps: {
        //span: 24,
      },
      componentProps: {
        clearable: true,
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'makeProject',
      component: 'NCheckbox',
      label: '预约项目',
      giProps: {
        //span: 24,
      },
      componentProps: {
        placeholder: '请选择预约项目',
        options: [
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
        ],
        onUpdateChecked: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'makeSource',
      component: 'NRadioGroup',
      label: '来源',
      giProps: {
        //span: 24,
      },
      componentProps: {
        options: [
          {
            label: '网上',
            value: 1,
          },
          {
            label: '门店',
            value: 2,
          },
        ],
        onUpdateChecked: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'status',
      label: '状态',
      giProps: {
        //span: 24,
      },
      //插槽
      slot: 'statusSlot',
    },
  ];

  export default defineComponent({
    components: { basicModal, BasicForm },
    setup() {
      const modalRef: any = ref(null);
      const message = useMessage();

      const [modalRegister, { openModal, closeModal, setSubLoading }] = useModal({
        title: '新增预约',
      });

      const [
        lightModalRegister,
        {
          openModal: lightOpenModal,
          closeModal: lightCloseModal,
          setSubLoading: lightSetSubLoading,
        },
      ] = useModal({
        title: '确认对话框',
        showIcon: true,
        type: 'warning',
        closable: false,
        maskClosable: true,
      });

      const [register, { submit }] = useForm({
        gridProps: { cols: 1 },
        collapsedRows: 3,
        labelWidth: 120,
        layout: 'horizontal',
        submitButtonText: '提交预约',
        showActionButtonGroup: false,
        schemas,
      });

      const state = reactive({
        formValue: {
          name: '小马哥',
        },
      });

      async function okModal() {
        const formRes = await submit();
        if (formRes) {
          closeModal();
          message.success('提交成功');
        } else {
          message.error('验证失败，请填写完整信息');
          setSubLoading(false);
        }
      }

      function lightOkModal() {
        lightCloseModal();
        lightSetSubLoading(false);
      }

      function showLightModal() {
        lightOpenModal();
      }

      function showModal() {
        openModal();
      }

      function handleReset(values: Recordable) {
        console.log(values);
      }

      return {
        ...toRefs(state),
        modalRef,
        register,
        modalRegister,
        lightModalRegister,
        handleReset,
        showModal,
        okModal,
        lightOkModal,
        showLightModal,
      };
    },
  });
</script>

<style lang="less">
  .basicForm {
    padding-top: 20px;
  }

  .n-dialog.basicModal {
    width: 640px;
  }

  .n-dialog.basicModalLight {
    width: 416px;
    padding-top: 26px;
  }
</style>
