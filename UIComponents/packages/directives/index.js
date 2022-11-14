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