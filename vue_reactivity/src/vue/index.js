import { initState } from './init'
import { compileToRender } from '../compiler'
import { LifeCycleMixin, mountComponent } from './lifecycle';
import { RenderMixIn } from '../vdom';

function Vue(options) {
  this._init(options)
}

Vue.prototype._init = function (options) {
  // this -> Vue instance because new Vue().init()
  var vm = this;

  vm.$options = options;

  initState(vm);

  if (vm.$options.el) {
    // mount function to mount the el element
    vm.$mount(vm.$options.el);
  }

}
RenderMixIn(Vue);
LifeCycleMixin(Vue);

Vue.prototype.$mount = function (el) {
  const vm = this;
  const options = vm.$options;
  el = document.querySelector(el);
  vm.$el = el;

  // no render function
  if (!options.render) {
    let template = options.template
    if (!template && el) {
      template = el.outerHTML;
    }

    const render = compileToRender(template);
    options.render = render;
  }
  mountComponent(this)
}

export default Vue