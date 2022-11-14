<template>
  <div class="dot-wrapper">
    <div
      :class="[
        'dot-item',
        props.currentIndex === index - 1 ? 'dot-item-active' : '',
      ]"
      v-for="index in props.imgNum"
      @click="handleDotClick($event, index - 1)"
    ></div>
  </div>
</template>

<script setup>
const props = defineProps({
  imgNum: {
    type: Number,
    default: 0,
  },
  currentIndex: {
    type: Number,
    default: 0,
  },
});

const emits = defineEmits(["updateCurrentIndex"]);

const handleDotClick = (e, currentIndex) => {
  emits("updateCurrentIndex", currentIndex);
};
</script>

<style>
.dot-wrapper {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  height: 5rem;
  align-items: center;
  justify-content: space-between;
}
.dot-item {
  border: 3px solid #666;
  border-radius: 50%;
  background-color: #fff;
  width: 2rem;
  height: 2rem;
}
.dot-item-active {
  background-color: #666;
}
.dot-item:hover {
  background-color: #666;
  cursor: pointer;
}
</style>