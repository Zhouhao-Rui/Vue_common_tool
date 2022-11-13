import { computed, ref } from 'vue'
export function useTargetIndex(initialIndex) {
  // useState
  const targetIndex = ref(initialIndex);
  function setTargetIndex(newIndex) {
    targetIndex.value = Number(newIndex);
  }

  return [
    targetIndex,
    setTargetIndex
  ]
}

export function useRightListData(initialData) {
  const rightListData = ref(initialData);

  function addRightListData(newData) {
    rightListData.value = rightListData.concat(newData);
  }

  function removeRightListData(newData) {
    newData.forEach(newItem => {
      rightListData.value = rightListData.value.filter(item => {
        return item.id != newItem.id
      })
    })
  }

  return [
    rightListData,
    addRightListData,
    removeRightListData
  ]
}

export function useComputedTitle(data, targetIndex) {
  const listTitle = computed(() => data[targetIndex.value].title)

  return {
    listTitle
  }
}

export function useComputedLeftList(data, targetIndex, rightListData) {
  const leftListData = computed(() => {
    const { data: currentData } = data[targetIndex.value];

    return currentData.filter(item => {
      if (!rightListData.value.find(({ id }) => id === item.id)) {
        return item;
      }
    })
  })

  return {
    leftListData
  }
}