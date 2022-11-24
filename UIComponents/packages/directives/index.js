export const magnifier = {
  mounted(el) {
    const oImgWrap = el;
    const oMagWrap = oImgWrap.querySelector('.mag-wrap');
    const oMagImg = oMagWrap.querySelector('.mag-img');
    const imgWidth = parseInt(window.getComputedStyle(oImgWrap, null)['width']);
    const imgHeight = parseInt(window.getComputedStyle(oImgWrap, null)['height']);
    const focusWidth = parseInt(window.getComputedStyle(oMagWrap, null)['width']);
    const focusHeight = parseInt(window.getComputedStyle(oMagWrap, null)['height']);
    const imgX = oImgWrap.offsetLeft;
    const imgY = oImgWrap.offsetTop;

    const init = () => {
      bindEvents();
    }

    const bindEvents = () => {
      oImgWrap.addEventListener('mouseover', function (e) {
        oMagWrap.className += ' show';
        showMag(getXY(e).x, getXY(e).y);
        document.addEventListener('mousemove', handleMouseMove, false)
      }, false)

      oImgWrap.addEventListener('mouseout', handleMouseOut, false)
    }

    function handleMouseMove(e) {
      const { x, y, mouseX, mouseY } = getXY(e);
      showMag(x, y, mouseX, mouseY)

    }

    function handleMouseOut() {
      oMagWrap.className = 'mag-wrap';
      document.removeEventListener('mousemove', handleMouseMove, false);
    }

    function showMag(x, y, mouseX, mouseY) {
      oMagWrap.style.left = x + 'px';
      oMagWrap.style.top = y + 'px';
      oMagImg.style.left = -x + 'px';
      oMagImg.style.top = -y + 'px';

      if (mouseX < 0 || mouseY < 0 || mouseX > imgWidth || mouseY > imgHeight) {
        oMagWrap.className = 'mag-wrap';
        document.removeEventListener('mousemove', handleMouseMove, false);
      }
    }

    function getXY(e) {
      return {
        x: e.pageX - imgX - focusWidth / 2,
        y: e.pageY - imgY - focusHeight / 2,
        mouseX: e.pageX - imgX,
        mouseY: e.pageY - imgY
      }
    }

    init();
  }
}

export const rate = {
  mounted(el, binding) {
    const oRatingWrapper = el;
    const oRatingItems = el.querySelectorAll('.star');
    // enter the rating wrapper
    el.addEventListener('mouseenter', function (e) {
      oRatingItems.forEach((oItem, index) => {
        // hover
        oItem.onmouseover = function (e) {
          e.stopPropagation();
          // update rate
          binding.value.setRate(index + 1);
        };
        // click
        oItem.onclick = function (e) {
          e.stopPropagation();
          // update rate;
          binding.value.setRate(index + 1);
        }
      })
    }, false)
    // leave the rating wrapper
    el.addEventListener('mouseleave', function (e) {
      // if less than 1, be zero
      if (binding.value.getRate() <= 1) {
        binding.value.setRate(0);
      }
      // remove all listener, or will memory leak
      oRatingItems.forEach((oItem, index) => {
        oItem.onmouseover = null;
        oItem.onclick = null;
      })
    })
  }
}

export const selectFocus = {
  mounted(el, binding) {
    console.log(binding)
    const oSelectorInput = el.querySelector('.selector-input');
    const oInput = oSelectorInput.querySelector('.input');
    const oPlaceHolder = oSelectorInput.querySelector('.placeholder');
    const oIcon = oSelectorInput.querySelector('.icon-search');
    const oMenu = el.querySelector('.selector-menu');

    bindEvents();

    function bindEvents() {
      console.log('aaa')
      oInput.addEventListener('focus', handleFocus, false)

      oInput.addEventListener('blur', handleBlur, false)
    }

    function handleFocus() {
      oPlaceHolder.style.display = 'none';
      oIcon.className = 'bi bi-search icon-search';
      setTimeout(() => {
        oMenu.style.display = 'block'
      }, 200)
    }

    function handleBlur() {
      oPlaceHolder.style.display = 'block';
      oIcon.className = 'bi bi-chevron-down icon-search'
      setTimeout(() => {
        oMenu.style.display = 'none'
        if (oInput.value.length === 0) {
          oPlaceHolder.style.display = 'block'
        }
        oPlaceHolder.style.display = 'none'
      }, 100)
    }
  },


}