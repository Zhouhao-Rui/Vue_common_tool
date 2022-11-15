import { createApp } from 'vue'
import App from './App.vue'
// global import
import zhUI from '../packages'
// import 'bootstrap-icons'

// test for require on demand
// import Transfer from '../packages/TranserBox'

createApp(App).use(zhUI).mount('#app')
