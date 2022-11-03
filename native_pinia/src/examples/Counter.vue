<template>
  <div class="container">
    <span>{{ counter.counter }}</span>
    <button @click="counter.increment(n)">+{{ n }}</button>
    <button @click="counter.$patch({ counter: counter.counter + 1 })">
      for patching
    </button>
    <span>{{ counter.strCounter }}</span>
  </div>
</template>

<script setup>
import useCounter from "../store/counter";
const counter = useCounter();
let n = 2;
</script>

<style>
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
}
</style>