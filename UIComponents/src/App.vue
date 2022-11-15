<template>
  <!-- components: { Carousel },- <transfer :data="mock_data_transfer" right-title="chosen" /> -->
  <!-- <div class="container">
    <carousel
      :autoplay="true"
      :duration="3000"
      :initial="0"
      :showPointers="true"
      :showDirectors="true"
    >
      <view-item v-for="(imgName, index) of carousel_imgs" :key="index">
        <img :src="`${get_image_url()}${imgName}`" :alt="`__img__${index}`" />
      </view-item>
    </carousel>
  </div> -->
  <!-- <div class="wrapper">
    <magnifier
      :link="link"
      :blank="blank"
      :imgUrl="imgUrl"
      :imgWidth="imgWidth"
      :imgHeight="imgHeight"
      :focusWidth="focusWidth"
      :focusHeight="focusHeight"
      :imgAlt="imgAlt"
    />
  </div> -->
  <div class="wrapper">
    <rate :num="num" :size="5" @getStarNum="getStarNum" format="lg" />
  </div>
</template>

<script setup>
// import { mock_data_transfer } from "./mock";
// import { carousel_imgs, get_image_url } from "./mock";

import { ref } from "@vue/reactivity";

// import { reactive, toRefs } from "vue";
// const state = reactive({
//   imgUrl:
//     "https://upload.wikimedia.org/wikipedia/commons/a/a3/180510_%EC%83%81%EC%95%94_%EB%AF%B8%EC%95%BC%EC%99%80%ED%82%A4_%EC%82%AC%EC%BF%A0%EB%9D%BC_%286%29.jpg",
//   blank: true,
//   link: "https://www.google.com",
//   imgWidth: 379,
//   imgHeight: 500,
//   focusWidth: 100,
//   focusHeight: 150,
//   imgAlt: "Little Sakura",
// });

// const {
//   imgUrl,
//   blank,
//   link,
//   imgWidth,
//   imgHeight,
//   focusHeight,
//   focusWidth,
//   imgAlt,
// } = toRefs(state);

let num = ref(2);
const getStarNum = (newNum) => {
  num = newNum;
  console.log(num);
  // TODO side effect
};
</script>

<style scoped>
/* .container {
  width: 48rem;
  height: 36rem;
  margin: 2rem auto;
} */
/* .wrapper {
  width: 379px;
  margin: 0 auto;
} */

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>