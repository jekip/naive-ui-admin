import { h } from 'vue';
import { NAvatar, NTag } from 'naive-ui';

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
    width: 200,
  },
  {
    title: '开始日期',
    key: 'beginTime',
    width: 200,
  },
  {
    title: '结束日期',
    key: 'endTime',
    width: 200,
  },
  {
    title: '状态',
    key: 'status',
    render(row) {
      return h(
        NTag,
        {
          type: row.status ? 'success' : 'error',
        },
        {
          default: () => (row.status ? '启用' : '禁用'),
        }
      );
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
