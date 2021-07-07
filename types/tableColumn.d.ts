import { ColumnProps, TableProps } from 'ant-design-vue/lib/table/interface'

declare global {
  interface ActionOptions {
    type: 'select' | 'button' | 'text' | 'popconfirm' // 控制类型，默认为a,可选： select | button | text
    text: string
    permission?: {
      // 权限
      action?: 'create' | 'delete' | 'update' | 'retrieve' // CRUD权限：创建（Create）、更新（Update）、读取（Retrieve）和删除（Delete）操作
      effect?: 'disabled'
    }
    props?: any // 组件属性，v-bind="props"
    func?: ({ text, record, index }, callback: (...rest) => any) => any // 动作事件触发回调
  }

  interface TableColumn extends ColumnProps {
    title: string
    dataIndex: string
    width?: number
    slots?: {
      customRender: string
    }
    slotsType?: 'format' | 'link' | 'component'
    slotsFunc?: (...rest) => any
    actions?: ActionOptions[]
  }
}
