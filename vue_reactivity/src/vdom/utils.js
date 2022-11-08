export function createTextVnode(text) {
  return VNode(undefined, undefined, undefined, text)
}

export function createElement(tag, attrs, children) {
  return VNode(tag, attrs, children)
}

export function patch(oldNode, newNode) {
  let el = createRElement(newNode);
  let parentElement = oldNode.parentNode;
  parentElement.insertBefore(el, oldNode.nextSibling)
  parentElement.removeChild(oldNode);
}

export function createRElement(vnode) {
  const { tag, attrs, children, text } = vnode;
  if (typeof tag === 'string') {
    vnode.el = document.createElement(tag);
    renderProps(vnode)
    if (children) {
      console.log(children)
      children.map((child) => {
        vnode.el.appendChild(createRElement(child))
      })
    }
  } else {
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}

function renderProps(vnode) {
  const el = vnode.el;
  const newProps = vnode.props || {};

  for (let key in newProps) {
    if (key === 'style') {
      for (let sKey in newProps.style) {
        el.style[sKey] = newProps.style[sKey];
      }
    } else if (key === 'class') {
      el.className = el.class;
    } else {
      el.setAttribute(key, newProps[key]);
    }
  }
}

function VNode(tag, props, children, text) {
  return {
    tag,
    props,
    children,
    text
  }
}