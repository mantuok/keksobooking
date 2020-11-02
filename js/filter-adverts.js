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

  const checkPrice = (advert, selectedPrice) => {
    return (selectedPrice === `low` && advert.offer.price < Price.LOW)
    || (selectedPrice === `middle` && advert.offer.price >= Price.LOW && advert.offer.price <= Price.HIGH)
    || (selectedPrice === `high` && advert.offer.price > Price.HIGH);
  };

  const checkFeatures = (advert, feature) => {
    console.log(feature);
    return Array.from(advert.offer.features).includes(feature);
  };


  const getFilterRank = (advert) => {
    const selectedPrice = price.value;
    const selectedType = type.value;
    const selectedRoomNumber = parseInt(roomNumber.value, 10);
    const selectedGuestNumber = parseInt(guestNumber.value, 10);
    const selectedFeatures = Array.from(document.querySelectorAll(`[name='features']:checked`));

    let rank = 0;

    advert.offer.type === selectedType && rank++;
    advert.offer.rooms === selectedRoomNumber && rank++;
    advert.offer.guests === selectedGuestNumber && rank++;

    checkPrice(advert, selectedPrice) && rank++;

    for (let i = 0; i < selectedFeatures.length; i++) {
      checkFeatures(advert, selectedFeatures[i].value) && rank++;
    };

    console.log(rank);
    // return rank;
  }

  const getFilterByPropertyType = (selectedType) => {
    let filteredArray = [];

    if (selectedType === `any`) {
      filteredArray = window.advertsList;
    } else {
      window.advertsList.forEach((advert) => advert.offer.type === selectedType && filteredArray.push(advert));
      getFilterRank(window.advertsList[0], selectedType);
    }
    return filteredArray;
  };

  window.filterAdverts = {
    byType: getFilterByPropertyType
  };
})();
