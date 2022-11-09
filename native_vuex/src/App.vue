<template>
  <div class="wrapper">
    <todo-list />
  </div>
</template>

<script>
import TodoList from "./components/todo-list";
export default {
  components: {
    TodoList,
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.wrapper {
  height: 50vh;
  width: 50vw;
  margin: 0 auto;
  transform: translateY(50%);
}
</style>