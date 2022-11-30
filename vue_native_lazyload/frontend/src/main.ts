import { createApp } from "vue";
import App from "./App.vue";
import VueLazyLoad from "vue-lazyload";
import LazyLoad from "./packages/index";

createApp(App)
  // .use(VueLazyLoad, {
  //   loading: "http://localhost:3000/images/loading.gif",
  //   error: "http://localhost:3000/images/error.jpeg",
  //   preload: 1.3,
  // })
  .use(LazyLoad, {
    loading: "http://localhost:3000/images/loading.gif",
    error: "http://localhost:3000/images/error.jpeg",
    preload: 1.3,
  })
  .mount("#app");
