'use strict';

(function () {
  window.formFullung = function () {
    const choiceHousing = window.adForm.querySelector('#type');
    const priceHousingNight = window.adForm.querySelector('#price');
    const choiceTimeIn = window.adForm.querySelector('#timein');
    const choiceTimeOut = window.adForm.querySelector('#timeout');
    const checkInTimes = choiceTimeIn.querySelectorAll('option');
    const checkOutTimes = choiceTimeOut.querySelectorAll('option');
    const choiceRoomNumber = window.adForm.querySelector('#room_number');
    const choiceCapacity = window.adForm.querySelector('#capacity');
    const checkCapacitys = choiceCapacity.querySelectorAll('option');
    const avatarChooser = window.adForm.querySelector('#avatar');
    const photoChooser = window.adForm.querySelector('#images');
    const avatarBlock = window.adForm.querySelector('.ad-form-header__preview');
    const avatar = avatarBlock.querySelector('img');
    const photoBlock = window.adForm.querySelector('.ad-form__photo');

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
  };
})();
