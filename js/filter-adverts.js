'use strict';

(function () {
  const Price = {
    LOW: 10000,
    HIGH: 50000
  }
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
      console.log(feature.value);
      if (!advertFeatures.includes(feature.value)) {
        featuresApplicable = false;
      }
    });
    console.log(featuresApplicable);
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
    (doesPriceMatch(advert, selectedPrice) || price.value === `any`)&&
    (doFeaturesMatch(advert, selectedFeatures));
  }

   const getFilteredList = () => {
    let filteredList = [];
    window.advertsList.forEach((advert) => {
      if (isSuitable(advert)) {
        filteredList.push(advert);
      }
    });
    return filteredList;
  }

  window.filterAdverts = {
    list: getFilteredList
  };
})();
