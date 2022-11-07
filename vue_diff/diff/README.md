# Use TS to realize VDOM + DIFF

## 1. Define structure of VDOM

vdom here is in the structure of {tagName: string, props: Object, children: IElement}

- tagName: tag name for the real-dom element
- props: the html attributes for the real-dom, i.e., class, style, value...
- children: another v-dom structure or plain text (textNode)

## 2. Render a VDOM

- render props:

  - version I: define the props as key-value pairs, and recursive to mount all the attributes
  - version II: use the element.setAttribute() methods, detail see:

    [set Attribute](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/setAttribute)

- render elements:
  - just to use the recursive functions to render the children to the parent element.

## 3. Patch Bag

- patch bag: Object
  - index: array
    traverse the whole vdom tree, and find the different props and text, define different patch types (enum).
