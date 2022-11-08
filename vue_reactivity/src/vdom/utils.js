export function createTextVnode(text) {
  return VNode(undefined, undefined, undefined, text)
}

export function createElement(tag, attrs, children) {
  return VNode(tag, attrs, children)
}

function VNode(tag, props, children, text) {
  return {
    tag,
    props,
    children,
    text
  }
}