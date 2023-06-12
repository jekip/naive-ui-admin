<template>
  <n-card class="proCard">
    <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset" />
  </n-card>
</template>
<script setup lang="ts">
  import { FormSchema, useForm } from '@/components/Form';
  import dayjs from 'dayjs';

  const schemas: FormSchema[] = [
    {
      field: 'containerNo',
      component: 'NInput',
      label: '货柜号',
      componentProps: {
        placeholder: '请输入货柜号',
      },
      rules: [{ required: true, message: '请输入货柜号', trigger: ['blur'] }],
    },
    {
      field: 'sortingLabelCount',
      component: 'NInputNumber',
      label: 'SKU分拣标签数量',
      componentProps: {
        type: 'number',
        step: 1,
        precision: 0,
        placeholder: '请输入SKU分拣标签数量',
      },
      rules: [
        { required: true, message: '请输入SKU分拣标签数量', trigger: ['blur'], type: 'number' },
      ],
    },
    {
      field: 'carNo',
      component: 'NInput',
      label: '车牌号',
      componentProps: {
        placeholder: '请输入车牌号',
      },
    },
    {
      field: 'containerSize',
      component: 'NSelect',
      label: '货柜尺寸',
      componentProps: {
        placeholder: '请选择货柜尺寸',
        options: [
          { value: '20H', label: '20H' },
          { value: '40H', label: '40H' },
          { value: '45H', label: '45H' },
        ],
      },
      rules: [{ required: true, message: '请选择货柜尺寸', trigger: ['blur'] }],
    },
    {
      field: 'containerType',
      component: 'NSelect',
      label: '货柜类型',
      componentProps: {
        placeholder: '请选择货柜类型',
        options: [
          { value: '常规货柜', label: '常规货柜' },
          { value: '查验柜', label: '查验柜' },
          { value: '工业品', label: '工业品' },
          { value: '倒柜', label: '倒柜' },
        ],
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
      rules: [{ required: true, message: '请选择货柜类型', trigger: ['blur'] }],
    },
    {
      field: 'planArriveDateTime',
      component: 'NDatePicker',
      label: '预约仓位',
      componentProps: {
        type: 'datetime',
        clearable: true,
        timePickerProps: {
          hours: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
          minutes: [0, 15, 30, 45],
          seconds: [0],
        },
        isDateDisabled: (current) => {
          return !(
            dayjs(current).isAfter(dayjs().startOf('d')) &&
            dayjs(current).isBefore(dayjs().add(3, 'month'))
          );
        },
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
      rules: [{ required: true, message: '请选择预约仓位', trigger: ['blur'], type: 'number' }],
    },
    {
      field: 'note',
      component: 'NInput',
      label: '备注',
      componentProps: {
        placeholder: '请输入备注',
      },
    },
  ];

  const [register, {}] = useForm({
    gridProps: { cols: 1 },
    labelWidth: 80,
    layout: 'vertical',
    submitButtonText: '下一步',
    schemas,
  });
  const emit = defineEmits(['submit']);

  function handleSubmit(values: Recordable) {
    emit('submit', values);
    console.log(values);
  }

  function handleReset(value: Recordable) {
    console.log(value);
  }
</script>

<style scoped lang="less"></style>
