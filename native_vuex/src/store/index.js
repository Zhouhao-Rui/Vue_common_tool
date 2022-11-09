import getters from './getters'
import mutations from './mutation'
import state from './state'
import actions from './action'
import { createStore } from '@/vuex'

export default createStore({
  getters,
  mutations,
  state,
  actions
})
/**
 * createStore({getters, mutations, state, actions} => {
 *  install(app) {
 *  ....}
 * })
 */