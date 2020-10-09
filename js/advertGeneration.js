'use strict';

(function () {
  const PROPERTY_TYPE = [`palace`, `flat`, `house`, `bungalow`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const CHECKIN_CHECKOUT = [`12:00`, `13:00`, `14:00`];
  const PHOTOS = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ];
  const ADVERT_NUMBER = 8;
  const map = document.querySelector(`.map`);

  const generateAdvert = () => {
    const location = {
      x: window.utils.getRandom(0, map.offsetWidth),
      y: window.utils.getRandom(130, 650)
    };
    return {
      author: {
        avatar: `img/avatars/user0${window.utils.getRandom(1, 8)}.png`
      },
      offer: {
        title: `Lorem ipsum`,
        address: `${location.x}, ${location.y}`,
        price: 1000,
        type: window.utils.getRandomFrom(PROPERTY_TYPE),
        rooms: 2,
        guests: 4,
        checkin: window.utils.getRandomFrom(CHECKIN_CHECKOUT),
        checkout: window.utils.getRandomFrom(CHECKIN_CHECKOUT),
        feutures: window.utils.getRandomArray(FEATURES),
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere libero a velit hendrerit mattis.`,
        photos: window.utils.getRandomArray(PHOTOS),
        location
      }};
  };

  const generateAdverts = (amount) => new Array(amount).fill(``).map(generateAdvert);

  const adverts = generateAdverts(ADVERT_NUMBER);

  window.advertGeneration = {
    adverts
  };
})();
