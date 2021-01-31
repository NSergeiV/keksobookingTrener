'use strict';
// Файл загрузки, выгрузки серверных данных

(function () {
  const TIMEOUT_IN_MS = 10000;
  const StatusCode = {
    OK: 200
  };
  window.backend = {
    load: function (onLoad, onError) {
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      const URL = 'https://21.javascript.pages.academy/keksobooking/data';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.open('GET', URL);
      xhr.send();
    }
  };
})();
