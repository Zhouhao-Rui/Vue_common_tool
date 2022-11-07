import { IPatch, IPatches } from "../types";
import { PATCH_TYPE } from "../types/PatchType";
import { renderElements, renderProp } from "./render";
import { Element } from "../model/element";

let finalPatches = {};
let rdomIndex = 0;
export function patch(rDom: Node, patches: IPatches) {
  finalPatches = patches;

  rDomWalk(rDom);
}

function rDomWalk(rDom: Node) {
  let cur_patch = finalPatches[rdomIndex++];
  let childNodes = rDom.childNodes;

  Array.from(childNodes).map((cNode, index) => {
    // rDomWalk again
    rDomWalk(cNode);
  });

  if (cur_patch) {
    // do patch
    doPatch(rDom, cur_patch);
  }
}

function doPatch(rNode: Node, rPatch: IPatch[]) {
  rPatch.map((p) => {
    switch (p.type) {
      case PATCH_TYPE.ATTR:
        for (let key in p.attr) {
          const value = p.attr[key];
          if (value) {
            renderProp(rNode as HTMLElement, key, value);
          } else {
            (rNode as HTMLElement).removeAttribute(key);
          }
        }
        break;
      case PATCH_TYPE.TEXT:
        rNode.textContent = p.text;
        break;
      case PATCH_TYPE.REPLACE:
        if (p.newNode instanceof Element) {
          console.log(rNode);
          renderElements(rNode.parentNode as HTMLElement, p.newNode);
        } else {
          (rNode.parentNode as HTMLElement).appendChild(
            document.createTextNode(p.newNode)
          );
        }
        break;
      case PATCH_TYPE.REMOVE:
        rNode.parentNode?.removeChild(rNode);
        break;

      default:
        break;
    }
  });
}
