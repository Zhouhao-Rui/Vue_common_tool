export function proxyData(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      // vm.title -> vm._data.title
      return vm[target][key]
    },
    set(newVal) {
      // vm.title = '123' -> vm._data.title = '123'
      vm[target][key] = newVal;
    }
  })
}