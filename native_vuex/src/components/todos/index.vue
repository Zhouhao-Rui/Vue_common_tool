<template>
  <div>
    <div
      v-for="item of store.getters.filteredTodos"
      :key="item.id"
      class="todo-item"
    >
      <input
        type="checkbox"
        :checked="item.isFinished"
        @click="toggleTodo(item.id)"
        class="input-checkbox"
      />
      <span :class="{ finished: item.isFinished, todoLabel: 'todoLabel' }">{{
        item.text
      }}</span>
      <button @click="removeTodo(item.id)" class="remove-btn">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "@/vuex";

const store = useStore();

const toggleTodo = (id) => {
  store.dispatch("toggleTodo", id);
};

const removeTodo = (id) => {
  store.dispatch("removeTodo", id);
};
</script>

<style scoped>
.finished {
  text-decoration: line-through;
}
.input-checkbox {
  accent-color: orange;
}

.todo-item {
  margin: 0.5rem 0;
}

.todoLabel {
  font-size: 1rem;
  margin: 0 0.5rem;
}

.remove-btn {
  padding: 2px 0.5rem;
  background-color: #eee;
  font-size: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #444;
  color: #333;
}
</style>