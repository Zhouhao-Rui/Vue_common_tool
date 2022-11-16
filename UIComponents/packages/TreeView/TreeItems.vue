<template>
  <div v-for="(item, index) of props.data" :key="index">
    <div :class="['tree-item', item.children ? 'editable' : '']">
      <div>
        <span class="tree-text" @click="showChild(item.id)">{{
          item.text
        }}</span>
      </div>
      <div v-if="activeID.includes(item.id)">
        <tree-items :data="item.children" />
      </div>
      <div v-else></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useActiveID } from "../hooks/tree";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const [activeID, setActiveID] = useActiveID([]);

const showChild = (id) => {
  setActiveID(id);
};
</script>

<style scoped>
.tree-item {
  color: #333;
  padding: 0.5rem;
}
.tree-item.editable {
  cursor: pointer;
}
</style>