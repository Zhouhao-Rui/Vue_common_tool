<template>
  <div
    v-magnifier
    class="img-wrap"
    :style="{
      width: props.imgWidth + 'px',
      height: props.imgHeight + 'px',
    }"
  >
    <a
      class="mag-wrap"
      :href="props.link"
      :target="props.blank ? '_blank' : ''"
      :style="{
        width: props.focusWidth + 'px',
        height: props.focusHeight + 'px',
      }"
    >
      <img
        class="mag-img"
        :src="props.imgUrl"
        :alt="props.imgAlt"
        :style="{
          width: props.imgWidth + 'px',
          height: props.imgHeight + 'px',
        }"
      />
    </a>
    <a
      class="img-link"
      :href="props.link"
      :target="props.blank ? '_blank' : ''"
    >
      <img class="static-img" :src="props.imgUrl" :alt="props.imgAlt"
    /></a>
  </div>
</template>

<script setup>
import { magnifier as vMagnifier } from "../directives";
const props = defineProps({
  imgWidth: {
    type: Number,
    default: 0,
  },
  imgHeight: {
    type: Number,
    default: 0,
  },
  imgUrl: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "",
  },
  blank: {
    type: Boolean,
    default: true,
  },
  focusWidth: {
    type: Number,
    default: 0,
  },
  focusHeight: {
    type: Number,
    default: 0,
  },
  imgAlt: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.img-wrap {
  position: relative;
  border: 1px solid #ddd;
  box-shadow: 0 0 5px #999;
}
.static-img {
  width: 100%;
}
.mag-wrap {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: #fff;
  box-shadow: 0 0 3px #000;
  cursor: move;
  overflow: hidden;
}
.mag-wrap.show {
  display: block;
  transform: scale(1.5);
}
.mag-img {
  position: absolute;
  top: 0;
  left: 0;
}
</style>