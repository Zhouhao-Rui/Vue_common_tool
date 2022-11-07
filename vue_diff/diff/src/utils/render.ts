import { IElement, IProps } from "../types";

export function render(rootEl: HTMLElement, vDom: IElement) {
  // create el
  renderElements(rootEl, vDom);
}

export function renderElements(
  anchor: HTMLElement,
  ele: IElement | string
): void {
  if (typeof ele == "string") {
    const textNode = document.createTextNode(ele);
    anchor.appendChild(textNode);
  } else {
    const el = document.createElement(ele.el);
    // Version I
    // renderProps(el, ele.props);
    // Version II
    for (let key in ele.props) {
      renderProp(el, key, ele.props[key]);
    }
    anchor.appendChild(el);
    // repeat the same logic
    // exit condition
    if (!ele.children || ele.children.length == 0) {
      return;
    } else {
      // mount again
      for (let i = 0; i < ele.children.length; i++) {
        renderElements(el, ele.children[i]);
      }
    }
  }
}

/**
 * Version I : write the props as the key-value pairs, and render the props directly with object
 * together with recursion
 */
// function renderProps(el: HTMLElement, props: IProps) {
//   Object.keys(props).forEach((val, key) => {
//     if (typeof props[val] != "object") {
//       el[val] = props[val];
//     } else {
//       renderProps(el[val], props[val]);
//     }
//   });
// }

/**
 * Version II, directly use the Element.setAttribute() method
 */
export function renderProp(el: HTMLElement, prop: any, val: string) {
  switch (val) {
    case "value":
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        (el as HTMLInputElement | HTMLTextAreaElement).value = val;
      } else {
        el.setAttribute(prop, val);
      }
      break;
    case "style":
      el.style.cssText = val;
      break;
    default:
      el.setAttribute(prop, val);
      break;
  }
}
