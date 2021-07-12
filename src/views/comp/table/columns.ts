import { h } from 'vue'
import { NAvatar, NButton } from 'naive-ui'

export const columns = [
  {
    title: 'id',
    key: 'id'
  },
  {
    title: '名称',
    key: 'name'
  },
  {
    title: '头像',
    key: 'avatar',
    render(row) {
      return h(
        NAvatar,
        {
          size: 48,
          src: row.avatar
        }
      )
    }
  },
  {
    title: '地址',
    key: 'address'
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
  {
    title: '操作',
    key: 'actions',
    render(row) {
      return h(
        NButton,
        {
          size: 'small',
          onClick: () => {
          }
        },
        { default: () => '编辑' }
      )
    }
  }
]
