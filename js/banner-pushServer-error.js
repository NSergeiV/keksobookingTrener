'use strict';
(function () {
  const templateMessageError = document.querySelector('#error').content.querySelector('.error');
  const templateCopeError = templateMessageError.cloneNode(true);
  const errorButton = templateCopeError.querySelector('.error__button');
  window.pushErrorData = function () {
    window.mainOne.style.position = 'fixed';
    window.mainBody.insertAdjacentElement('afterbegin', templateCopeError);
    let closeBannerError = function () {
      templateCopeError.remove();
      window.mainOne.style.position = null;
      errorButton.removeEventListener('click', closeBannerError);
      document.removeEventListener('keydown', closeBannerErrorEsc);
      document.removeEventListener('mouseup', closeBannerError);
    };
    let closeBannerErrorEsc = function (evt) {
      if (evt.keyCode === window.KODE_ESC) {
        evt.preventDefault();
        closeBannerError();
      }
    };
    errorButton.addEventListener('click', closeBannerError);
    document.addEventListener('keydown', closeBannerErrorEsc);
    document.addEventListener('mouseup', closeBannerError);
  };
})();
