<template>
  <div class="tab-wrapper">
    <input
      type="text"
      placeholder="please input ..."
      v-model="inputRef"
      class="input-text"
    />
    <button @click="addTodo(inputRef)" class="add-btn">add</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "@/vuex";

const inputRef = ref("");

const store = useStore();

const addTodo = (text) => {
  store.dispatch("addTodo", text);
};
</script>

<style scoped>
.tab-wrapper {
  min-width: 15rem;
}
.input-text {
  margin: 0 1rem;
  height: 2rem;
  border: 1px solid black;
  border-radius: 0.25rem;
  padding-left: 2px;
}
.add-btn {
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #bbb;
  border: none;
  color: #444;
}
</style>