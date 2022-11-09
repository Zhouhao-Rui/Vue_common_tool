import { computed } from "vue";
import { forEachValuekey } from "./util";

/**
 * 
 * @param {*} store 
 * @param {*} mutations 
 * 
 * when call the _mutations with mutation name, it will return the mutation function with store instance and parameters(state, payload)
 */
export function mapMutationstoStore(store, mutations) {
  for (let key in mutations) {
    store._mutations[key] = (payload) => {
      mutations[key].apply(store, [store.state, payload])
    }
  }
}

/**
 * 
 * @param {*} store 
 * @param {*} actions 
 * 
 * when call the _actions with action name, it will return the action function with store instance and parameters(state, payload)
 */
export function mapActionsToStore(store, actions) {
  forEachValuekey(actions, (actionsFn, actionsKey) => {
    store._actions[actionsKey] = (payload) => {
      actionsFn.apply(store, [store, payload])
    }
  })
}

export function mapGettersToStore(store, getters) {
  store.getters = {}

  forEachValuekey(getters, (getterFn, getterKey) => {
    Object.defineProperty(store.getters, getterKey, {
      get: () => computed(() => {
        return getterFn(store.state, store.getters)
      }).value
    })
  })
}