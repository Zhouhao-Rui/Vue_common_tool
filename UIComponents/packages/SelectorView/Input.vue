<template>
  <div class="selector-input">
    <label class="placeholder">{{props.placeholder}}</label>
    <input type="text" class="input" :value="props.value" @input="searchOptions($event)">
    <i class="bi bi-chevron-down icon-search"></i>
  </div>
</template>

<script setup>
  const props = defineProps({
    placeholder: {
      type: String,
      default: 'Plz Select...'
    },
    value: {
      type: String,
      default: ''
    }
  })

  const emits = defineEmits(['searchOptions'])
  const searchOptions = (e) => {
    emits('searchOptions', e.target.value)
  }
</script>

<style scoped>
.selector-input {
  position: relative;
  width: 100%;
  height: 38px;
}
.input {
  width: 100%;
  height: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #999;
  border-radius: 5px;
  outline: none;
  transition: all .2s linear;
}

.input:focus {
  border-color: #189;
  box-shadow: 0 0 3px #1890ff;
}

.placeholder {
  position: absolute;
  left: 15px;
  top: 8px;
  color: #999;
}

.icon-search {
  position: absolute;
  color: #999;
  font-size: 16px;
  /* top: 8px; */
  line-height: 38px;
  right: 5px;
}
</style>