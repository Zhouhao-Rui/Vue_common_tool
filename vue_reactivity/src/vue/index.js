import { initState } from './init'

function Vue(options) {
  this._init(options)
}

Vue.prototype._init = function (options) {
  // this -> Vue instance because new Vue().init()
  var vm = this;

  vm.$options = options;

  initState(vm);
}

export default Vue