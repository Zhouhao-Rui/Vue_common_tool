<template>
  <div class="selector-menu">
    <div class="menu-item" v-for="(item, index) in searchData" :key="item.id" :value="item.value" @click="setItemValue(item)">
      {{item.text}}
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';

  const props = defineProps({
    items: {
      type: Array,
      default: () => []
    },
    searchValue: {
      type: String,
      default: ''
    }
  })

  const searchData = ref([]);

  onMounted(() => {
    searchData.value = props.items;
  })

  const emits = defineEmits(['setPlaceholder'])

  const setItemValue = (item) => {
    emits('setPlaceholder', item)
  }

  // watch the changing of searchValue
  watch(() => {
    return props.searchValue
  }, () => {
    searchData.value = props.items.filter(item => {
      return item.text.toLowerCase().includes(props.searchValue.toLowerCase())
    })
  })
</script>

<style scoped>
.selector-menu {
  display: none;
  position: absolute;
  top: 48px;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0 10px #ddd;
  border-radius: 5px;
  cursor: pointer;
}
.menu-item {
  height: 35px;
  text-align: center;
  line-height: 35px;
  font-size: 14px;
  color: #333;
}

.menu-item:hover {
  background-color: #ddd;
}
</style>