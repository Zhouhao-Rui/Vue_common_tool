import SignalFactory from './signal.js';

((doc) => {
  let signalHeaderEl = doc.querySelector('.signal header');
  let btnGroupList = doc.querySelector('.btn-group');
  const signalFactory = new SignalFactory(signalHeaderEl);
  function init() {
    bindEvents()
  }

  function bindEvents() {
    btnGroupList.addEventListener('click', handleBtnClick, false);
  }

  function handleBtnClick(e) {
    const tar = e.target;
    const tagName = tar.tagName;
    if (tagName.toLowerCase() === 'button') {
      const signalInstance = signalFactory.create('Hello world', tar.dataset.status)
      if (Object.getPrototypeOf(signalInstance).hasOwnProperty('outputInfo')) {
        signalInstance.outputInfo('Hello world');
      }
    }
  }
  init();
})(document)