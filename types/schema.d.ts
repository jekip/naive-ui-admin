import { VNode, ComponentInternalInstance, HTMLAttributes, CSSProperties } from 'vue'
import { RuleObject } from 'ant-design-vue/lib/form/interface'
import { FormItemProps } from 'ant-design-vue/lib/form/FormItem'
import { FormProps, ValidationRule } from 'ant-design-vue/lib/form/Form'

declare global {
  declare interface OptionItem {
    label: string
    value: string | number
    [key: string]: any
  }

  declare type Rule =
    | ValidationRule
    | {
        trigger?: 'blur' | 'change' | string['blur' | 'change']
      }

  declare interface FormItem extends Partial<typeof FormItemProps> {
    type?:
      | 'input'
      | 'textarea'
      | 'select'
      | 'radio'
      | 'checkbox'
      | 'input-number'
      | 'inputRange'
      | 'switch'
      | VNode
    label?: string // 表单标签
    field: string // 表单字段
    value: any // 表单默认值
    props?: Partial<
      HTMLAttributes | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | any
    > // 表单属性
    rules?: Rule[] // 表单验证规则
    options?: OptionItem[] // 可选项
    eventObject?: object // 事件对象，例如：{ mousedown: doThis, mouseup: doThat } 将会动态绑定为：v-on="{ mousedown: doThis, mouseup: doThat }"
    loading?: boolean // 异步数据是否加载
    asyncValue?: (
      formItem: FormItem,
      formInstance: ComponentInternalInstance | null
    ) => Promise<any> // 异步数据
    asyncOptions?: (
      formItem: FormItem,
      formInstance: ComponentInternalInstance | null
    ) => Promise<OptionItem[]> // 异步选项的数据
    hidden?: boolean // 是否隐藏表单项
    placeholder?: string
  }

  interface FormSchema extends Partial<typeof FormProps> {
    style?: CSSProperties // 表单样式
    formItemLayout?: object // 表单布局
    watchKeys?: string[]
    watchCallback?: (watchKeys: string[], { dynamicForm, modelRef }) => any
    formItem: FormItem[]
  }
}
