'use strict';

(function () {
  // РАЗДЕЛ блокировки интерактивных элементов формы
  const adForm = document.querySelector('.ad-form');
  const fieldsets = adForm.querySelectorAll('fieldset');
  const adFormAddress = adForm.querySelector('input[name="address"]');

  window.adFormAddress = adFormAddress;
  window.fieldsets = fieldsets;
  window.adForm = adForm;

  for (let i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', '');
  }
  // КОНЕЦ РАЗДЕЛА
})();
