<template>
  <div>
    <div>
      <select @change="setTargetIndex($event.target.value)">
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
          key="item.id"
          :class="['list-item', item.disabled ? 'disabled' : '']"
        >
          <input
            type="checkbox"
            :disabled="item.disabled"
            :id="'checkbox' + item.id"
          />
          <label :for="'checkbox' + item.id">{{ item.name }}</label>
        </div>
      </div>
      <div class="box button-group">
        <button>&lt;</button>
        <button>&gt;</button>
      </div>
      <div class="box right-list">
        <h1 class="list-title">{{ rightTitle }}</h1>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import {
  useTargetIndex,
  useComputedTitle,
  useComputedLeftList,
  useRightListData,
} from "../hooks";
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

const [rightListData, addRightListData, removeRightListData] = useRightListData(
  []
);

const { leftListData } = useComputedLeftList(
  props.data,
  targetIndex,
  rightListData
);
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
  opacity: 0.6;
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