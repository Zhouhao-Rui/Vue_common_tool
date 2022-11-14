<template>
  <!-- components: { Carousel },- <transfer :data="mock_data_transfer" right-title="chosen" /> -->
  <div class="container">
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
  </div>
</template>

<script setup>
// import { mock_data_transfer } from "./mock";
import { carousel_imgs, get_image_url } from "./mock";
</script>

<style scoped>
.container {
  width: 48rem;
  height: 36rem;
  margin: 2rem auto;
}
</style>