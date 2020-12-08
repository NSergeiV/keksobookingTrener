'use strict';

let map = document.querySelector('.map');
// map.classList.remove('map--faded');

// Раздел перемещения метки указания адреса объявления
let mapPinMain = document.querySelector('.map__pin--main');
console.log(mapPinMain);

let kog = mapPinMain.querySelector('svg');
console.log(kog);

kog.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  let onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
    mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
  };

  let onMouseUp = function (upEvt) {
    upEvt.preventDefault();

		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
});
