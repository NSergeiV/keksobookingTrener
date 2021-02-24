'use strict';

(function () {
  const adForm = document.querySelector('.ad-form');
  window.adForm = adForm;
  window.formFullung = function () {
    const choiceHousing = adForm.querySelector('#type');
    const priceHousingNight = adForm.querySelector('#price');
    const choiceTimeIn = adForm.querySelector('#timein');
    const choiceTimeOut = adForm.querySelector('#timeout');
    const checkInTimes = choiceTimeIn.querySelectorAll('option');
    const checkOutTimes = choiceTimeOut.querySelectorAll('option');
    const choiceRoomNumber = adForm.querySelector('#room_number');
    const choiceCapacity = adForm.querySelector('#capacity');
    const checkCapacitys = choiceCapacity.querySelectorAll('option');
    const avatarChooser = adForm.querySelector('#avatar');
    const photoChooser = adForm.querySelector('#images');
    const avatarBlock = adForm.querySelector('.ad-form-header__preview');
    const avatar = avatarBlock.querySelector('img');
    const photoBlock = adForm.querySelector('.ad-form__photo');

    priceHousingNight.placeholder = 1000;
    priceHousingNight.min = 1000;

    // Добавляем фото и отправляем на проверку о принадлежности файла к фото
    avatarChooser.addEventListener('change', function () {
      window.checkingFile(avatarChooser, avatar);
    });

    photoChooser.addEventListener('change', function () {
      let photoTag = document.createElement('img');
      photoBlock.appendChild(photoTag);
      window.checkingFile(photoChooser, photoTag);
    });
    // КОНЕЦ БЛОКА

    // Установка по умолчанию количество гостей
    for (let i = 0; i < checkCapacitys.length; i++) {
      if (checkCapacitys[i].value === '1') {
        checkCapacitys[2].removeAttribute('disabled');
      } else {
        checkCapacitys[i].setAttribute('disabled', '');
      }
    }
    // КОНЕЦ БЛОКА

    // Блок выбора минимальной цены за жилье
    let getHousing = function (flophouse) {
      let answer;
      switch (flophouse) {
        case 'bungalow':
          answer = 0;
          break;
        case 'flat':
          answer = 1000;
          break;
        case 'house':
          answer = 5000;
          break;
        case 'palace':
          answer = 10000;
      }
      return answer;
    };
    // КОНЕЦ БЛОКА

    // Блок выбора времени заезда и выезда
    let searchMatches = function (array, time) {
      for (let i = 0; i < array.length; i++) {
        array[i].removeAttribute('selected');
      }
      for (let i = 0; i < array.length; i++) {
        if (array[i].value === time) {
          array[i].setAttribute('selected', '');
        }
      }
    };
    // КОНЕЦ БЛОКА

    // Блок выбора из списка гостей для конкретного количества комнат
    let getCapacity = function (rooms) {
      for (let i = 0; i < checkCapacitys.length; i++) {
        checkCapacitys[i].removeAttribute('disabled');
        checkCapacitys[i].removeAttribute('selected');
      }
      switch (rooms) {
        case '100':
          for (let i = 0; i < checkCapacitys.length - 1; i++) {
            checkCapacitys[i].setAttribute('disabled', '');
          }
          checkCapacitys[3].setAttribute('selected', '');
          break;
        case '3':
          checkCapacitys[3].setAttribute('disabled', '');
          checkCapacitys[0].setAttribute('selected', '');
          break;
        case '2':
          checkCapacitys[1].setAttribute('selected', '');
          checkCapacitys[0].setAttribute('disabled', '');
          checkCapacitys[3].setAttribute('disabled', '');
          break;
        case '1':
          for (let i = 0; i < checkCapacitys.length; i++) {
            if (checkCapacitys[i].value === '1') {
              checkCapacitys[2].setAttribute('selected', '');
            } else {
              checkCapacitys[i].setAttribute('disabled', '');
            }
          }
          break;
      }
    };
    // КОНЕЦ БЛОКА

    // Далее выбор из выпадающего списка и запуск функций
    choiceHousing.onchange = function () {
      let housing = getHousing(choiceHousing.value);
      priceHousingNight.placeholder = housing;
      priceHousingNight.min = housing;
    };

    choiceTimeIn.onchange = function () {
      searchMatches(checkOutTimes, choiceTimeIn.value);
    };
    choiceTimeOut.onchange = function () {
      searchMatches(checkInTimes, choiceTimeOut.value);
    };
    choiceRoomNumber.onchange = function () {
      getCapacity(choiceRoomNumber.value);
    };
    // КОНЕЦ БЛОКА

    // Отправка формы на сервер
    adForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      window.backend.save(window.pushGoodData, window.pushErrorData, new FormData(adForm));
    });
  };
})();
