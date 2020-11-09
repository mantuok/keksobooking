'use strict';

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
