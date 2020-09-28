'use strict';

const AVATAR_NUMBER = [1, 2, 3, 4, 5, 6, 7, 8];
const LISTING_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const CHECKIN_CHECKOUT = [`12:00`, `13:00`, `14:00`];
const PRICE = [1000, 2000, 3000, 4000, 5000];
const ROOMS = [1, 2, 3, 4];
const GUESTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const LISTING_NUMBER = 8;
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const pins = document.querySelector(`.map__pins`);
const map = document.querySelector(`.map`);

const getUniqueElement = (arr) => {
  const uniqueElement = arr[0];
  arr.splice(0, 1);
  return uniqueElement;
};

const getRandomElement = (min, max) => Math.floor(Math.random() * (max - min) + min);

const getRandomArray = (arr) => {
  const newArr = [];
  const newArrLength = getRandomElement(1, arr.length - 1);
  for (let i = 0; i < newArrLength; i++) {
    newArr.push(arr[i]);
  }
  return newArr;
};

const createListing = () => ({
  author: {
    avatar: `img/avatars/user0${getUniqueElement(AVATAR_NUMBER)}.png`
  },
  offer: {
    title: `Lorem ipsum`,
    address: `500, 300`,
    price: PRICE[getRandomElement(0, PRICE.length - 1)],
    type: LISTING_TYPE[getRandomElement(0, LISTING_TYPE.length - 1)],
    rooms: ROOMS[getRandomElement(0, ROOMS.length - 1)],
    guests: GUESTS[getRandomElement(0, GUESTS.length - 1)],
    checkin: CHECKIN_CHECKOUT[getRandomElement(0, CHECKIN_CHECKOUT.length - 1)],
    checkout: CHECKIN_CHECKOUT[getRandomElement(0, CHECKIN_CHECKOUT.length - 1)],
    feutures: getRandomArray(FEATURES),
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere libero a velit hendrerit mattis.`,
    photos: getRandomArray(PHOTOS),
    location: {
      x: getRandomElement(0, map.offsetWidth),
      y: getRandomElement(130, 650)
    }
  }
});

const createListingArray = (listingNumber) => {
  const listings = [];
  for (let i = 0; i < listingNumber; i++) {
    listings.push(createListing());
  }
  return listings;
};

const renderPin = (listing) => {
  const pinElement = pinTemplate.cloneNode(true);
  pinElement.style = `top: ${listing.offer.location.y + pinElement.offsetHeight / 2}px; left: ${listing.offer.location.x + pinElement.offsetWidth / 2}px`;
  pinElement.querySelector(`img`).src = `${listing.author.avatar}`;
  pinElement.querySelector(`img`).alt = `${listing.offer.title}`;
  return pinElement;
};

const renderPins = (listings) => {
  const fragment = document.createDocumentFragment();
  listings.map(renderPin).forEach((renderedPin) => fragment.appendChild(renderedPin));
  pins.appendChild(fragment);
};

const listings = createListingArray(LISTING_NUMBER);

renderPins(listings);

map.classList.remove(`map--faded`);
