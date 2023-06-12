<template>
  <n-card class="proCard">
    <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset" />
  </n-card>
</template>
<script setup lang="ts">
  import { FormSchema, useForm } from '@/components/Form';
  import dayjs from 'dayjs';
  import { generateOptionFromArray } from '@/utils/utils';

  const schemas: FormSchema[] = [
    {
      field: 'traySize',
      component: 'NSelect',
      label: '托盘尺寸',
      componentProps: {
        placeholder: '请选择托盘尺寸',
        options: generateOptionFromArray(['80*120', '60*80', '100*100', '120*120', '80*240']),
      },
      rules: [{ required: true, message: '请选择托盘尺寸', trigger: ['blur'] }],
    },
    {
      field: 'trayCount',
      component: 'NInputNumber',
      label: '托盘数量',
      componentProps: {
        type: 'number',
        step: 1,
        precision: 0,
        placeholder: '请输入托盘数量',
      },
      rules: [{ required: true, message: '请输入托盘数量', trigger: ['blur'], type: 'number' }],
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
      field: 'trayType',
      component: 'NSelect',
      label: '托盘类型',
      componentProps: {
        placeholder: '请选择托盘类型',
        options: generateOptionFromArray(['FP', 'XP']),
      },
      rules: [{ required: true, message: '请选择托盘类型', trigger: ['blur'] }],
    },
    {
      field: 'goodsType',
      component: 'NSelect',
      label: '货品类型',
      componentProps: {
        placeholder: '请选择货品类型',
        options: generateOptionFromArray(['超规', '常规']),
      },
      rules: [{ required: true, message: '请选择货品类型', trigger: ['blur'] }],
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
      },
      rules: [{ required: true, message: '请选择预约仓位', trigger: ['blur'], type: 'number' }],
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
