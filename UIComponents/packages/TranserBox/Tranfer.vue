<template>
  <div>
    <div>
      <select @change="handleSelect">
        <option v-for="(title, index) of options" :key="index" :value="index">
          {{ title }}
        </option>
      </select>
    </div>
    <div class="transfer">
      <div class="box left-list">
        <h1 class="list-title">{{ listTitle }}</h1>
        <div
          v-for="item of leftListData"
          :key="item.id"
          :class="['list-item', item.disabled ? 'disabled' : '']"
        >
          <input
            type="checkbox"
            :disabled="item.disabled"
            :id="'checkbox' + item.id"
            @change="handleLeftCheckboxClick($event, item)"
          />
          <label :for="'checkbox' + item.id">{{ item.name }}</label>
        </div>
      </div>
      <div class="box button-group">
        <button disabled ref="leftBtn" @click="handleLeftBtnClick">&lt;</button>
        <button disabled ref="rightBtn" @click="handleRightBtnClick">
          &gt;
        </button>
      </div>
      <div class="box right-list">
        <h1 class="list-title">{{ rightTitle }}</h1>
        <div v-for="item of rightListData" :key="item.id" class="list-item">
          <input
            type="checkbox"
            :disabled="item.disabled"
            :id="'checkbox' + item.id"
            @change="handleRightCheckboxClick($event, item)"
          />
          <label :for="'checkbox' + item.id">{{ item.name }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import {
  useTargetIndex,
  useComputedTitle,
  useComputedLeftList,
  useRightListData,
  useActiveLeftItems,
  useActiveRightItems,
} from "../hooks/transfer";
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  rightTitle: {
    type: String,
    default: "chosen",
  },
});

const options = computed(() => props.data.map((item) => item.title));

const [targetIndex, setTargetIndex] = useTargetIndex(0);

const { listTitle } = useComputedTitle(props.data, targetIndex);

const [
  rightListData,
  addRightListData,
  removeRightListData,
  clearRightListData,
] = useRightListData([]);

const { leftListData } = useComputedLeftList(
  props.data,
  targetIndex,
  rightListData
);

const leftBtn = ref(null);
const rightBtn = ref(null);

const [
  activeLeftItems,
  addActiveLeftItems,
  removeActiveLeftItems,
  clearActiveLeftItems,
] = useActiveLeftItems([]);

// handle left checkbox click
const handleLeftCheckboxClick = (e, item) => {
  let isChecked = e.target.checked;
  // change active items
  isChecked ? addActiveLeftItems(item) : removeActiveLeftItems(item);
  // button color
  activeLeftItems.value.length
    ? (rightBtn.value.disabled = false)
    : (rightBtn.value.disabled = true);
};

// handle right btn click
const handleRightBtnClick = () => {
  addRightListData(activeLeftItems);
  // remove all active items
  clearActiveLeftItems();
  rightBtn.value.disabled = true;
};

const [
  activeRightItems,
  addActiveRightItems,
  removeActiveRightItems,
  clearActiveRightItems,
] = useActiveRightItems([]);

// handle right checkbox change
const handleRightCheckboxClick = (e, item) => {
  let isChecked = e.target.checked;
  // change active items
  isChecked ? addActiveRightItems(item) : removeActiveRightItems(item);
  // button color
  activeRightItems.value.length
    ? (leftBtn.value.disabled = false)
    : (leftBtn.value.disabled = true);
};

// handle left btn click
const handleLeftBtnClick = () => {
  removeRightListData(activeRightItems);
  // remove all active items
  clearActiveLeftItems();
  leftBtn.value.disabled = true;
};

// handle select options
const handleSelect = (e) => {
  setTargetIndex(e.target.value);
  // reset everything
  clearActiveLeftItems();
  clearActiveRightItems();
  clearRightListData();
};
</script>

<style>
.transfer {
  display: flex;
  flex-direction: row;
  width: 25rem;
  border: 1px solid black;
}

.transfer .box {
  width: 33%;
}

.box .list-title {
  height: 2rem;
  text-align: center;
  line-height: 2rem;
  font-weight: normal;
  margin: 0;
  color: #666;
  border-bottom: 1px solid #ddd;
  background-color: #efefef;
  font-size: 0.8rem;
}
.button-group {
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.button-group button {
  border: none;
  outline: none;
  width: 2.5rem;
  height: 2.5rem;
  background-color: bisque;
  color: #333;
  border-radius: 0.5rem;
  cursor: pointer;
}
.button-group button:nth-child(2) {
  margin-left: 0.5rem;
}
.button-group button:disabled {
  opacity: 0.3;
}
.list-item {
  display: flex;
  align-items: center;
  height: 2rem;
  font-size: 0.8rem;
  color: #666;
}

.list-item:disabled {
  opacity: 0.6;
}
</style>