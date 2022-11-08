import { ARR_METHODS } from './config'
import { observe_effect } from './observe';

var originArrayMethod = Array.prototype,
  /** Array prototype copy */arrMethods = Object.create(originArrayMethod);

ARR_METHODS.forEach((method) => {
  arrMethods[method] = function () {
    // run the method with format like arr['push'](1213)
    // arguments from array-like format to array format
    var args = Array.from(arguments);
    var res = originArrayMethod[method].apply(this, args);

    // proxy the new item
    // if the new item is array or object, need to observe again
    var newArr;

    switch (m) {
      case 'push':
      case 'unshift':
        newArr = args; // [{a: 1}]
        break;
      case 'splice':
        newArr = args.slice(2);
        break;
      default:
        break;
    }

    newArr && observeArr(newArr)
    return res;
  }
})

export function observeArr(array) {
  for (let i = 0; i < array.length; i++) {
    observe_effect(array[i]);
  }
}

export {
  arrMethods,
}