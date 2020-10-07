'use strict';

const PROPERTY_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const CHECKIN_CHECKOUT = [`12:00`, `13:00`, `14:00`];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const ADVERT_NUMBER = 8;
const PIN_SIZE = {
  WIDTH: 62,
  HEIGHT: 88
};
const Key = {
  ENTER: `Enter`,
};
const Mouse = {
  LEFT_BUTTON: 0,
};
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const pins = document.querySelector(`.map__pins`);
const map = document.querySelector(`.map`);
const advertForm = document.querySelector(`.ad-form`);
const advertFormElements = Array.from(advertForm.querySelectorAll(`.ad-form__element`));
const mapFilters = Array.from(document.querySelectorAll(`.map__filter`));
const mapCheckboxes = Array.from(document.querySelectorAll(`.map__checkbox`));
const mapPinMain = document.querySelector(`.map__pin--main`);
const addressInput = advertForm.querySelector(`[name='address']`);
const roomsSelect = advertForm.querySelector(`[name='rooms']`);
const guestsSelect = advertForm.querySelector(`[name='capacity']`);

const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];

const getRandomArray = (arr) => arr.slice(getRandom(0, arr.length / 2), getRandom(arr.length / 2 + 1, arr.length - 1));

const invokeIfKeyIs = (key, cb) => (evt) => evt.key === key && cb(evt);

const generateAdvert = () => {
  const location = {
    x: getRandom(0, map.offsetWidth),
    y: getRandom(130, 650)
  };
  return {
    author: {
      avatar: `img/avatars/user0${getRandom(1, 8)}.png`
    },
    offer: {
      title: `Lorem ipsum`,
      address: `${location.x}, ${location.y}`,
      price: 1000,
      type: getRandomFrom(PROPERTY_TYPE),
      rooms: 2,
      guests: 4,
      checkin: getRandomFrom(CHECKIN_CHECKOUT),
      checkout: getRandomFrom(CHECKIN_CHECKOUT),
      feutures: getRandomArray(FEATURES),
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere libero a velit hendrerit mattis.`,
      photos: getRandomArray(PHOTOS),
      location
    }};
};

const generateAdverts = (amount) => new Array(amount).fill(``).map(generateAdvert);

const renderPin = (advert) => {
  const pinElement = pinTemplate.cloneNode(true);
  pinElement.style = `top: ${advert.offer.location.y + pinElement.offsetHeight / 2}px; left: ${advert.offer.location.x + pinElement.offsetWidth / 2}px`;
  pinElement.querySelector(`img`).src = `${advert.author.avatar}`;
  pinElement.querySelector(`img`).alt = `${advert.offer.title}`;
  return pinElement;
};

const renderPins = (adverts) => {
  const fragment = document.createDocumentFragment();
  adverts.map(renderPin).forEach((renderedPin) => fragment.appendChild(renderedPin));
  pins.appendChild(fragment);
};

const setElementsEnabled = (elements, enabled) => {
  elements.forEach(function (element) {
    element.disabled = !enabled;
  });
};

const getAddress = () => {
  const x = mapPinMain.offsetLeft + PIN_SIZE.WIDTH / 2;
  const y = mapPinMain.offsetTop + PIN_SIZE.HEIGHT;
  return `${x}, ${y}`;
};

const deactivatePage = () => {
  setElementsEnabled(advertFormElements, false);
  setElementsEnabled(mapFilters, false);
  setElementsEnabled(mapCheckboxes, false);

  addressInput.value = getAddress();
};

const activatePage = () => {
  map.classList.remove(`map--faded`);
  advertForm.classList.remove(`ad-form--disabled`);

  setElementsEnabled(advertFormElements, true);
  setElementsEnabled(mapFilters, true);
  setElementsEnabled(mapCheckboxes, true);

  mapPinMain.removeEventListener(`mousedown`, activatePage);
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

mapPinMain.addEventListener(`mousedown`, function (evt) {
  return evt.button === Mouse.LEFT_BUTTON && activatePage();
});

mapPinMain.addEventListener(`keydown`, invokeIfKeyIs(Key.ENTER, activatePage));

deactivatePage();

const adverts = generateAdverts(ADVERT_NUMBER);

renderPins(adverts);

guestsSelect.addEventListener(`change`, onRoomsOrGuestsChange);
roomsSelect.addEventListener(`change`, onRoomsOrGuestsChange);
