export default class LazyImage {
  el: HTMLElement;
  src: string;
  options: any;
  imgRender: (LazyImage, string) => void;
  loaded: boolean;
  state: {
    loading: boolean;
    error: boolean;
  };
  constructor({ el, src, options, imgRender }) {
    this.el = el;
    this.src = src;
    this.options = options;
    this.imgRender = imgRender;
    this.loaded = false;

    this.state = {
      loading: false,
      error: false,
    };
  }

  checkIsVisible() {
    const { top } = this.el.getBoundingClientRect();

    return top < window.innerHeight * (this.options.preload || 1.3);
  }

  loadImage() {
    this.imgRender(this, "loading");

    this.imgLoad(this.src).then(
      (res) => {
        this.state.loading = true;
        this.imgRender(this, "ok");
        this.loaded = true;
      },
      (err) => {
        this.state.error = true;
        this.imgRender(this, "error");
        this.loaded = true;
      }
    );
  }

  imgLoad(src) {
    return new Promise((resolve, reject) => {
      const oImg = new Image();
      oImg.src = src;
      oImg.onload = resolve;
      oImg.onerror = reject;
    });
  }
}
