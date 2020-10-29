'use strict';

(function () {
  const getFilterByPropertyType = (selectedType) => {
    let filteredArray = []
    if (selectedType === `any`) {
      filteredArray = window.advertsList;
      console.log(filteredArray);
    } else {
      window.advertsList.forEach((advert) => advert.offer.type === selectedType && filteredArray.push(advert));
    }
    return filteredArray;
  }

  window.filterAdverts = {
    byType: getFilterByPropertyType
  }
})();
