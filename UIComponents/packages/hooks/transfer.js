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
    rightListData.value = [...rightListData.value, ...newData.value];
  }

  function removeRightListData(newData) {
    newData.value.forEach(newItem => {
      rightListData.value = rightListData.value.filter(item => {
        return item.id != newItem.id
      })
    })
  }

  function clearRightListData() {
    rightListData.value = [];
  }

  return [
    rightListData,
    addRightListData,
    removeRightListData,
    clearRightListData
  ]
}

export function useActiveLeftItems(initialData) {
  const activeLeftItems = ref(initialData);

  function addActiveLeftItems(newItem) {
    if (!activeLeftItems.value.includes(newItem)) {
      activeLeftItems.value.push(newItem);
    }
  }

  function removeActiveLeftItems(item) {
    if (activeLeftItems.value.includes(item)) {
      activeLeftItems.value.splice(activeLeftItems.value.indexOf(item), 1);
    }
  }

  function clearActiveLeftItems() {
    activeLeftItems.value = [];
  }
  return [
    activeLeftItems,
    addActiveLeftItems,
    removeActiveLeftItems,
    clearActiveLeftItems
  ]
}

export function useActiveRightItems(initialData) {
  const activeRightItems = ref(initialData);

  function addActiveRightItems(newItem) {
    if (!activeRightItems.value.includes(newItem)) {
      activeRightItems.value.push(newItem);
    }
  }

  function removeActiveRightItems(item) {
    if (activeRightItems.value.includes(item)) {
      activeRightItems.value.splice(activeRightItems.value.indexOf(item), 1);
      console.log(activeRightItems.value)
    }
  }

  function clearActiveRightItems() {
    activeRightItems.value = []
  }

  return [
    activeRightItems,
    addActiveRightItems,
    removeActiveRightItems,
    clearActiveRightItems
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