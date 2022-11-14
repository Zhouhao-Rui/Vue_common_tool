<template>
  <div class="carousel">
    <div class="inner">
      <slot></slot>
      <Dot
        v-show="showPointers"
        :imgNum="imgNum"
        :currentIndex="currentIndex"
        @updateCurrentIndex="handleDotCurrentIndex"
      />
      <Director
        v-show="showDirectors"
        :imgNum="imgNum"
        :currentIndex="currentIndex"
        @changeCurrentIndex="handleDirectorCurrentIndex"
      />
    </div>
  </div>
</template>

<script>
import { getCurrentScope, reactive, toRef } from "@vue/reactivity";
import Dot from "./dot";
import Director from "./director";
import {
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  watchEffect,
  watch,
} from "@vue/runtime-core";
export default {
  setup(props) {
    const state = reactive({
      currentIndex: props.initial,
    });

    // timer
    let timer = null;

    const autoPlay = () => {
      if (props.autoplay) {
        timer = setInterval(() => {
          // TODO -- change position
          setIndex("next");
        }, props.duration);
      }
    };

    let carouselInstance = getCurrentInstance();
    let imgNum = carouselInstance.slots.default()[0].children.length;

    onMounted(() => {
      // find the instance and slot
      autoPlay();
    });

    onBeforeUnmount(() => {
      clearInterval(timer);
      timer = null;
    });

    const setIndex = (direction) => {
      switch (direction) {
        case "next":
          if (state.currentIndex === imgNum - 1) {
            state.currentIndex = 0;
            return;
          }
          state.currentIndex += 1;
          break;
        case "prev":
          if (state.currentIndex === -1) {
            state.currentIndex = imgNum - 1;
            return;
          }
          state.currentIndex -= 1;
          break;
      }
    };

    const currentIndex = toRef(state, "currentIndex");

    const handleDotCurrentIndex = (newIndex) => {
      currentIndex.value = newIndex;
    };

    const handleDirectorCurrentIndex = (newIndex) => {
      currentIndex.value = newIndex;
    };
    return {
      currentIndex,
      imgNum,
      handleDotCurrentIndex,
      handleDirectorCurrentIndex,
    };
  },
  props: {
    autoplay: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      default: 3000,
    },
    initial: {
      type: Number,
      default: 0,
    },
    showPointers: {
      type: Boolean,
      default: true,
    },
    showDirectors: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    Dot,
    Director,
  },
  emits: ["updateCurrentIndex", "changeCurrentIndex"],
};
</script>

<style>
.carousel {
  width: 100%;
  height: 100%;
}
.inner {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>