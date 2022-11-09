# Realize VueX4 with single Module

## VUEX modules

- mutation: commit function
- action: dispatch async function
- getter: computed value
- state: global state

## MAIN function APIs

- creatStore(): return the store class with install function
- useStore(): create a new store instance

## What the store is like

Store instance should have this function:

- \_mutations: an Object with all the mutation functions provided
- \_actions: an Object with all the action functions provided
- getters: computed value changed from getter functions
- \_state: {data: state} to proxy data

When commit(\_mutations[key], payload) -> need to provide store.state
When action(\_actions[key], payload) -> need to provide store
