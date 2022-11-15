<template>
  <div class="ratings" v-rate="{ setRate, getRate }">
    <div>
      <i
        :class="[
          'bi',
          index > rate ? 'bi-star' : '',
          props.format,
          'star',
          index <= rate ? 'bi-star-fill' : '',
        ]"
        v-for="index in size"
        :key="index"
      ></i>
    </div>
    <button class="submit-btn" @click="submit">click</button>
  </div>
</template>

<script setup>
import { useRating } from "../hooks/rate";
import { rate as vRate } from "../directives";

// get props
const props = defineProps({
  num: {
    type: Number,
    default: 1,
  },
  size: {
    type: Number,
    default: 10,
    max: 20,
  },
  format: {
    type: String,
    default: "md",
  },
});

const [rate, setRate, getRate] = useRating(props.num);

const emits = defineEmits(["getStarNum"]);

const submit = (e) => {
  e.preventDefault();
  emits("getStarNum", rate.value);
};
</script>

<style>
.ratings {
  display: flex;
  height: 20%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.sm {
  font-size: 20px;
}
.md {
  font-size: 30px;
}
.lg {
  font-size: 40px;
}

.bi-star-fill,
.bi-star {
  cursor: pointer;
}

.bi-star-fill {
  color: orange;
}

.submit-btn {
  width: 5rem;
  height: 3rem;
  background-color: #eee;
  color: #666;
  box-shadow: 5px 5px 5px #999;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}
</style>