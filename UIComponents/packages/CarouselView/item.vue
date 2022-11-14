<template>
  <transition name="carousel">
    <div class="view-item" v-if="selfIndex === currentIndex" :key="selfIndex">
      <slot></slot>
    </div>
  </transition>
</template>

<script setup>
import { getCurrentInstance, reactive, toRefs, watch } from "@vue/runtime-core";

const instance = getCurrentInstance();
const state = reactive({
  selfIndex: instance.vnode.key,
  currentIndex: instance.parent.ctx.currentIndex,
});

watch(
  () => instance.parent.ctx.currentIndex,
  (value) => {
    state.currentIndex = value;
  }
);

const { selfIndex, currentIndex } = toRefs(state);
</script>

<style>
/* cannot add scoped, the wrapper component needs to get img */
.view-item {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
img {
  width: 100%;
  height: 100%;
}

.carousel-enter-active,
.carousel-leave-active {
  transition: all 0.8s ease;
}

.carousel-enter-from {
  transform: translateX(100%);
}

.carousel-enter-to {
  transform: translateX(0);
}

.carousel-leave-from {
  transform: translateX(0);
}

.carousel-leave-to {
  transform: translateX(-100%);
}
</style>