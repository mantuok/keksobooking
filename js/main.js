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
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const pins = document.querySelector(`.map__pins`);
const map = document.querySelector(`.map`);

const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];

const getRandomArray = (arr) => arr.slice(getRandom(0, arr.length / 2), getRandom(arr.length / 2 + 1, arr.length - 1));

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

const adverts = generateAdverts(ADVERT_NUMBER);

renderPins(adverts);

map.classList.remove(`map--faded`);
