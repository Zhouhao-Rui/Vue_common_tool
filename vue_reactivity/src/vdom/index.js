import { createElement, createTextVnode } from './utils'

export function RenderMixIn(Vue) {
  // createElement
  Vue.prototype._c = function () {
    return createElement(...arguments);
  }
  Vue.prototype._s = function (value) {
    if (value === null) {
      return;
    } else {
      return typeof value === 'object' ? JSON.stringify(value) : value;
    }
  }
  Vue.prototype._v = function () {
    return createTextVnode(...arguments);
  }
  Vue.prototype._render = function () {
    const vm = this;
    const render = vm.$options.render;
    const vnode = render.call(vm);
    console.log(vnode)
  }
}