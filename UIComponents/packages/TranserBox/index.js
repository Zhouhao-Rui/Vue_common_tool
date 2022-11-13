import Transfer from './Tranfer'

// on demand
export default {
  install(app) {
    app.component('transfer', Transfer);
  }
}