<template>
  <!-- render props data for layer I -->
  <div class="tree-wrapper">
    <tree-items :data="props.data" />
  </div>
</template>

<script setup>
import TreeItems from "./TreeItems";
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
* {
  list-style: none;
}
.tree-wrapper {
  background-color: #eee;
  width: 10rem;
  min-height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
}
</style>