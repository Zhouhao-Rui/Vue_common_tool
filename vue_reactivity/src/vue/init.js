import { proxyData } from './proxy'
import { observe_effect } from './observe'
export function initState(vm) {
  let options = vm.$options;

  if (options.data) {
    initData(vm);
  }
}

function initData(vm) {
  var data = vm.$options.data;

  // proxy data to the vm._data to the data
  // data.call(vm) change the this pointer to the vm
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};

  // use Object.defineProperty to directly get data
  for (let key in data) {
    proxyData(vm, '_data', key)
  }

  // watch data effect...
  observe_effect(data);
}