import { ref } from "vue"

export const useActiveID = (initialData) => {
  let activeID = ref(initialData);

  function setActiveID(id) {
    activeID.value = [...activeID.value, id];
  }

  return [
    activeID,
    setActiveID
  ]
}