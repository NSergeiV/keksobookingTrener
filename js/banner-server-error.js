'use strict';

// Вывод ошибок сервера на экран
(function () {
  const KODE_ESC = 27;

  let node = document.createElement('div');
  let nodeInside = document.createElement('div');
  let mainBody = document.querySelector('main');
  window.pullErrorHandler = function (errorMessage) {
    node.classList.add('error');
    nodeInside.classList.add('error__inner');
    nodeInside.textContent = errorMessage;
    mainBody.insertAdjacentElement('afterbegin', node);
    node.insertAdjacentElement('afterbegin', nodeInside);
    let closeBanner = function (evt) {
      if (evt.keyCode === KODE_ESC) {
        evt.preventDefault();
        node.remove();
        document.removeEventListener('keydown', closeBanner);
      }
    };
    document.addEventListener('keydown', closeBanner);
  };
})();
