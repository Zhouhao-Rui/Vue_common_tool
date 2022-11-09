import { inject, reactive } from "vue"
import { mapMutationstoStore, mapActionsToStore, mapGettersToStore } from './mapper'

class Store {
  constructor(options) {
    const {
      state,
      actions,
      mutations,
      getters
    } = options

    const store = this;

    store._state = reactive({
      data: state
    })

    // no prototype
    store._mutations = Object.create(null);
    store._actions = Object.create(null);
    // put all mutations to the mutation containers
    mapMutationstoStore(store, mutations)
    // put all actions to the action containers
    mapActionsToStore(store, actions)
    mapGettersToStore(store, getters)
  }

  get state() {
    return this._state.data;
  }

  commit = (type, payload) => {
    this._mutations[type](payload);
  }

  dispatch = (type, payload) => {
    this._actions[type](payload);
  }

  install(app) {
    app.provide('store', this)
    app.config.globalProperties.$store = this;
  }
}

export function createStore(options) {
  return new Store(options)
}

export function useStore() {
  return inject('store');
}