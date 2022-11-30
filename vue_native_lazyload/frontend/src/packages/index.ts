import { lazyLoadFactory } from "./directive";
export default {
  install(app, options) {
    app.directive("lazyLoad", lazyLoadFactory(options));
  },
};
