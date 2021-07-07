declare module '*.bmp' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module 'moment/locale/*' {
  const LocaleMessage: { [key: string]: any }
  export default LocaleMessage
}

declare module 'ant-design-vue/es/locale-provider/*' {
  const LocaleMessage: { [key: string]: any }
  export default LocaleMessage
}

// ant-design-vue/es/base
declare module 'ant-design-vue/es/base' {
  class Base {
    static install(vue: typeof Vue): void
  }
  export default Base
}
