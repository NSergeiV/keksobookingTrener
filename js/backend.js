'use strict';


const TIMEOUT_IN_MS = 10000;
const StatusCode = {
  OK: 200
};
window.backend = {
  serverServices: function (onLoad, onError, data) {
    let URL;
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    URL = (data) ? 'https://21.javascript.pages.academy/keksobooking' : 'https://21.javascript.pages.academy/keksobooking/data';
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
    if (data) {
      xhr.open('POST', URL);
      xhr.send(data);
    } else {
      xhr.open('GET', URL);
      xhr.send();
    }
  },
  load: function (onLoad, onError) {
    this.serverServices(onLoad, onError);
  },
  save: function (onLoad, onError, data) {
    this.serverServices(onLoad, onError, data);
  }
};

