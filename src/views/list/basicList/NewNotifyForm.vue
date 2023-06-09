<template>
  <n-card class="proCard">
    <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset" />
  </n-card>
</template>
<script setup lang="ts">
  import { FormSchema, useForm } from '@/components/Form';
  import { salesNameList } from '@/api/sales';
  import dayjs from 'dayjs';
  import { deliveryMethod } from '@/api/deliveryMethod';
  import { warehouseList } from '@/api/warehouse';
  import { notifyStatusList } from '@/api/notify/statusList';

  const schemas: FormSchema[] = [
    {
      field: 'salesName',
      component: 'NSelect',
      label: '负责人',
      componentProps: {
        placeholder: '请选择负责人',
        options: salesNameList.map((it) => {
          return {
            value: it,
            label: it,
          };
        }),
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'planArriveDate',
      component: 'NDatePicker',
      label: '预约时间',
      defaultValue: dayjs().valueOf(),
      componentProps: {
        type: 'date',
        clearable: true,
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'deliveryMethod',
      component: 'NSelect',
      label: '物流渠道',
      componentProps: {
        placeholder: '请选择物流渠道',
        options: deliveryMethod.map((it) => {
          return {
            value: it,
            label: it,
          };
        }),
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'arriveWarehouseName',
      component: 'NSelect',
      label: '到货仓库',
      componentProps: {
        placeholder: '请选择到货仓库',
        options: warehouseList.map((it) => {
          return {
            value: it,
            label: it,
          };
        }),
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'status',
      component: 'NSelect',
      label: '状态',
      componentProps: {
        placeholder: '状态',
        options: notifyStatusList.map((it) => {
          return {
            value: it,
            label: it,
          };
        }),
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
  ];

  const [register, {}] = useForm({
    gridProps: { cols: 1 },
    labelWidth: 80,
    layout: 'vertical',
    submitButtonText: '新建',
    schemas,
  });

  function handleSubmit(values: Recordable) {
    console.log(values);
  }

  function handleReset(value: Recordable) {
    console.log(value);
  }
</script>

<style scoped lang="less"></style>
