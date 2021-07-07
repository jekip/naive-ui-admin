import { RoleEnum } from '@/enums/roleEnum'

export interface Meta {
  // 名称
  title: string
  // 是否忽略权限
  ignoreAuth?: boolean
  roles?: RoleEnum[]
  // 是否不缓存
  noKeepAlive?: boolean
  // 是否固定在tab上
  affix?: boolean
  // tab上的图标
  icon?: string
  // 跳转地址
  frameSrc?: string
  // 外链跳转地址
  externalLink?: string
}
