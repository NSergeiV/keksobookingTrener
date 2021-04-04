'use strict';

(function () {
  let node = document.createElement('div');
  let nodeInside = document.createElement('div');
  let mainBody = document.querySelector('main');
  window.mainBody = mainBody;
  window.pullErrorHandler = function (errorMessage) {
    node.classList.add('error');
    nodeInside.classList.add('error__inner');
    nodeInside.textContent = errorMessage;
    mainBody.insertAdjacentElement('afterbegin', node);
    node.insertAdjacentElement('afterbegin', nodeInside);
    let closeBanner = function (evt) {
      if (evt.keyCode === window.KODE_ESC) {
        evt.preventDefault();
        node.remove();
        document.removeEventListener('keydown', closeBanner);
      }
    };
    document.addEventListener('keydown', closeBanner);
  };
})();
