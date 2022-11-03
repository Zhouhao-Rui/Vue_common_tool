import { computed, inject, reactive, toRef } from "vue"

export default (name, {
  state,
  getters,
  actions
}) => {
  const store = {}

  if (state && typeof state === 'function') {
    const _state = state()
    store.$state = reactive(_state)

    for (let key in _state) {
      store[key] = toRef(store.$state, key)
    }
  }

  if (actions && Object.keys(actions).length > 0) {
    for (let method in actions) {
      store[method] = actions[method]
    }
  }

  if (getters && Object.keys(getters).length > 0) {
    for (let getter in getters) {
      store[getter] = computed(getters[getter].bind(store.$state, store.$state))
      store.$state[getter] = store[getter]
    }
  }

  return () => {
    const setSubStore = inject('setSubStore')
    const piniaStore = setSubStore(name, reactive(store))

    return piniaStore[name];
  }
} 