(function () {
  function init() {
    /**
     * v-if v-else
     */
    const oApp = document.querySelector('#app');
    const nodes = oApp.children;
    const conditionBlocks = [];
    let i = 0;
    let count = 2;
    while (i < nodes.length) {
      // if current node contains the v-if
      if (nodes[i].hasAttribute('v-if')) {
        let key = nodes[i].getAttribute('v-if');
        let val = nodes[i]
        let map = new Map();
        map.set(key, val)
        let node = nodes[i]
        while (true) {
          node = node.nextElementSibling;
          let key = node.getAttribute('v-else-if') || node.getAttribute('v-else');
          let val = node
          map.set(key, val)
          if (node.hasAttribute('v-else')) {
            conditionBlocks.push(map)
            break;
          }
        }
      }
      i++;
    }
    // has collected the dependecies
    conditionBlocks.forEach((block, index) => {
      block.forEach((ele, condition) => {
        if (!eval(condition)) {
          ele.remove();
        }
      })
    })

    /**
     * v-show
     */
    let isShow = true;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].hasAttribute('v-show')) {
        if (!eval(nodes[i].getAttribute('v-show'))) {
          nodes[i].style.display = 'none';
        }
      }
    }
  }

  init();
})()