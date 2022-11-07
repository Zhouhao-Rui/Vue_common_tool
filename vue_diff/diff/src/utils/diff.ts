import { IElement, IPatches, IPatch, IProps } from "../types";
import { PATCH_TYPE } from "../types/PatchType";

let patches = {};
let vnIndex = 0;

function diff(preVDOM: IElement, curVDOM: IElement): IPatches {
  let index = 0;
  vNodeWalk(preVDOM, curVDOM, index);
  return patches;
}

function vNodeWalk(
  preVDOM: IElement | string,
  curVDOM: IElement | string,
  index: number
) {
  let vNodePatch: IPatch[] = [];

  // not exist
  if (!curVDOM) {
    vNodePatch.push({
      type: PATCH_TYPE.REMOVE,
      index,
    });
    patches[index] = vNodePatch;
    return;
  }

  // text node
  if (typeof preVDOM === "string" && typeof curVDOM === "string") {
    if (preVDOM !== curVDOM) {
      vNodePatch.push({
        type: PATCH_TYPE.TEXT,
        text: curVDOM,
      });
    }
    patches[index] = vNodePatch;
    return;
  }

  // element node
  if ((preVDOM as IElement).el === (curVDOM as IElement).el) {
    const attrPatch = attrsWalk(
      (preVDOM as IElement).props,
      (curVDOM as IElement).props
    );
    if (Object.keys(attrPatch).length) {
      vNodePatch.push({
        type: PATCH_TYPE.ATTR,
        attr: attrPatch,
      });
    }

    childrenWalk(
      (preVDOM as IElement).children,
      (curVDOM as IElement).children
    );
  } else {
    vNodePatch.push({
      type: PATCH_TYPE.REPLACE,
      newNode: curVDOM,
    });
  }

  if (vNodePatch.length > 0) {
    patches[index] = vNodePatch;
  }
  console.log(patches);
  return patches;
}

function attrsWalk(preProps: IProps, curProps: IProps) {
  let attrPatch = {};

  // modified
  for (let key in preProps) {
    if (preProps[key] !== curProps[key]) {
      attrPatch[key] = curProps[key];
    }
  }

  // add
  for (let key in curProps) {
    if (!preProps.hasOwnProperty(key)) {
      attrPatch[key] = curProps[key];
    }
  }

  return attrPatch;
}

function childrenWalk(
  preChildren: string[] | IElement[],
  curChildren: string[] | IElement[]
) {
  preChildren.map((child: IElement | string, index: number) => {
    vNodeWalk(child, curChildren[index], ++vnIndex);
  });
}

export default diff;
