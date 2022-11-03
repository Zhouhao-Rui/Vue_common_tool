import { defineStore } from '../pinia'

const useCounterStore = defineStore('counter', {
  state() {
    return {
      counter: 0
    }
  },
  getters: {
    strCounter(state) {
      return "num is: " + state.counter
    }
  },
  actions: {
    increment(gap) {
      this.counter += gap;
    }
  }
})

export default useCounterStore