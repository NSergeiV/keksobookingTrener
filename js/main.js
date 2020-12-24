'use strict';

// РАЗДЕЛ блокировки интерактивных элементов формы
const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset');
for (let i = 0; i < fieldsets.length; i++) {
  fieldsets[i].setAttribute('disabled', '');
}
// КОНЕЦ РАЗДЕЛА

// РАЗДЕЛ перемещения метки указания адреса объявления
let map = document.querySelector('.map');
let mapPinMain = document.querySelector('.map__pin--main');
let markerSvg = mapPinMain.querySelector('svg');
let markerImg = mapPinMain.querySelector('img');
const mapArea = map.querySelector('.map__pins');

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
  let centralPointY = (Math.ceil(block.getBoundingClientRect().top) + (Math.ceil(block.getBoundingClientRect().height) / 2)) - evt.pageY;
  let scopeSearch = {
    leftX: leftCoordMapArea,
    rightX: leftCoordMapArea + sizeWidthMap,
    topY: topCoordMapArea + 130,
    bottomY: topCoordMapArea + 630
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

// Активируем внутренний маркер
markerImg.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  map.classList.remove('map--faded');
  for (let i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  }
  adForm.classList.remove('ad-form--disabled');

  moving(evt, markerImg);
});

// Активируем наружную часть маркера
markerSvg.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  moving(evt, markerSvg);
});
// КОНЕЦ РАЗДЕЛА
