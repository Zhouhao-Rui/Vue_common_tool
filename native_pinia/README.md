# Build a simple Pinia

## What is pinia:

pinia is a Vue3 state management tool, which has some improvement compared with VueX and support typescript. The main difference between Pinia and Vuex is that pinia automatically support **module**, which means no extra module splitting operation during store creating.

## How to realize a simple pinia:

The core concept is to make connection between the sub modules and central store. Vue 3 composition API provides two new hook: **provide** and **inject**, which allows the hooks and states to be shared among different Vue components. Make the central store as a **Object**, and store the sub module in the object is a good practice. With the **provide** and **inject** function, it's convenient for the sub modules to access the central store.

The other tasks are to realize the characteristics of sub modules, i.e., state, actions, getters, which is similar to the Vuex.

## structure

- createPinia: create the central store.
- defineStore: create the sub module.
- api: create some hooks, i.e., $patch

Only realize the $patch hook together with state, actions and getters. No error handling considered.

Ref to: https://www.bilibili.com/video/BV12d4y1R78r/
