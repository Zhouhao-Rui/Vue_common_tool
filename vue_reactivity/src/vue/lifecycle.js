export function mountComponent(vm) {
  vm._update(vm._render());
}

export function LifeCycleMixin(Vue) {
  Vue.prototype._update = function (vNode) {
    const vm = this;

  }
}

