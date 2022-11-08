export function compileToRender(template) {
  const ast = parseHTMLToAST(template);
  console.log(ast)
}

/**
 * 
 * @param {*} template 
 * <div id="app" style="color: red; font-size: 20px">
    Hello, {{name}}
    <span class="text" style="color: green;">{{age}}</span>
  </div>
 */
function parseHTMLToAST(template) {
  // how to parse to AST
  // through regex expression to match tagname, props, style etc
  // match one and delete one (<div></div>) it's easy to match
  // Regular Expressions for parsing tags and attributes

  // these regrex are from vue2 html-parser
  const unicodeRegExp =
    /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/
  const attribute =
    /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
  const dynamicArgAttribute =
    /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
  // match the tagName
  const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`
  const qnameCapture = `((?:${ncname}\\:)?${ncname})`
  const startTagOpen = new RegExp(`^<${qnameCapture}`)
  const startTagClose = /^\s*(\/?)>/
  const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
  const doctype = /^<!DOCTYPE [^>]+>/i
  const comment = /^<!\--/
  const conditionalComment = /^<!\[/
  let root;
  let currentParent;
  let stack = [];
  while (template) {
    let textEnd = template.indexOf('<')
    let text;

    // parse start tag
    if (textEnd === 0) {
      // like <div class="hello">13123123</div>
      const startTagMatch = parseStartTag();
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }

      // after startTagMatch => </div> get end
      const endTagMatch = template.match(endTag)

      // remove end, and continue
      if (endTagMatch) {
        advance(endTagMatch[0].length);
        end(endTagMatch[1])
        continue;
      }
    }
    if (textEnd > 0) {
      text = template.substring(0, textEnd);
    }
    if (text) {
      advance(text.length);
      chars(text);
    }
  }

  function parseStartTag() {
    const start = template.match(startTagOpen);
    // is END?
    let end;
    // not end have attrs
    let attrs;
    if (start) {
      const match = {
        tagName: start[1],
        attrs: []
      }
      advance(start[0].length)

      // many attributes
      while (!(end = template.match(startTagClose)) && (attrs = template.match(attribute))) {
        // push attr and value
        match['attrs'].push({
          name: attrs[1],
          value: attrs[3] || attrs[4] || attrs[5]
        })
        advance(attrs[0].length)
      }
      if (end) {
        advance(end[0].length)
        return match
      }
    }
  }

  function advance(n) {
    template = template.substring(n);
  }

  function createASTElement(tagName, attrs) {
    return {
      tag: tagName,
      type: 1,
      children: [],
      attrs,
      parent
    }
  }

  // stack [div, span]
  function start(tagName, attrs) {
    console.log('--------------start')
    const element = createASTElement(tagName, attrs)
    if (!root) {
      root = element;
    }
    // set currentParent
    currentParent = element;
    // push to the stack
    stack.push(element);
  }

  // stack [div]
  function end(tagName) {
    // it must be the child node first be removed, then the parent node
    console.log('--------------end')
    // delete span
    const element = stack.pop();
    // get div
    currentParent = stack[stack.length - 1];
    if (currentParent) {
      // set parent and children
      element.parent = currentParent;
      currentParent.children.push(element);
    }
  }

  function chars(text) {
    console.log('--------------chars')
    text = text.trim();
    if (text.length) {
      currentParent.children.push({
        type: 3,
        text
      })
    }
  }
  return root;
}