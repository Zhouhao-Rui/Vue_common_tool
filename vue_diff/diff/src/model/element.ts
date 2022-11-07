import { IElement, IProps } from "../types";

export class Element {
  el: string;
  props: IProps;
  children: Element[] | string[];
  constructor(el: string, props: IProps, children: IElement[] | string[]) {
    this.el = el;
    this.props = props;
    this.children = children;
  }
}
