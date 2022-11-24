import Selector from './Selector';

export default {
  install: (app) => {
    app.component('selector', Selector);
  }
}