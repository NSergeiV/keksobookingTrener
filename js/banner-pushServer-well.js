'use strict';

// Банер удачной отправик данных
(function () {
  const templateMessage = document.querySelector('#success').content.querySelector('.success');
  const templateCope = templateMessage.cloneNode(true);
  let formOnMap = window.map.querySelector('form');
  window.pushGoodData = function () {
    const adFormPhotoContainer = window.adForm.querySelector('.ad-form__photo-container');
    let containerPhotoYes = adFormPhotoContainer.querySelector('.ad-form__photo');
    window.mainOne.style.position = 'fixed';
    window.mainBody.insertAdjacentElement('afterbegin', templateCope);
    let closeBanner = function () {
    	templateCope.remove();
        if (containerPhotoYes) {
            containerPhotoYes.remove();
        }
    	window.adForm.reset();
    	formOnMap.reset();
        window.mainOne.style = null;
        window.map.classList.add('map--faded');
        window.lockdown();
        window.adForm.classList.add('ad-form--disabled');
        window.mapPinMain.style.left = '570px';
        window.mapPinMain.style.top = '375px';
        window.adFormAddress.value = (mapPinMain.offsetLeft + Math.ceil(65 / 2)) + ' ' + (mapPinMain.offsetTop + Math.ceil(65 / 2));
        console.log(formOnMap);
        formOnMap.style.opacity = null;
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
