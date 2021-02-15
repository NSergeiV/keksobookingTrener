'use strict';

(function () {
  // РАЗДЕЛ блокировки интерактивных элементов формы
  // const adForm = document.querySelector('.ad-form');
  const fieldsets = document.querySelectorAll('fieldset');
  const adFormAddress = document.querySelector('input[name="address"]');

  window.adFormAddress = adFormAddress;
  window.fieldsets = fieldsets;
  // window.adForm = adForm;

  for (let i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', '');
  }
  // КОНЕЦ РАЗДЕЛА
})();
