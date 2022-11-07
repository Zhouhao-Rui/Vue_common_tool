import { createElement } from "./utils/createElement";
import { render } from "./utils/render";
import { IPatches } from "./types";
import diff from "./utils/diff";
import { patch } from "./utils/patching";

// for the version I
// const vDom = createElement(
//   "ul",
//   {
//     className: "list",
//     style: "width: 300px; height: 300px; background-color: #999",
//     dataset: {
//       index: 0,
//     },
//   },
//   [
//     createElement(
//       "li",
//       {
//         className: "item",
//         dataset: {
//           index: 1,
//         },
//       },
//       [createElement("p", { className: "text" }, ["First Item"])]
//     ),
//     createElement(
//       "li",
//       {
//         className: "item",
//         dataset: {
//           index: 2,
//         },
//       },
//       [
//         createElement("p", { className: "text" }, [
//           createElement("span", { class: "title" }, ["Second Item"]),
//         ]),
//       ]
//     ),
//     createElement(
//       "li",
//       {
//         className: "item",
//         dataset: {
//           index: 3,
//         },
//       },
//       ["Third Item"]
//     ),
//   ]
// );

// version II
const vDom = createElement(
  "ul",
  {
    class: "list",
    style: "width: 300px; height: 300px; background-color: #999",
  },
  [
    createElement(
      "li",
      {
        class: "item",
        "data-index": 0,
      },
      [createElement("p", { class: "text" }, ["First Item"])]
    ),
    createElement(
      "li",
      {
        class: "item",
        "data-index": 1,
      },
      [
        createElement("p", { class: "text" }, [
          createElement("span", { class: "title" }, ["Second Item"]),
        ]),
      ]
    ),
    createElement(
      "li",
      {
        class: "item",
        "data-index": 2,
      },
      ["Third Item"]
    ),
  ]
);

const newVDom = createElement(
  "ul",
  {
    class: "list-wrapper",
    style: "width: 300px; height: 300px; background-color: #999",
  },
  [
    createElement(
      "li",
      {
        class: "item",
        "data-index": 0,
      },
      [createElement("p", { class: "title" }, ["Special Item"])]
    ),
    createElement(
      "li",
      {
        class: "item",
        "data-index": 1,
      },
      [createElement("p", { class: "text" }, [])]
    ),
    createElement(
      "div",
      {
        class: "item",
        "data-index": 2,
      },
      ["Third Item"]
    ),
  ]
);
const rDom = render(document.querySelector("#app")!, vDom);
const pathcBag: IPatches = diff(vDom, newVDom);
patch(document.querySelector("#app")!, pathcBag);
