<template>
  <div class="selector" v-focus="state">
    <Input :placeholder="props.placeholder" :value="state.inputValue" @searchOptions="handleSearch" />
    <Menu :items="props.items" @setPlaceholder="handleMenuSelect" :searchValue="state.searchValue" />
  </div>
</template>

<script setup>
import Input from "./Input.vue";
import Menu from "./Menu.vue";
import {selectFocus as vFocus} from '../directives'
import { reactive } from "vue";
const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  items: {
    type: Array,
    default: () => []
  }
})

const state = reactive({
  inputValue: '',
  searchValue: '',
})

const emits = defineEmits(['getItemValue'])

const handleMenuSelect = (item) => {
  state.inputValue = item.text;
  emits('getItemValue', item.value)
}

const handleSearch = (val) => {
  state.searchValue = val;
}
</script>

<style scoped>
.selector {
  width: 300px;
  position: relative;
}

</style>