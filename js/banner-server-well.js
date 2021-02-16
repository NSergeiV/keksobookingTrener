'use strict';

// Банер удачной отправик данных
(function () {
  window.pushGoodData = function () {
    console.log('удачно отправлено!!!');
    const templateMessage = document.querySelector('#success');
    const blockSuccessMessage = templateMessage.querySelector('div');
    console.log(templateMessage);
    blockSuccessMessage.cloneNode(true);
    window.mainBody.insertAdjacentElement('afterbegin', blockSuccessMessage);
  };
})();
