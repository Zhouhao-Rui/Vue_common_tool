import { observe_effect } from "./observe";

export function defineReactivity(data, key, val) {
  observe_effect(val)
  Object.defineProperty(data, key, {
    get() {
      console.log('get...')
      return val
    },
    set(newVal) {
      console.log('set...')
      if (newVal === val) {
        return;
      } else {
        val = newVal;
      }
    }
  })
}