'use strict';

// Банер удачной отправик данных
(function () {
  let formOnMap = window.map.querySelector('form');
  window.pushGoodData = function () {
    const templateMessage = document.querySelector('#success').content.querySelector('.success');
    const templateCope = templateMessage.cloneNode(true);
    const adFormPhotoContainer = window.adForm.querySelector('.ad-form__photo-container');
    let containerPhotoYes = adFormPhotoContainer.querySelector('.ad-form__photo');
    window.mainOne.style.position = 'fixed';
    mainBody.insertAdjacentElement('afterbegin', templateCope);
    let closeBanner = function () {
    	templateCope.remove();
        if (containerPhotoYes) {
            containerPhotoYes.remove();
        }
    	window.adForm.reset();
    	formOnMap.reset();
        window.mainOne.style = null;
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
