import { h } from 'vue';
import { NAvatar } from 'naive-ui';

export const columns = [
  {
    title: 'id',
    key: 'id',
  },
  {
    title: '名称',
    key: 'name',
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
    auth: ['basic_list'], // 同时根据权限控制是否显示
    ifShow: (_column) => {
      return true; // 根据业务控制是否显示
    },
  },
  {
    title: '开始日期',
    key: 'beginTime',
  },
  {
    title: '结束日期',
    key: 'endTime',
  },
  {
    title: '创建时间',
    key: 'date',
  },
  // {
  //     title: '操作',
  //     key: 'actions',
  //     width: 150,
  //     //简单写一下例子，不建议这么写，过段时间，这里封二次封装
  //     render() {
  //         return [
  //             h(
  //                 NButton,
  //                 {
  //                     size: 'small',
  //                     type: 'error',
  //                     style: 'margin-right:10px',
  //                     onClick: () => {
  //                     }
  //                 },
  //                 { default: () => '删除' }
  //             ),
  //             h(
  //                 NButton,
  //                 {
  //                     size: 'small',
  //                     onClick: () => {
  //
  //                     }
  //                 },
  //                 { default: () => '编辑' }
  //             )
  //         ]
  //     }
  // }
];
