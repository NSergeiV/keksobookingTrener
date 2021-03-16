'use strict';

(function () {
  let formOnMap = window.map.querySelector('form');
  window.formReset = function (evt) {
    const adFormPhotoContainer = window.adForm.querySelector('.ad-form__photo-container');
    let containerPhotoYes = adFormPhotoContainer.querySelector('.ad-form__photo');
    let adTags = window.map.querySelectorAll('button[type="button"]');
    if (window.map.querySelector('.popup')) {
      window.closeCardBigButton(evt);
    }
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
    window.adFormAddress.value = (window.mapPinMain.offsetLeft + Math.ceil(65 / 2)) + ' ' + (window.mapPinMain.offsetTop + Math.ceil(65 / 2));
    formOnMap.style.opacity = null;
    for (let i = adTags.length - 1; i >= 0; i--) {
      let child = adTags[i];
      child.parentElement.removeChild(child);
    }
  };
})();
