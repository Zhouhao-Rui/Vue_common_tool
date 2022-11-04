# Desgin pattern -- observer

## requirements

design a todolist, with three different features, add an item to the todo list, remove an item from the todo list and toggle the status of the todo list.

## Focus points splitting

split the focus points into three area:

1. DOM operation
2. Event operation
3. Observer class to connect DOM and event

**How to connect the DOM and event**, actually it's simple, we need a Observer class which can listen on the DOM change, and notify the different HTML elements to run the Event binding and DOM repainting.

## Structure

Four different file:

1. app.ts: init the DOM mounting, and listen on the dom changes
2. index.ts: Define the Observer, define the notifying and collecting functions
3. todoDOM: Define the add, remove and toggle DOM changing, which template String and innerHTML.
4. todoEvent: Define the add, remove and toggle event changing, which have the todo items array, and change the array. **USE PROMISE** to deliver items to the DOM for binding items to the DOM elements.
