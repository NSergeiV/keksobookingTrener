'use strict';

// Вывод ошибок сервера на экран
(function () {
  window.pushErrorHandler = function () {
    window.closePopupImgUpload();
    window.popupTemplate('#error', '.error', '.error__button');
  };

  let node = document.createElement('div');
  let nodeInside = document.createElement('div');
  let mainBody = document.querySelector('main');
  window.pullErrorHandler = function (errorMessage) {
    node.classList.add('error');
    nodeInside.classList.add('error__inner');
    // node.style = 'align-items: center;';
    nodeInside.textContent = errorMessage;
    mainBody.insertAdjacentElement('afterbegin', node);
    node.insertAdjacentElement('afterbegin', nodeInside);
  };
})();
