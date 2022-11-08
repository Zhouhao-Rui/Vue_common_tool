import { arrMethods, observeArr } from './array';
import { defineReactivity } from './reactive'

function Observer(data) {
  // {} defineProperty
  // [] proxy
  if (!Array.isArray(data)) {
    // {}
    this.dataWalk(data);
  } else {
    // mount all the array methods
    data.__proto__ = arrMethods;
    // recursive
    observeArr(data);
  }
}

Observer.prototype.dataWalk = function (data) {
  // define Property
  Object.keys(data).forEach((key, index) => {
    let value = data[key]
    defineReactivity(data, key, value)
  })
}

export function observe_effect(data) {
  // if not object, no proxy
  if (typeof data !== 'object' || data === null) {
    return;
  }
  return new Observer(data);
}