declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}

// declare module '*.vue' {
//     import * as vue from 'vue';
//     export declare const render: vue.RootRenderFunction<Element | DocumentFragment>
// }

// declare module '@vue/runtime-core' {
//     interface ComponentCustomProperties {
//         $createLoading: () => any
//     }
// }

declare type Nullable<T> = T | null

declare type CustomizedHTMLElement<T> = HTMLElement & T

declare type Indexable<T> = {
  [key: string]: T
}
