
'use strict';

const AVATAR_NUMBER = [1, 2, 3, 4, 5, 6, 7, 8];
const LISTING_TYPE = [palace, flat, house, bungalow];
const CHECKIN_CHECKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const PHOTOS = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];

const getAvatarNumber = () => {
  const avatarNumber = AVATAR_NUMBER[0]
  AVATAR_NUMBER.splice(0, 1);
  return avatarNumber;
}

const getRandomElement = (min, max) => Math.floor(Math.random() * (max - min) + min);

const getRandomArray = (arr) => {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i]);
  }
  return newArr;
}

const createListing = () => ({
  author: {
    avatar: `img/avatars/user${getAvatarNumber()}.png`
  },
  offer: {
    title: `Lorem ipsum`,
    address: `500, 300`,
    price: getRandomElement(1000, 5000),
    type: LISTING_TYPE[getRandomElement(0, LISTING_TYPE.length - 1)],
    rooms: getRandomElement(1, 4),
    guests: getRandomElement (1, 8),
    checkin: CHECKIN_CHECKOUT[getRandomElement(0, CHECKIN_CHECKOUT.length - 1)],
    checkout: CHECKIN_CHECKOUT[getRandomElement(0, CHECKIN_CHECKOUT.length - 1)],
    feutures: getRandomArray(FEATURES),
    descriptio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere libero a velit hendrerit mattis.`,
    photos: getRandomArray[PHOTOS],






  }

});

console.log(getAvatarNumber());
