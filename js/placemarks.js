'use strict';


window.closeCardBigButton = () => {
  window.closeBanner(window.popup, window.closeCardBigEsc);
  window.closeButtenPopup.removeEventListener('mouseup', window.closeCardBigButton);
};

window.sortingAdsFiltered = (set) => {
  let str = window.adFormAddress.value;
  let arrStr = str.split(' ');
  set.sort(function (a, b) {
    let differenceOne = Math.round(Math.sqrt(Math.pow((arrStr[0] - a.location.x), 2) + Math.pow((arrStr[1] - a.location.y), 2)));
    let differenceTwo = Math.round(Math.sqrt(Math.pow((arrStr[0] - b.location.x), 2) + Math.pow((arrStr[1] - b.location.y), 2)));
    let rangeDiff = differenceOne - differenceTwo;
    return rangeDiff;
  });

  return set;
};

window.closeAllPinOnMap = function () {
  let adSet = window.map.querySelectorAll('button[type="button"]');
  for (let i = adSet.length - 1; i >= 0; i--) {
    let child = adSet[i];
    child.parentElement.removeChild(child);
  }
};

window.closeActivePin = function () {
  let adTags = window.map.querySelectorAll('button[type="button"]');
  for (let i = 0; i < adTags.length; i++) {
    adTags[i].classList.remove('map__pin--active');
  }
};

window.closeCardBig = function () {
  let popup = window.map.querySelector('.popup');
  window.closeBanner(popup, window.closeCardBigEsc);
};

window.drawingPlacemarksMap = function (collection) {
  const templatePin = document.querySelector('#pin').content;
  let fragment = document.createDocumentFragment();
  let creatingPinBlock = (pin) => {
    let newElement = templatePin.querySelector('.map__pin').cloneNode(true);
    newElement.style.left = pin.location.x + 'px';
    newElement.style.top = pin.location.y + 'px';
    newElement.querySelector('img').src = pin.author.avatar;

    return newElement;
  };
  collection = window.sortingAdsFiltered(collection);
  collection = collection.slice(0, 5);
  for (let i = 0; i < collection.length; i++) {
    fragment.appendChild(creatingPinBlock(collection[i]));
  }
  window.map.appendChild(fragment);

  let adTags = window.map.querySelectorAll('button[type="button"]');
  for (let i = 0; i < adTags.length; i++) {
    adTags[i].onclick = function (evt) {
      window.pinActivation(evt);
    };
  }
  if (window.map.querySelector('.popup')) {
    window.closeCardBig();
  }
};

