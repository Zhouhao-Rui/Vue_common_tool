<template>
  <div class="container">
    <div class="box" v-for="item of state.data" :key="item.id">
      <div class="img-box">
        <img v-lazy-load="item.src" :alt="item.title">
      </div>
      <div class="content-box">
        <h1>{{item.title}}</h1>
        <p>Author: Young Rui</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, reactive } from 'vue';
import { Image } from './types'

let state: {
  data: Image[]
} = reactive({
  data: []
})

onMounted(async () => {
  const res = await axios.get('http://localhost:3000/imgs');
  state.data = res.data;
})
</script>

<style>
html,
body,
#app
.container {
  height: 100%;
  margin: 0;
}

.container {
  overflow: scroll;
}

.container .box {
  height: 10rem;
  padding: 0.5rem 0.5rem;
  box-sizing: border-box;
  border-bottom: 1px solid #ededed;
  position: relative;
}

.box .img-box {
  height: 100%;
}
.box .img-box img {
  height: 100%;
}
.box .content-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-left: 15rem;
  box-sizing: border-box;
}
.content-box h1 {
  font-size: 16px;
}
.content-box p {
  font-size: 13px;
  color: #666;
}
</style>