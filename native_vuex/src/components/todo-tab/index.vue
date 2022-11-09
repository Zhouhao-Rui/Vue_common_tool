<template>
  <div>
    <a
      class="tab-item"
      href="javascript:;"
      @click="setFilter('all')"
      :class="{ active: $store.state.filter === 'all' }"
      >All</a
    >
    <a
      class="tab-item"
      href="javascript:;"
      @click="setFilter('finished')"
      :class="{ active: $store.state.filter === 'finished' }"
      >Finished</a
    >
    <a
      class="tab-item"
      href="javascript:;"
      @click="setFilter('unfinished')"
      :class="{ active: $store.state.filter === 'unfinished' }"
      >UnFinished</a
    >
  </div>
</template>

<script>
import { useStore } from "@/vuex";
export default {
  setup() {
    const store = useStore();
    const setFilter = (filter) => {
      store.commit("setFilter", filter);
    };

    return {
      setFilter,
    };
  },
};
</script>

<style scoped>
.tab-item {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #eee;
  text-decoration: none;
  color: #000;
  border-radius: 0.25rem;
}
.active {
  color: red;
}
</style>