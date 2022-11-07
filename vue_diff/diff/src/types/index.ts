import { PATCH_TYPE } from "./PatchType";

export interface IProps {
  class?: string | string[];
  style?: string;
  [propName: string]: any;
}

export interface IElement {
  el: string;
  props: IProps;
  children: IElement[] | string[];
}

export interface IPatch {
  type: PATCH_TYPE;
  [propName: string]: any;
}

export interface IPatches {
  [propName: number]: IPatch[];
}
