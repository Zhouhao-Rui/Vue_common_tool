export default {
  addTodo({ commit }, text) {
    commit('addTodo', text)
  },
  removeTodo({ commit }, id) {
    commit('removeTodo', id)
  },
  toggleTodo({ commit }, id) {
    commit('toggleTodo', id)
  }
}