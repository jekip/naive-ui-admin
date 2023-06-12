<template>
  <n-card class="proCard">
    <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset" />
  </n-card>
</template>
<script setup lang="ts">
  import { FormSchema, useForm } from '@/components/Form';
  import dayjs from 'dayjs';
  import { generateOptionFromArray } from '@/utils/utils';
  import { deliveryMethod } from '@/api/deliveryMethod';

  const schemas: FormSchema[] = [
    {
      field: 'deliveryMethod',
      component: 'NSelect',
      label: '物流渠道',
      componentProps: {
        placeholder: '请选择物流渠道',
        options: generateOptionFromArray(deliveryMethod),
      },
      rules: [{ required: true, message: '请选择物流渠道', trigger: ['blur'] }],
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
