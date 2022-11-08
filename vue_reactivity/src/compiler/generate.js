/**
 * _c: createElement
 * _v: createTextNode
 * _s: {{name}} -> _s(name)
 * 
 * @param {*} el 
 */

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

function formatAttrs(attrs) {
  let str = ''

  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i];
    if (attr.name === 'style') {
      let styleAttrs = {}
      attr.value.split(';').map(styleAttr => {
        let [key, val] = styleAttr.split(":")
        styleAttrs[key] = val;
      })
      attr.value = styleAttrs;
    }
    str += `${attr.name}: ${JSON.stringify(attr.value)},`
  }

  return `{${str.slice(0, -1)}}`
}

function generateChild(child) {
  // _c or _v
  // also need to judge the textnode and mustchae etc
  if (child.type == 1) {
    return generateCode(child)
  } else if (child.type == 3) {
    let text = child.text;
    if (!defaultTagRE.test(text)) {
      return `_v${JSON.stringify(text)}`;
    }
    let match;
    let index;
    let lastIndex = defaultTagRE.lastIndex = 0;
    let textArray = [];
    while (match = defaultTagRE.exec(text)) {
      index = match.index;
      // if no text
      if (index > lastIndex) {
        textArray.push(JSON.stringify(text.slice(lastIndex, index)))
      }
      // push mustchae
      textArray.push(`_s(${match[1].trim()})`)
      lastIndex = index + match[0].length;
    }

    // if still have some text
    if (lastIndex < text.length) {
      textArray.push(JSON.stringify(text.slice(lastIndex)));
    }
    return `_v(${textArray.join('+')})`;
  }
}

function formatChildren(children) {
  if (children) {
    return children.map(c => {
      // _c or _v
      return generateChild(c)
    }).join(',')
  }
}

export function generateCode(el) {
  let children = formatChildren(el.children);
  let code = `_c("${el.tag}", ${el.attrs.length > 0 ? formatAttrs(el.attrs) : 'undefined'}, ${children ? `[${children}]` : ''})`
  return code;
}