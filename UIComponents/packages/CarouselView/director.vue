<template>
  <div class="btns">
    <div class="btn" @click="handleClick('left')">&lt;</div>
    <div class="btn" @click="handleClick('right')">&gt;</div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentIndex: {
    type: Number,
    default: 0,
  },
  imgNum: {
    type: Number,
    default: 0,
  },
});

const emits = defineEmits(["changeCurrentIndex"]);

const handleClick = (direction) => {
  let tempIndex = props.currentIndex;
  switch (direction) {
    case "left":
      if (tempIndex - 1 === -1) {
        emits("changeCurrentIndex", props.imgNum - 1);
      } else {
        emits("changeCurrentIndex", tempIndex - 1);
      }

      break;
    case "right":
      if (tempIndex + 1 === props.imgNum) {
        emits("changeCurrentIndex", 0);
      } else {
        emits("changeCurrentIndex", tempIndex + 1);
      }
      break;
    default:
      break;
  }
};
</script>

<style scoped>
.btns {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.btn {
  background-color: #aaa;
  width: 3rem;
  height: 3rem;
  border: 1px solid black;
  border-radius: 0.5rem;
  color: #333;
  text-align: center;
  line-height: 3rem;
  font-size: 1.25rem;
  cursor: pointer;
}
</style>