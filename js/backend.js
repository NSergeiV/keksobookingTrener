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
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа сервера: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения с сервером');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = TIMEOUT_IN_MS;
      xhr.open('GET', URL);
      xhr.send();
    }
  };
})();
