'use strict';

(function () {
  // РАЗДЕЛ перемещения метки с указанием координат в поле адреса объявления
  // let map = document.querySelector('.map');
  let mapPinMain = document.querySelector('.map__pin--main');
  let markerSvg = mapPinMain.querySelector('svg');
  let markerImg = mapPinMain.querySelector('img');
  let listAddresses;
  const mapArea = window.map.querySelector('.map__pins');

  window.listAddresses = listAddresses;

  window.adFormAddress.value = (mapPinMain.offsetLeft + Math.ceil(65 / 2)) + ' ' + (mapPinMain.offsetTop + Math.ceil(65 / 2));

  // Функция перемещения
  const moving = (evt, block) => {
    const sizeWidthMap = mapArea.offsetWidth;
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const leftCoordMapArea = Math.floor(mapArea.getBoundingClientRect().left);
    const topCoordMapArea = Math.floor(mapArea.getBoundingClientRect().top);

    let centralPointX = (Math.ceil(block.getBoundingClientRect().left) + (Math.ceil(block.getBoundingClientRect().width) / 2)) - evt.pageX;
    let centralPointY;
    let indent;
    if (block === markerSvg) {
      centralPointY = (Math.ceil(block.getBoundingClientRect().top) + (Math.ceil(block.getBoundingClientRect().height) / 2)) - evt.pageY;
      indent = Math.ceil(block.getBoundingClientRect().height / 2);
    } else {
      centralPointY = (Math.ceil(block.getBoundingClientRect().top) + 82) - evt.pageY;
      indent = 82;
    }

    let topLimit;

    if (window.scrollY <= 130) {
      topLimit = topCoordMapArea + (130 + indent) - window.scrollY;
    } else {
      topLimit = -(window.scrollY - indent);
    }

    let scopeSearch = {
      leftX: leftCoordMapArea,
      rightX: leftCoordMapArea + sizeWidthMap,
      topY: topLimit,
      // topY: topCoordMapArea + 130 - window.scrollY,
      bottomY: (630 + 82 + topCoordMapArea) + topCoordMapArea
    };

    let onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      if (moveEvt.clientX + centralPointX >= scopeSearch.leftX && moveEvt.clientX + centralPointX < scopeSearch.rightX && moveEvt.clientY + centralPointY >= scopeSearch.topY && moveEvt.clientY + centralPointY < scopeSearch.bottomY) {
        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';

        if (block === markerSvg) {
          window.adFormAddress.value = ((mapPinMain.offsetLeft - shift.x) + Math.ceil(65 / 2)) + ' ' + ((mapPinMain.offsetTop - shift.y) + Math.ceil(65 / 2));
        } else {
          window.adFormAddress.value = ((mapPinMain.offsetLeft - shift.x) + Math.ceil(65 / 2)) + ' ' + ((mapPinMain.offsetTop - shift.y) + 82);
        }
      }
    };

    let onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  // КОНЕЦ функции перемещения

  window.successHandler = function (data) {
    window.listAddresses = data;
    window.map.querySelector('form').style.opacity = '1';
  };

  // Активируем внутренний маркер
  markerImg.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    window.backend.load(window.successHandler, window.pullErrorHandler);
    window.map.classList.remove('map--faded');
    window.map.querySelector('form').style.opacity = '0';
    for (let i = 0; i < window.fieldsets.length; i++) {
      window.fieldsets[i].removeAttribute('disabled');
    }
    window.adForm.classList.remove('ad-form--disabled');

    moving(evt, markerImg);
    window.formFullung();
  });

  // Активируем наружную часть маркера
  markerSvg.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    moving(evt, markerSvg);
  });
  // КОНЕЦ РАЗДЕЛА
})();
