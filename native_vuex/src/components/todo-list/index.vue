<template>
  <div class="container">
    <todo-tab />
    <todo-form />
    <todo-items />
  </div>
</template>

<script>
import TodoTab from "../todo-tab";
import TodoForm from "../todo-form";
import TodoItems from "../todos";
export default {
  components: {
    TodoTab,
    TodoForm,
    TodoItems,
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>