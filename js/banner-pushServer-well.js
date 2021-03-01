'use strict';

// Банер удачной отправик данных
(function () {
  const templateMessage = document.querySelector('#success').content.querySelector('.success');
  const templateCope = templateMessage.cloneNode(true);
  window.pushGoodData = function () {
    window.mainOne.style.position = 'fixed';
    window.mainBody.insertAdjacentElement('afterbegin', templateCope);
    let closeBanner = function () {
      templateCope.remove();
      window.formReset();
      document.removeEventListener('keydown', closeBannerEsc);
      document.removeEventListener('mouseup', closeBanner);
    };
    let closeBannerEsc = function (evt) {
      if (evt.keyCode === window.KODE_ESC) {
        evt.preventDefault();
        closeBanner();
      }
    };
    document.addEventListener('keydown', closeBannerEsc);
    document.addEventListener('mouseup', closeBanner);
  };
})();
