import { IElement, IProps } from "../types";
import { Element } from "../model/element";
export function createElement(
  el: string,
  props: IProps,
  children: IElement[] | string[]
): IElement {
  return new Element(el, props, children);
}
