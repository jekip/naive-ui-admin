import Vue, { VNode } from 'vue'

declare module '*.tsx' {
  import Vue from 'compatible-vue'
  export default Vue
}

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode
    // tslint:disable no-empty-interface
    type ElementClass = Vue
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
