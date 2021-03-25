'use strict';
// Фильтрация объявлений по значению расположенных неподалеку

(function () {
  window.filteringByValue = (copyArr) => {
    const formMapFilters = document.querySelector('.map__filters');
    const filterHousingType = formMapFilters.querySelector('#housing-type');
    const filterHousingPrice = formMapFilters.querySelector('#housing-price');
    const filterHousingRooms = formMapFilters.querySelector('#housing-rooms');
    const filterHousingGuests = formMapFilters.querySelector('#housing-guests');
    const filterHousingFeatures = formMapFilters.querySelector('#housing-features');
    let newObject = {};

    // БЛОК создания отфильтованного массива из объявлений при выборе требований по фильтру
    let matches = () => {
      let copyRezult = copyArr;
      for (let key in newObject) {
        if (newObject.hasOwnProperty(key)) {
          copyRezult = copyRezult.filter(function (it) {
            if (key === 'housingType') {
              return it.offer.type === newObject[key];
            }
            if (key === 'housingPrice') {
              if (newObject[key] === 'middle') {
                return it.offer.price >= 10000 && it.offer.price <= 50000;
              }
              if (newObject[key] === 'low') {
                return it.offer.price < 10000;
              }
              if (newObject[key] === 'high') {
                return it.offer.price > 50000;
              }
            }
            if (key === 'housingRooms') {
              return it.offer.rooms === parseInt(newObject[key], 10);
            }
            if (key === 'housingGuests') {
              return it.offer.guests === parseInt(newObject[key], 10);
            }
            if (key === 'housingFeatures') {
              let testRezalt = true;
              for (let i = 0; i < newObject.housingFeatures.length; i++) {
                if (it.offer.features.some(function (elem) {
                  return elem === newObject.housingFeatures[i];
                }) === false) {
                  testRezalt = false;
                  return testRezalt;
                }
              }
              return testRezalt;
            }
            return null;
          });
        }
        /* copyRezult = copyRezult.filter(function (it) {
          if (key === 'housingType') {
            return it.offer.type === newObject[key];
          }
          if (key === 'housingPrice') {
            if (newObject[key] === 'middle') {
              return it.offer.price >= 10000 && it.offer.price <= 50000;
            }
            if (newObject[key] === 'low') {
              return it.offer.price < 10000;
            }
            if (newObject[key] === 'high') {
              return it.offer.price > 50000;
            }
          }
          if (key === 'housingRooms') {
            return it.offer.rooms === parseInt(newObject[key], 10);
          }
          if (key === 'housingGuests') {
            return it.offer.guests === parseInt(newObject[key], 10);
          }
          if (key === 'housingFeatures') {
            let testRezalt = true;
            for (let i = 0; i < newObject.housingFeatures.length; i++) {
              if (it.offer.features.some(function (elem) {
                return elem === newObject.housingFeatures[i];
              }) === false) {
                testRezalt = false;
                return testRezalt;
              }
            }
            return testRezalt;
          }
        }); */
      }
      window.adsFiltered = copyRezult;
      window.closeAllPinOnMap();
      window.drawingPlacemarksMap(window.adsFiltered);
    };
    // КОНЕЦ блока создания массива

    window.drawingPlacemarksMap(window.adsFiltered);

    // В этой нижней части блока создаем объект с параметрами для отбора объявлений
    filterHousingType.onchange = function () {
      newObject.housingType = filterHousingType.value;
      if (filterHousingType.value === 'any') {
        delete newObject.housingType;
      }
      matches();
      // console.log(newObject);
    };
    filterHousingPrice.onchange = function () {
      newObject.housingPrice = filterHousingPrice.value;
      if (filterHousingPrice.value === 'any') {
        delete newObject.housingPrice;
      }
      matches();
      // console.log(newObject);
    };
    filterHousingRooms.onchange = function () {
      newObject.housingRooms = filterHousingRooms.value;
      if (filterHousingRooms.value === 'any') {
        delete newObject.housingRooms;
      }
      matches();
    };
    filterHousingGuests.onchange = function () {
      newObject.housingGuests = filterHousingGuests.value;
      if (filterHousingGuests.value === 'any') {
        delete newObject.housingGuests;
      }
      matches();
    };
    let choosingService = (evt) => {
      if (evt.target && evt.target.matches('input[type="checkbox"]')) {
        if (!newObject.housingFeatures) {
          newObject.housingFeatures = [];
          newObject.housingFeatures.push(evt.target.value);
        } else {
          let serialNumber = 0;
          let rezult = newObject.housingFeatures.some(function (elem, index) {
            serialNumber = index;
            return elem === evt.target.value;
          });
          if (rezult) {
            newObject.housingFeatures.splice(serialNumber, 1);
          } else {
            newObject.housingFeatures.push(evt.target.value);
          }
        }
        if (newObject.housingFeatures.length === 0) {
          delete newObject.housingFeatures;
        }
      }
      matches();
    };

    // Активируем выбор удобств в фильтре на карте
    filterHousingFeatures.addEventListener('change', choosingService);
  };
})();
