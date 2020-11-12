/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!*********************!*\
  !*** ./js/utils.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];
const getRandomArray = (arr) => arr.slice(getRandom(0, arr.length / 2), getRandom(arr.length / 2 + 1, arr.length - 1));
const invokeIfKeyIs = (key, cb) => (evt) => evt.key === key && cb(evt);
const invokeIfButtonIs = (button, cb) => (evt) => evt.button === button && cb(evt);
const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
const getTruncatedArray = (arr, limit) => shuffleArray(arr).slice(0, limit);
const removeArray = (arr) => arr.forEach((element) => element.remove());

window.utils = {
  getRandom,
  getRandomFrom,
  getRandomArray,
  invokeIfKeyIs,
  invokeIfButtonIs,
  shuffleArray,
  getTruncatedArray,
  removeArray,
};

})();

(() => {
/*!************************!*\
  !*** ./js/debounce.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const DEBOUNCE_INTERVAL = 500;

window.debounce = (cb) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

})();

(() => {
/*!***********************!*\
  !*** ./js/backend.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const TIMEOUT_MS = 1000;
const StatusCode = {
  OK: 200
};
const Method = {
  GET: `GET`,
  POST: `POST`
};
const Url = {
  DOWNLOAD: `https://21.javascript.pages.academy/keksobooking/data`,
  UPLOAD: `https://21.javascript.pages.academy/keksobooking`
};

const sendRequest = (onSuccess, onError, method, url, data) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Произошла ошибка ` + xhr.status + xhr.statusText);
    }
  });
  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + TIMEOUT_MS + ` мс`);
  });
  xhr.timeout = TIMEOUT_MS;
  xhr.open(method, url);
  xhr.send(data);
};

const download = (onSuccess, onError) =>
  sendRequest(onSuccess, onError, Method.GET, Url.DOWNLOAD);
const upload = (onSuccess, onError, advertData) =>
  sendRequest(onSuccess, onError, Method.POST, Url.UPLOAD, advertData);

window.backend = {
  download,
  upload
};

})();

(() => {
/*!*******************************!*\
  !*** ./js/message-handler.js ***!
  \*******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const Key = {
  ESC: `Escape`,
  ENTER: `Enter`
};
const uploadSuccessMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const uploadFailedMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

const renderMessage = (status) => {
  const fragment = document.createDocumentFragment();
  let newMessage = ``;
  if (status === `success`) {
    newMessage = uploadSuccessMessageTemplate.cloneNode(true);
  } else {
    newMessage = uploadFailedMessageTemplate.cloneNode(true);
  }
  fragment.appendChild(newMessage);
  document.querySelector(`main`).appendChild(fragment);
};

const onDownloadError = (errorMessage) => {
  renderMessage(`error`);
  document.querySelector(`.error__message`).textContent = errorMessage;
  document.addEventListener(`click`, onMessageClose);
  document.addEventListener(`keydown`, onEscKeydown);
};

const onMessageOpen = (status) => {
  renderMessage(`${status}`);
  document.addEventListener(`click`, onMessageClose);
  document.addEventListener(`keydown`, onEscKeydown);
  if (document.querySelector(`.error__button`)) {
    document.querySelector(`.error__button`).addEventListener(`click`, onMessageClose);
  }
};

const onMessageClose = () => {
  if (document.querySelector(`.success`)) {
    document.querySelector(`.success`).remove();
  } else {
    document.querySelector(`.error`).remove();
  }
  document.removeEventListener(`click`, onMessageClose);
  document.removeEventListener(`keydown`, onEscKeydown);
};

const onEscKeydown = window.utils.invokeIfKeyIs(Key.ESC, onMessageClose);

window.messageHandler = {
  onDownloadError,
  show: onMessageOpen
};

})();

(() => {
/*!*************************!*\
  !*** ./js/page-mode.js ***!
  \*************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const Mouse = {
  LEFT_BUTTON: 0,
};
const Key = {
  ENTER: `Enter`,
  ESC: `Escape`
};
const map = document.querySelector(`.map`);
const advertForm = document.querySelector(`.ad-form`);
const filterForm = map.querySelector(`.map__filters`);
const advertFormElements = Array.from(advertForm.querySelectorAll(`.ad-form__element, .ad-form-header`));
const mapFilters = Array.from(map.querySelectorAll(`.map__filter, .map__features`));
const mapCheckboxes = Array.from(map.querySelectorAll(`.map__checkbox`));
const mapPinMain = map.querySelector(`.map__pin--main`);

const setElementsEnabled = (elements, enabled) => {
  elements.forEach((element) => {
    element.disabled = !enabled;
  });
};

const onSuccessDownload = (adverts) => {
  window.elementsRender.renderAllPins(adverts);
  window.advertsList = adverts;
};

const deactivatePage = () => {
  setElementsEnabled(advertFormElements, false);
  setElementsEnabled(mapFilters, false);
  setElementsEnabled(mapCheckboxes, false);
  map.classList.add(`map--faded`);
  filterForm.classList.add(`map__filters--disabled`);
  advertForm.classList.add(`ad-form--disabled`);
  window.pinMove.setAddress();
  mapPinMain.addEventListener(`mousedown`, onLeftButtonMousedown);
  mapPinMain.addEventListener(`keydown`, onEnterKeydown);
};

const activatePage = () => {
  window.backend.download(onSuccessDownload, window.messageHandler.onDownloadError);
  map.classList.remove(`map--faded`);
  advertForm.classList.remove(`ad-form--disabled`);
  filterForm.classList.remove(`map__filters--disabled`);
  setElementsEnabled(mapFilters, true);
  setElementsEnabled(advertFormElements, true);
  setElementsEnabled(mapCheckboxes, true);
  mapPinMain.removeEventListener(`mousedown`, onLeftButtonMousedown);
  mapPinMain.removeEventListener(`keydown`, onEnterKeydown);
};

const onLeftButtonMousedown = window.utils.invokeIfButtonIs(Mouse.LEFT_BUTTON, activatePage);
const onEnterKeydown = window.utils.invokeIfKeyIs(Key.ENTER, activatePage);

const resetPage = () => {
  advertForm.reset();
  window.photoUpload.reset();
  window.filterAdverts.resetFilter();
  window.pinMove.setDefualtPosition();
  window.pinMove.setAddress();
  window.utils.removeArray(Array.from(map.querySelectorAll(`.map__pin:not(.map__pin--main)`)));
  window.cardPopup.close();
};

window.pageMode = {
  activate: activatePage,
  deactivate: deactivatePage,
  reset: resetPage,
};

})();

(() => {
/*!*******************************!*\
  !*** ./js/elements-render.js ***!
  \*******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const PIN_NUMBER = 5;
const PropertyType = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};
const PropertyFeature = {
  wifi: `popup__feature--wifi`,
  dishwasher: `popup__feature--dishwasher`,
  parking: `popup__feature--parking`,
  washer: `popup__feature--washer`,
  elevator: `popup__feature--elevator`,
  conditioner: `popup__feature--conditioner`
};
const PHOTO_ELEMENT = {
  TAG: `img`,
  WIDTH: `45`,
  HEIGT: `40`,
  DESCRIPTION: `Фотография жилья`
};
const PIN_SIZE = {
  WIDTH: 50,
  HEIGHT: 70
}
const PinCoordsAdjustment = {
  X: PIN_SIZE.WIDTH / 2,
  Y: PIN_SIZE.HEIGHT
};
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const map = document.querySelector(`.map`);
const mapFilter = map.querySelector(`.map__filters-container`);
const pins = map.querySelector(`.map__pins`);

const getPropertyPhotos = (advert, cardElement) => {
  const photos = Array.from(advert.offer.photos);
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const photoElement = document.createElement(PHOTO_ELEMENT.TAG);
    photoElement.src = `${photo}`;
    photoElement.width = PHOTO_ELEMENT.WIDTH;
    photoElement.height = PHOTO_ELEMENT.HEIGT;
    photoElement.alt = PHOTO_ELEMENT.DESCRIPTION;
    photoElement.classList.add(`popup__photo`);
    fragment.appendChild(photoElement);
  });
  cardElement.querySelector(`.popup__photos`).appendChild(fragment);
};

const getPropertyFeatures = (advert, cardElement) => {
  const featureList = cardElement.querySelector(`.popup__features`);
  const features = Array.from(advert.offer.features);
  const fragment = document.createDocumentFragment();
  features.forEach((feature) => {
    const featureElement = document.createElement(`li`);
    featureElement.classList.add(`popup__feature`, `${PropertyFeature[feature]}`);
    fragment.appendChild(featureElement);
  });
  featureList.appendChild(fragment);
};

const renderData = (element, block, type, value) => {
  if (value !== undefined) {
    element.querySelector(block)[type] = value;
  } else {
    element.querySelector(block).style.display = `none`;
  }
};

const renderPin = (advert) => {
  const pinElement = pinTemplate.cloneNode(true);
  pinElement.style = `top: ${advert.location.y - PinCoordsAdjustment.Y}px; left: ${advert.location.x - PinCoordsAdjustment.X}px`;
  renderData(pinElement, `img`, `src`, `${advert.author.avatar}`);
  renderData(pinElement, `img`, `alt`, `${advert.offer.title}`);
  return pinElement;
};

const renderCard = (advert) => {
  const cardElement = cardTemplate.cloneNode(true);
  window.utils.removeArray(Array.from(cardElement.querySelectorAll(`.popup__feature`)));
  cardElement.querySelector(`.popup__photo`).remove();
  renderData(cardElement, `.popup__avatar`, `src`, `${advert.author.avatar}`);
  renderData(cardElement, `.popup__title`, `textContent`, `${advert.offer.title}`);
  renderData(cardElement, `.popup__text--address`, `textContent`, `${advert.offer.address}`);
  renderData(cardElement, `.popup__text--price`, `textContent`, `${advert.offer.price} руб./ночь`);
  renderData(cardElement, `.popup__type`, `textContent`, `${PropertyType[advert.offer.type]}`);
  renderData(cardElement, `.popup__text--capacity`, `textContent`, `Количество комнат: ${advert.offer.rooms}; Максимальное количество гостей: ${advert.offer.guests}`);
  renderData(cardElement, `.popup__text--time`, `textContent`, `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`);
  getPropertyFeatures(advert, cardElement);
  renderData(cardElement, `.popup__description`, `textContent`, `${advert.offer.description}`);
  getPropertyPhotos(advert, cardElement);
  return cardElement;
};

const renderAllPins = (adverts) => {
  const fragment = document.createDocumentFragment();
  window.utils.getTruncatedArray(adverts, PIN_NUMBER)
    .map(renderPin)
    .forEach((renderedPin) =>
      fragment.appendChild(renderedPin));
  pins.appendChild(fragment);
};

const renderSelectedCard = (adverts, selectedCard) => {
  const fragment = document.createDocumentFragment();
  adverts.forEach((advert) => {
    if (selectedCard === advert.offer.title) {
      fragment.appendChild(renderCard(advert));
    }
  });
  map.insertBefore(fragment, mapFilter);
};

const renderFilteredPins = (filteredAdverts) => {
  window.utils.removeArray(Array.from(map.querySelectorAll(`.map__pin:not(.map__pin--main)`)));
  renderAllPins(filteredAdverts);
};

window.elementsRender = {
  renderPin,
  renderCard,
  renderAllPins,
  renderSelectedCard,
  renderFilteredPins
};

})();

(() => {
/*!*******************************!*\
  !*** ./js/form-validation.js ***!
  \*******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const Title = {
  MIN: 30,
  MAX: 100
};
const Message = {
  TITLE_MIN: `Значение меньше минимума символов на `,
  TITLE_MAX: `Превышение максимума символов на `,
  PRICE_MIN: `Цена меньше минимума на `,
  PRICE_MAX: `Цена превышает максимум на `
};
const MinPrice = {
  BUNGALOW: `0`,
  FLAT: `1 000`,
  HOUSE: `5 000`,
  PALACE: `10 000`,
};
const MAXPRICE = 1000000;
const advertForm = document.querySelector(`.ad-form`);
const roomsSelect = advertForm.querySelector(`[name='rooms']`);
const guestsSelect = advertForm.querySelector(`[name='capacity']`);
const titleInput = advertForm.querySelector(`[name='title']`);
const typeSelect = advertForm.querySelector(`[name='type']`);
const priceInput = advertForm.querySelector(`[name='price']`);
const checkInSelect = advertForm.querySelector(`[name='timein']`);
const checkOutSelect = advertForm.querySelector(`[name='timeout']`);

const checkLimit = (input, value, min, max, messageMin, massageMax) => {
  if (value < min) {
    input.setCustomValidity(messageMin + (min - value));
  } else if (value > max) {
    input.setCustomValidity(massageMax + (value - max));
  } else {
    input.setCustomValidity(``);
  }
  input.reportValidity();
};

const onTitleEnter = () =>
  checkLimit(titleInput, titleInput.value.length, Title.MIN, Title.MAX, Message.TITLE_MIN, Message.TITLE_MAX);

const getMinPrice = () =>
  parseInt(MinPrice[typeSelect.value.toUpperCase()].replace(` `, ``), 10);

const onPriceEnter = () =>
  checkLimit(priceInput, priceInput.value, getMinPrice(), MAXPRICE, Message.PRICE_MIN, Message.PRICE_MAX);

const onTypeChange = () => {
  priceInput.placeholder = MinPrice[typeSelect.value.toUpperCase()];
};

const onCheckInOutChange = (timeSelected, timeToChange) => {
  timeToChange.value = timeSelected.value;
};

const getGuestsLimit = (rooms) => rooms <= 3 ? Array.from({length: rooms}, (x, i) => i + 1) : [0];

const validateGuests = (rooms, guests) => {
  if (getGuestsLimit(rooms).includes(0) && guests !== 0) {
    guestsSelect.setCustomValidity(`Данное помещение не преднозначено для гостей`);
  } else if (!getGuestsLimit(rooms).includes(guests)) {
    guestsSelect.setCustomValidity(`Максимально возможное количество гостей в данном помещении: ${rooms}`);
  } else {
    guestsSelect.setCustomValidity(``);
  }
  guestsSelect.reportValidity();
};

const onRoomsOrGuestsChange = () => {
  const rooms = parseInt(roomsSelect.options[roomsSelect.selectedIndex].value, 10);
  const guests = parseInt(guestsSelect.options[guestsSelect.selectedIndex].value, 10);
  validateGuests(rooms, guests);
};

const onSubmitButtonClick = () => {
  onTitleEnter();
  onTypeChange();
  onPriceEnter();
  onCheckInOutChange(checkInSelect, checkOutSelect);
  onRoomsOrGuestsChange();
};

window.formValidation = {
  onTitleEnter,
  onTypeChange,
  onPriceEnter,
  onCheckInOutChange,
  onRoomsOrGuestsChange,
  onSubmitButtonClick
};

})();

(() => {
/*!****************************!*\
  !*** ./js/photo-upload.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const FILE_TYPES = [`jpg`, `jpeg`, `png`];
const DEFAULT_AVATAR = `img/muffin-grey.svg`;
const PREVIEW_ELEMENT = {
  TAG: `img`,
  WIDTH: `70`,
  HEIGHT: `70`
};
const advertForm = document.querySelector(`.ad-form`);
const avatarChooser = advertForm.querySelector(`.ad-form-header__input`);
const avatarPreview = advertForm.querySelector(`.ad-form-header__preview img`);
const photoChooser = advertForm.querySelector(`.ad-form__input[type='file']`);
const photoPreview = advertForm.querySelector(`.ad-form__photo`);

const uploadImgFile = (imgChooser, preview) => {
  const img = imgChooser.files[0];
  const imgName = img.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return imgName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      if (preview.tagName === `IMG`) {
        preview.src = reader.result;
      } else {
        const previewElement = document.createElement(PREVIEW_ELEMENT.TAG);
        previewElement.src = reader.result;
        previewElement.width = PREVIEW_ELEMENT.WIDTH;
        previewElement.height = PREVIEW_ELEMENT.HEIGHT;
        preview.appendChild(previewElement);
      }
    });

    reader.readAsDataURL(img);
  }
};

const resetPreview = () => {
  avatarPreview.src = DEFAULT_AVATAR;
  if (photoPreview.querySelector(`img`)) {
    photoPreview.querySelector(`img`).remove();
  }
};

avatarChooser.addEventListener(`change`, () => {
  uploadImgFile(avatarChooser, avatarPreview);
});

photoChooser.addEventListener(`change`, () => {
  uploadImgFile(photoChooser, photoPreview);
});

window.photoUpload = {
  reset: resetPreview
};

})();

(() => {
/*!************************!*\
  !*** ./js/pin-move.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const PIN_SIZE = {
  WIDTH: 65,
  HEIGHT: 84
};
const map = document.querySelector(`.map`);
const margin = map.getBoundingClientRect().x;
const Adjustment = {
  X: Math.round(PIN_SIZE.WIDTH / 2),
  Y: PIN_SIZE.HEIGHT
};
const MOVE_X_LIMIT = {
  MIN: 0 - Adjustment.X,
  MAX: map.offsetWidth - Adjustment.X
};
const MOVE_Y_LIMIT = {
  MIN: 130 - Adjustment.Y,
  MAX: 630 - Adjustment.Y
};
const mainPin = map.querySelector(`.map__pin--main`);
const advertForm = document.querySelector(`.ad-form`);
const addressInput = advertForm.querySelector(`[name='address']`);
const DEFAULT_POSITION = {
  X: mainPin.offsetLeft,
  Y: mainPin.offsetTop
};

const setCoords = (property, limitMin, limitMax, pinEndCoords) => {
  if (pinEndCoords < limitMin) {
    mainPin.style[property] = limitMin + `px`;
  } else if (pinEndCoords > limitMax ) {
    mainPin.style[property] = limitMax + `px`;
  } else {
    mainPin.style[property] = pinEndCoords + `px`;
  }
};

const setDefualtPosition = () => {
  mainPin.style.left = `${DEFAULT_POSITION.X}` + `px`;
  mainPin.style.top = `${DEFAULT_POSITION.Y}` + `px`;
};

const setAddress = () => {
  const x = mainPin.offsetLeft + Adjustment.X;
  const y = mainPin.offsetTop + Adjustment.Y;
  addressInput.value = `${x}, ${y}`;
};

const onMouseDown = (evt) => {
  evt.preventDefault();

  const mouseStartCoords = {
    x: evt.clientX,
    y: evt.pageY
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const move = {
      x: mouseStartCoords.x - moveEvt.clientX,
      y: mouseStartCoords.y - moveEvt.pageY
    };

    mouseStartCoords.x = moveEvt.clientX;
    mouseStartCoords.y = moveEvt.pageY;

    const pinEndCoords = {
      x: mainPin.offsetLeft - move.x,
      y: mainPin.offsetTop - move.y
    };

    setCoords(`left`, MOVE_X_LIMIT.MIN, MOVE_X_LIMIT.MAX, pinEndCoords.x);
    setCoords(`top`, MOVE_Y_LIMIT.MIN, MOVE_Y_LIMIT.MAX, pinEndCoords.y);

    setAddress();
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();
    setAddress();
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};

window.pinMove = {
  move: onMouseDown,
  setAddress,
  setDefualtPosition
};

})();

(() => {
/*!******************************!*\
  !*** ./js/filter-adverts.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const Price = {
  LOW: 10000,
  HIGH: 50000
};
const INITIAL_SELECT_INDEX = 0;
const type = document.querySelector(`[name='housing-type']`);
const price = document.querySelector(`[name='housing-price']`);
const roomNumber = document.querySelector(`[name='housing-rooms']`);
const guestNumber = document.querySelector(`[name='housing-guests']`);

const doesPriceMatch = (advert, selectedPrice) => {
  return (selectedPrice === `low` && advert.offer.price < Price.LOW)
  || (selectedPrice === `middle` && advert.offer.price >= Price.LOW && advert.offer.price <= Price.HIGH)
  || (selectedPrice === `high` && advert.offer.price > Price.HIGH);
};

const doFeaturesMatch = (advert, selectedFeatures) => {
  let featuresApplicable = true;
  const advertFeatures = Array.from(advert.offer.features);
  selectedFeatures.forEach((feature) => {
    if (!advertFeatures.includes(feature.value)) {
      featuresApplicable = false;
    }
  });
  return featuresApplicable;
};

const isSuitable = (advert) => {
  const selectedPrice = price.value;
  const selectedType = type.value;
  const selectedRoomNumber = parseInt(roomNumber.value, 10);
  const selectedGuestNumber = parseInt(guestNumber.value, 10);
  const selectedFeatures = Array.from(document.querySelectorAll(`[name='features']:checked`));

  return (advert.offer.type === selectedType || type.value === `any`) &&
  (advert.offer.rooms === selectedRoomNumber || roomNumber.value === `any`) &&
  (advert.offer.guests === selectedGuestNumber || guestNumber.value === `any`) &&
  (doesPriceMatch(advert, selectedPrice) || price.value === `any`) &&
  (doFeaturesMatch(advert, selectedFeatures));
};

const getFilteredList = () => {
  let filteredList = [];
  for (let i = 0; i < window.advertsList.length; i++) {
    if (isSuitable(window.advertsList[i])) {
      filteredList.push(window.advertsList[i]);
    }
    if (filteredList.length === 5) {
      break;
    }
  }
  return filteredList;
};

const resetFilter = () => {
  type.selectedIndex = INITIAL_SELECT_INDEX;
  price.selectedIndex = INITIAL_SELECT_INDEX;
  roomNumber.selectedIndex = INITIAL_SELECT_INDEX;
  guestNumber.selectedIndex = INITIAL_SELECT_INDEX;
  Array.from(document.querySelectorAll(`[name='features']:checked`))
    .forEach((selectedFeature) => {
      selectedFeature.checked = false;
    });
};

window.filterAdverts = {
  getFilteredList,
  resetFilter
};

})();

(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const Key = {
  ENTER: `Enter`,
  ESC: `Escape`
};
const advertForm = document.querySelector(`.ad-form`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const titleInput = advertForm.querySelector(`[name='title']`);
const typeSelect = advertForm.querySelector(`[name='type']`);
const priceInput = advertForm.querySelector(`[name='price']`);
const roomsSelect = advertForm.querySelector(`[name='rooms']`);
const guestsSelect = advertForm.querySelector(`[name='capacity']`);
const checkInSelect = advertForm.querySelector(`[name='timein']`);
const checkOutSelect = advertForm.querySelector(`[name='timeout']`);
const resetButton = advertForm.querySelector(`.ad-form__reset`);
const filterByType = document.querySelector(`[name='housing-type']`);
const filterByPrice = document.querySelector(`[name='housing-price']`);
const filterByRooms = document.querySelector(`[name='housing-rooms']`);
const filterByGuests = document.querySelector(`[name='housing-guests']`);
const filtersByFeatures = Array.from(document.querySelectorAll(`[name='features']`));
const pins = document.querySelector(`.map__pins`);
const submitButton = advertForm.querySelector(`.ad-form__submit`);

const onSuccesUpload = () => {
  window.messageHandler.show(`success`);
  window.pageMode.reset();
  window.pageMode.deactivate();
};

const onFailedUpload = () => {
  window.messageHandler.show(`error`);
};

const filterChangeHandler = window.debounce(() => {
  if (document.querySelector(`.map__card`)) {
    window.cardPopup.close();
  }
  const filteredAdverts = window.filterAdverts.getFilteredList();
  window.elementsRender.renderFilteredPins(filteredAdverts);
});

window.pageMode.deactivate();

mapPinMain.addEventListener(`mousedown`, (evt) => {
  return window.pinMove.move(evt);
});

pins.addEventListener(`click`, (evt) => {
  const target = evt.target;
  const targetParent = target.parentNode;
  if (targetParent.classList.contains(`map__pin`) && !targetParent.classList.contains(`map__pin--main`)) {
    evt.preventDefault();
    window.cardPopup.close();
    window.cardPopup.open(target.alt);
  }
});

pins.addEventListener(`keydown`, (evt) => {
  const target = evt.target;
  if (evt.key === Key.ENTER && !target.classList.contains(`map__pin--main`)) {
    evt.preventDefault();
    window.cardPopup.close();
    window.cardPopup.open(target.querySelector(`img`).alt);
  }
}, true);

titleInput.addEventListener(`input`, window.formValidation.onTitleEnter);

typeSelect.addEventListener(`change`, window.formValidation.onTypeChange);

priceInput.addEventListener(`input`, window.formValidation.onPriceEnter);

checkInSelect.addEventListener(`change`, () => {
  return window.formValidation.onCheckInOutChange(checkInSelect, checkOutSelect);
});

checkOutSelect.addEventListener(`change`, () => {
  return window.formValidation.onCheckInOutChange(checkOutSelect, checkInSelect);
});

guestsSelect.addEventListener(`change`, window.formValidation.onRoomsOrGuestsChange);

roomsSelect.addEventListener(`change`, window.formValidation.onRoomsOrGuestsChange);

submitButton.addEventListener(`click`, window.formValidation.onSubmitButtonClick);

submitButton.addEventListener(`keydown`, window.utils.invokeIfKeyIs(Key.ENTER, window.formValidation.onSubmitButtonClick));

advertForm.addEventListener(`submit`, (evt) => {
  const advertData = new FormData(advertForm);
  window.backend.upload(onSuccesUpload, onFailedUpload, advertData);
  evt.preventDefault();
});

resetButton.addEventListener(`click`, () => {
  window.pageMode.reset();
  window.pageMode.deactivate();
});

filterByType.addEventListener(`change`, filterChangeHandler);
filterByPrice.addEventListener(`change`, filterChangeHandler);
filterByRooms.addEventListener(`change`, filterChangeHandler);
filterByGuests.addEventListener(`change`, filterChangeHandler);
filtersByFeatures.forEach((feature) => feature.addEventListener(`change`, filterChangeHandler));

})();

(() => {
/*!**************************!*\
  !*** ./js/card-popup.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const Key = {
  ENTER: `Enter`,
  ESC: `Escape`
};

const onPopupOpen = (targetPinName) => {
  window.elementsRender.renderSelectedCard(Array.from(window.advertsList), targetPinName);
  document.querySelector(`img[alt='${targetPinName}']`).classList.add(`map__pin--active`);
  document.addEventListener(`keydown`, window.utils.invokeIfKeyIs(Key.ESC, onPopupClose));
  document.querySelector(`.popup__close`).addEventListener(`click`, onPopupClose);
};

const onPopupClose = () => {
  const card = document.querySelector(`.map__card`);
  const pin = document.querySelector(`.map__pin--active`);
  if (card) {
    card.remove();
    pin.classList.remove(`map__pin--active`);
  }
  document.removeEventListener(`keydown`, () => {
    return window.utils.invokeIfKeyIs(Key.ESC, onPopupClose);
  });
};

window.cardPopup = {
  open: onPopupOpen,
  close: onPopupClose
};

})();

/******/ })()
;