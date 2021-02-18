'use strict';

// Банер удачной отправик данных
(function () {
  console.log(mainBody);
  window.pushGoodData = function () {
    console.log('удачно отправлено!!!');
    const templateMessage = document.querySelector('#success').content.querySelector('.success');
    // const blockSuccessMessage = templateMessage.querySelector('div');
    console.log(templateMessage);
    const templateCope = templateMessage.cloneNode(true);
    mainBody.insertAdjacentElement('afterbegin', templateCope);
    let closeBannerEsc = function (evt) {
    	if (evt.keyCode === KODE_ESC) {
    		evt.preventDefault();
    		node.remove();
    		document.removeEventListener('keydown', closeBannerEsc);
    		document.removeEventListener('mouseup', closeBannerClick);
    	}
    	closeBanner();
    };
    let closeBannerClick = function () {
    	closeBanner();
    };
    document.addEventListener('keydown', closeBannerEsc);
    document.addEventListener('mouseup', closeBannerClick);
  };
})();
