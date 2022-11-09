export default {
  addTodo(state, text) {
    state.todos.push({
      id: state.id++,
      text,
      isFinished: false
    });
  },
  removeTodo(state, id) {
    state.todos = state.todos.filter(todo => {
      return todo.id !== id;
    })
  },
  toggleTodo(state, id) {
    state.todos = state.todos.map(todo => {
      if (todo.id === id) {
        todo.isFinished = !todo.isFinished;
      }
      return todo;
    })
    console.log(state.todos)
  },
  setFilter(state, filter) {
    state.filter = filter;
  }
}