window.placemaks = function (ads) {
  const templateAdCard = document.querySelector('#card').content;

  if (window.map.querySelector('.popup')) {
    window.closeCardBig();
  }

  window.closeCardBigEsc = (evt) => {
    if (evt.keyCode === window.KODE_ESC) {
      evt.preventDefault();
      let popup = window.map.querySelector('.popup');
      window.closeBanner(popup, window.closeCardBigEsc);
      window.closeActivePin();
    }
  };
  let descriptionCard = (data) => {
    let newCard = templateAdCard.querySelector('.map__card').cloneNode(true);
    if (window.map.querySelector('.popup')) {
      window.closeCardBig();
    }
    newCard.querySelector('.popup__avatar').src = data.author.avatar;
    newCard.querySelector('.popup__title').textContent = data.offer.title;
    newCard.querySelector('.popup__text--address').textContent = data.offer.address;
    let mnemonic = "&#x20bd;<span>/ночь</span>";
    newCard.querySelector('.popup__text--price').innerHTML = data.offer.price + mnemonic;
    let matchSelection = (selection) => {
      let answer;
      switch (selection) {
        case 'bungalow': answer = 'Бунгало'; break;
        case 'flat': answer = 'Квартира'; break;
        case 'house': answer = 'Дом'; break;
        case 'palace': answer = 'Дворец'; break;
      }
      return answer;
    };
    let guestSelection = (number) => {
      let guest;
      if (number === 1) {
        guest = ' 1 гостя';
      } else {
        guest = ' ' + number + ' гостей';
      }
      return guest;
    };
    newCard.querySelector('.popup__type').textContent = matchSelection(data.offer.type);
    if (data.offer.rooms === 0) {
      newCard.querySelector('.popup__text--capacity').remove();
    } if (data.offer.rooms === 1) {
      newCard.querySelector('.popup__text--capacity').innerHTML = data.offer.rooms + ' комната для ' + guestSelection(data.offer.guests);
    } if (data.offer.rooms === 2 || data.offer.rooms === 3) {
      newCard.querySelector('.popup__text--capacity').innerHTML = data.offer.rooms + ' комнаты для ' + guestSelection(data.offer.guests);
    } if (data.offer.type === 'palace') {
      newCard.querySelector('.popup__text--capacity').innerHTML = data.offer.rooms + ' комнат для' + guestSelection(data.offer.guests);
    }
    newCard.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    if (data.offer.features.length === 0) {
      newCard.querySelector('.popup__features').remove();
    } else {
      let conveniences = newCard.querySelector('.popup__features').children;
      for (let i = conveniences.length - 1; i >= 0; i--) {
        let child = conveniences[i];
        child.parentElement.removeChild(child);
      }
      for (let i = 0; i < data.offer.features.length; i++) {
        let oneConvenience = data.offer.features[i];
        let card = document.createElement('li');
        card.classList.add('popup__feature');
        let typeConvenience = 'popup__feature--' + oneConvenience;
        card.classList.add(typeConvenience);
        newCard.querySelector('.popup__features').appendChild(card);
      }
    }
    if (data.offer.description) {
      newCard.querySelector('.popup__description').textContent = data.offer.description;
    } else {
      newCard.querySelector('.popup__description').remove();
    }
    let fragmentImg = document.createDocumentFragment();
    let blockImg = newCard.querySelector('.popup__photos');
    let cloneBlockImg = blockImg.cloneNode(true);
    blockImg.querySelector('img').remove();
    let creatingPhoto = (photo) => {
      let newElementImg = cloneBlockImg.querySelector('.popup__photo').cloneNode();
      newElementImg.src = photo;

      return newElementImg;
    };
    if (data.offer.photos === 0) {
      blockImg.remove();
    } else {
      for (let i = 0; i < data.offer.photos.length; i++) {
        fragmentImg.appendChild(creatingPhoto(data.offer.photos[i]));
      }
      blockImg.appendChild(fragmentImg);
    }
    document.addEventListener('keydown', window.closeCardBigEsc);

    return newCard;
  };
  if (window.map.querySelector('button[type="button"]')) {
    window.closeAllPinOnMap();
  }
  let adsFiltered = [];
  window.adsFiltered = adsFiltered;
  for (let i = 0; i < ads.length; i++) {
    if (ads[i].offer) {
      let element = ads[i];
      window.adsFiltered.push(element);
    }
  }
  window.filteringByValue(window.adsFiltered);

  window.pinActivation = (evt) => {
    if (evt.target && evt.target.closest('button[type="button"]') || evt.target && evt.target.matches('button[type="button"]')) {
      let pinBlock = evt.target.closest('button[type="button"]');
      window.closeActivePin();
      pinBlock.classList.add('map__pin--active');
      let cardBig = window.adsFiltered.find(function (elem) {
        return elem.location.x === parseInt(pinBlock.style.left, 10) && elem.location.y === parseInt(pinBlock.style.top, 10);
      });
      window.map.appendChild(descriptionCard(cardBig));
      let popup = window.map.querySelector('.popup');
      window.popup = popup;
      let closeButtenPopup = window.popup.querySelector('.popup__close');
      window.closeButtenPopup = closeButtenPopup;
      window.closeButtenPopup.addEventListener('mouseup', window.closeCardBigButton);
    }
  };

  let adTags = window.map.querySelectorAll('button[type="button"]');
  for (let i = 0; i < adTags.length; i++) {
    adTags[i].onclick = function (evt) {
      window.pinActivation(evt);
    };
  }

  window.adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.formReset(evt);
  });
};
