'use strict';

// Банер удачной отправик данных
(function () {
  let formOnMap = window.map.querySelector('form');
  window.pushGoodData = function () {
    console.log('удачно отправлено!!!');
    const templateMessage = document.querySelector('#success').content.querySelector('.success');
    // const blockSuccessMessage = templateMessage.querySelector('div');
    console.log(templateMessage);
    const templateCope = templateMessage.cloneNode(true);
    mainBody.insertAdjacentElement('afterbegin', templateCope);
    let closeBanner = function () {
    	templateCope.remove();
    	window.adForm.reset();
    	formOnMap.reset();
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
