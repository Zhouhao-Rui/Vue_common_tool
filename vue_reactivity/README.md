# Vue Reactive system and AST template rendering

## Vue Reactive System

- **What is reactive System**
  As we knows, Vue options Api is an ES5 function with a lot of options (el, data, methods ...). The most existing part for Vue is for the data binding and rendering, which realizes the instantly template rendering.
  Reactive System is to listen on the change of the data in the options, and do some side effect during changing, i.e., reRendering.
- **Why we needs reactive System**
  because we needs to bi-bind the data in the Vue and template and do the re-rendering.
- **How can we realize the reactive system**
  The data in the options have a lot of different types, if the data is basic data type, i.e., string, number etc, we can directly use the Object.defineProperty or Proxy to listen on the data getter and setters.
  If the data is in the Array type or Object Type:
  - Object: We need to recursively do the Observer function until we get the basic type,
  - Array: Only seven functions need to be listen on, the **Object.create(Array.prototype)** function can be used to get all the array methods, and rewrite the seven methods. To be noticed, the new items can also be in array or object types, i.e., arr.push([1, 2, 3]), we need to use Observer to observe the new item recursively.

## AST template

- **What is AST template**
  We need to bind the data with mustache syntax in the template, but how we can do that? VDOM is only creates the real DOM structure in the JSON format (tagName, props and children). However, the vue template syntax like mustache and slot cannot be interpreted by the VDOM. We need a higher-level data structure to interpret the template, which is AST (Abstract Syntax Tree)
- **How AST works?**
  Use the Regex expression to interpret the template, and inserts new pieces into the JSON block dynamically.
- **The Whole working process for VUE:**

  1. Build the Reactive System (Reactive)
  2. GET the template (AST)
  3. Interpret the template syntax with AST (AST)
  4. With the AST, build the render function (AST)
  5. Use the render functions to generate VDOM (VDOM)
  6. Use VDOM to do the patching. (DIFF)

- **How to generate AST**
  The core idea is to interpret the tagName and attrbutes progressively, and remove them at the same time.

  1. **Define the Regex expression and variables**

  - attribute: to get the attribute
  - startTagOpen: to match the open start tag (like div's <)
  - startTagClose: to match the close start tag (like div's >)
  - endTag: to match the end tag (like /div)
  - root: root for the AST
  - currentParent and stack[]: Every time after matching start tag, define element as currentParent and push to the stack, and when matching end tag, pop the currentParent out. Because when detecting the template, the children's endTags will always ealier to be detected.

  2. **The whole process**

  - While template (<parent class="123">123 <child></child></parent>)

    - (1)find the < symbol, and match the startTagOpen and get the start tagName (class="123">123 <child></child></parent>)

    - To get the start Tag's attributes with attribute regex. (>123 <child></child></parent>)

    - to get the start Tag's end with StartTagClose regex. (123 <child></child></parent>)

    - CreateASTElement ( {
      tag: tagName,
      type: 1,
      children: [],
      attrs,
      parent
      }

      )

    - set this AST element as the currentParent and push into the stack (stack[ASTElement(div) ], root: ASTElement(div))

    - continue

    - (2)detect the text or child, here is text

    - directly push the text to the currentParent with the StartTagOpen expression. (<child></child></parent>)

    - (3)detect the end Tag (</child></parent>)

    - because the child element will earlier detected, pop the stack, stack[ASTElement(div), ASTElement(child) ] -> stack[ASTElement(div)]. The current parent set to the stack[length - 1], and the children is the poped element, the poped element's parent is currentParent. (Define the parent-child relationship) (</parent>)

    - Return AST

- **How to render the AST to code**
  The core Idea is to compile AST to the plain string with \_c (createElement), \_v (createTextNode) and \_s (createMustache)
  The format for the rendered template is:
  \_c(div, {id: "app",style: {"color":" red"," font-size":" 20px"}}, \_v("Hello, "+\_s(name)),
  \_c(span, {class: "text",style: {"color":" green"}}, \_v(\_s(age)))
  )

  - for the attributes: distinguish the attrbutes by the key, and if it is style, needs to be a Stringfied object, if not style, just string and append
  - for the children: if just the element, recusion, if it is textNode, need to find the mustchae with the regex expression and append.
  - How to change the code to the render function to let vue can visit render option? (i.e., name should be found): use the with block, and the variables can be accessed directly.

- **How to generate the Vnodes by AST**
  The AST has been changed to the template with \_c, \_v and \_s functions, and we just need to define three functions in the VUE prototype, and execute the functions during rendering.
  \_c: createElement(tag, props, children)
  \_v: createTextNode(text)
  \_s: change the variable to the plain text (object -> stringfy, basic type -> "")
