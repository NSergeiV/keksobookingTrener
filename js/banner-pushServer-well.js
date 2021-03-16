'use strict';

// Банер удачной отправик данных
(function () {
  const templateMessage = document.querySelector('#success').content.querySelector('.success');
  const templateCope = templateMessage.cloneNode(true);
  window.pushGoodData = function () {
    window.mainOne.style.position = 'fixed';
    window.formReset();
    window.mainBody.insertAdjacentElement('afterbegin', templateCope);
    let closeBannerWell = () => {
      window.closeBanner(templateCope, closeBannerEsc, closeBannerWell);
    };
    let closeBannerEsc = function (evt) {
      if (evt.keyCode === window.KODE_ESC) {
        evt.preventDefault();
        window.closeBanner(templateCope, closeBannerEsc, closeBannerWell);
      }
    };
    document.addEventListener('keydown', closeBannerEsc);
    document.addEventListener('mouseup', closeBannerWell);
  };
})();
