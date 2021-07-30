import { h } from 'vue';
import { NAvatar } from 'naive-ui';

export const columns = [
  {
    title: 'id',
    key: 'id',
  },
  {
    title: '编码',
    key: 'no',
  },
  {
    title: '名称',
    key: 'name',
    editComponent: 'NInput',
    editRow: true,
    // 默认必填校验
    editRule: true,
    edit: true,
    width: 200,
  },
  {
    title: '头像',
    key: 'avatar',
    render(row) {
      return h(NAvatar, {
        size: 48,
        src: row.avatar,
      });
    },
  },
  {
    title: '地址',
    key: 'address',
    editRow: true,
    editComponent: 'NSelect',
    editComponentProps: {
      options: [
        {
          label: '广东省',
          value: 1,
        },
        {
          label: '浙江省',
          value: 2,
        },
      ],
    },
    edit: true,
    width: 200,
  },
  {
    title: '开始日期',
    key: 'beginTime',
    editRow: true,
    edit: true,
    width: 250,
    editComponent: 'NDatePicker',
    editComponentProps: {
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm:ss',
    },
  },
  {
    title: '结束日期',
    key: 'endTime',
    width: 200,
  },
  {
    title: '状态',
    key: 'status',
    editRow: true,
    edit: true,
    width: 100,
    editComponent: 'NSwitch',
    editValueMap: (value) => {
      return value ? '启用' : '禁用';
    },
  },
  {
    title: '创建时间',
    key: 'date',
  },
  {
    title: '停留时间',
    key: 'time',
  },
];
