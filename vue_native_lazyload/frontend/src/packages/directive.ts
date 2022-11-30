import LazyImage from "./lazyImage";

export function lazyLoadFactory(options): {
  created?: (el, binding, vnode) => void;
  mounted?: (el, binding, vnode) => void;
  beforeMount?: (el, binding, vnode) => void;
  beforeUpdated?: (el, binding, vnode) => void;
  updated?: (el, binding, vnode) => void;
  beforeUnmount?: (el, binding, vnode) => void;
  unMounted?: (el, binding, vnode) => void;
} {
  let isAddedEventListener = false;
  function handleScroll() {
    let isVisible = false;
    imgPool.forEach((lazyImg) => {
      if (!lazyImg.loaded) {
        isVisible = lazyImg.checkIsVisible();
        isVisible && lazyImg.loadImage();
      }
    });
  }
  function imgRender(lazyImg, state) {
    const { el } = lazyImg;
    const { loading, error } = lazyImg.options;
    let src = "";

    switch (state) {
      case "loading":
        src = loading || "";
        break;
      case "error":
        src = error || "";
      default:
        src = lazyImg.src;
        break;
    }
    el.setAttribute("src", src);
  }
  let imgPool: LazyImage[] = [];
  return {
    mounted(el: HTMLElement, binding, vnode) {
      // find the parent container which contains the overflow: sroll or overflow: auto;
      let parentEl: HTMLElement = el;
      while (!(parentEl.id === "app")) {
        parentEl = parentEl.parentElement!;
        if (
          getComputedStyle(parentEl).overflow === "auto" ||
          getComputedStyle(parentEl).overflow === "scroll"
        ) {
          break;
        }
      }
      if (!isAddedEventListener && parentEl) {
        parentEl.addEventListener("scroll", handleScroll.bind(this), false);
      }

      const lazyImage = new LazyImage({
        el,
        src: binding.value,
        options: options,
        imgRender: imgRender.bind(this),
      });
      imgPool.push(lazyImage);
      console.log(imgPool);
      handleScroll();
    },
  };
}
