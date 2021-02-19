'use strict';

(function () {
  // РАЗДЕЛ блокировки интерактивных элементов формы
  const KODE_ESC = 27;
  // const adForm = document.querySelector('.ad-form');
  const fieldsets = document.querySelectorAll('fieldset');
  const adFormAddress = document.querySelector('input[name="address"]');
  let map = document.querySelector('.map');

  window.adFormAddress = adFormAddress;
  window.fieldsets = fieldsets;
  window.KODE_ESC = KODE_ESC;
  window.map = map;
  // window.adForm = adForm;

  for (let i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', '');
  }
  // КОНЕЦ РАЗДЕЛА
})();
