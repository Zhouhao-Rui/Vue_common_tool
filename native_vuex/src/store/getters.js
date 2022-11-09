export default {
  finishedTodos(state) {
    return state.todos.filter(todo => {
      return todo.isFinished
    })
  },
  unfinishedTodos(state) {
    return state.todos.filter(todo => {
      return !todo.isFinished;
    })
  },
  filteredTodos(state, getters) {
    switch (state.filter) {
      case 'finished':
        return getters.finishedTodos
      case 'unfinished':
        return getters.unfinishedTodos
      case 'all':
        return state.todos;
      default:
        return state.todos;
    }
  }
}