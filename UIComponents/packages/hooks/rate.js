import { ref } from 'vue'
export function useRating(initialRate) {
  const rate = ref(initialRate);

  function setRate(newRate) {
    rate.value = newRate;
  }

  function getRate() {
    return rate.value;
  }

  return [
    rate,
    setRate,
    getRate
  ]
}