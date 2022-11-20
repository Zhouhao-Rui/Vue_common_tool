<template>
  <div class="modal-mask" v-show="modalShow"></div>
  <div class="modal-wrapper" v-show="modalShow">
    <header
      class="modal-header"
      :style="{
        color: props.fontcolor,
        backgroundColor: props.primarycolor,
      }"
    >
      <h1>{{ props.title }}</h1>
      <a
        href="javascript:;"
        :style="{
          color: props.fontcolor,
        }"
        @click="handleCancelClick"
        >&times;</a
      >
    </header>
    <article class="content">
      <p
        :style="{
          color: props.contentTextColor,
        }"
      >
        {{ props.contentText }}
      </p>
    </article>
    <div class="btn-groups" v-if="btnGroupShow">
      <button class="btn btn-confirm" @click="handleConfirmClick">
        {{ props.confirmText }}
      </button>
      <button class="btn btn-cancel" @click="handleCancelClick">
        {{ props.cancelText }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 360,
  },
  borderRadius: {
    type: Number,
    default: 10,
  },
  primarycolor: {
    type: String,
    default: "#007bff",
  },
  title: {
    type: String,
    default: "Hello Wolrd",
  },
  fontcolor: {
    type: String,
    default: "#333",
  },
  contentText: {
    type: String,
    default: "Hello wolrd....",
  },
  contentTextColor: {
    type: String,
    default: "#fff",
  },
  position: {
    type: String,
    default: "top",
  },
  btnGroupShow: {
    type: Boolean,
    default: true,
  },
  confirmText: {
    type: String,
    default: "confirm",
  },
  cancelText: {
    type: String,
    default: "cancel",
  },
});

let width = ref(props.width + "px");
let borderRadius = ref(props.borderRadius + "px");
let top = ref("50px");
let translateY = ref("0px");
let btnColor = ref(props.primarycolor);
props.position === "center" ? (top.value = "50%") : _;
props.position === "center" ? (translateY.value = "-50%") : _;

let modalShow = ref(props.show);

const emits = defineEmits(["confirm", "cancel"]);

const handleConfirmClick = () => {
  modalShow.value = false;
  emits("confirm");
};

const handleCancelClick = () => {
  modalShow.value = false;
  emits("cancel");
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  /* z-index: 1; */
}

.modal-wrapper {
  position: fixed;
  width: v-bind(width);
  left: 50%;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 1px 2px 3px #333;
  border-radius: v-bind(borderRadius);
  position: absolute;
  transform: translateX(-50%) translateY(v-bind(translateY));
  top: v-bind(top);
  /* z-index: 999; */
}

.modal-wrapper a {
  text-decoration: none;
  outline: none;
  color: #333;
}

h1,
p {
  font-weight: normal;
  margin: 0;
}

.button-groups {
  width: 100%;
}

.btn {
  outline: none;
  border: 0;
  border-radius: 10%;
  min-width: 2rem;
  min-height: 2rem;
  font-size: 14px;
  margin: 0.5rem;
  padding: 0.3rem;
  float: right;
  cursor: pointer;
}

.btn-confirm {
  background-color: v-bind(btnColor);
}

header {
  height: 44px;
  padding: 0 15px;
  box-sizing: border-box;
}

header h1 {
  display: inline-block;
  font-size: 18px;
  line-height: 44px;
}

header a {
  float: right;
  font-size: 20px;
  margin-top: 5px;
}

.content {
  padding: 15px;
  box-sizing: border-box;
}
</style>