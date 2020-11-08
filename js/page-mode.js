'use strict';

const map = document.querySelector(`.map`);
const advertForm = document.querySelector(`.ad-form`);
const advertFormElements = Array.from(advertForm.querySelectorAll(`.ad-form__element, .ad-form-header`));
const advertFormAvatar = document.querySelector(`.ad-form-header`);
const mapFilters = Array.from(document.querySelectorAll(`.map__filter`));
const mapCheckboxes = Array.from(document.querySelectorAll(`.map__checkbox`));
const mapPinMain = document.querySelector(`.map__pin--main`);

const setElementsEnabled = (elements, enabled) => {
  elements.forEach(function (element) {
    element.disabled = !enabled;
  });
};

const deactivatePage = () => {
  setElementsEnabled(advertFormElements, false);
  setElementsEnabled(mapFilters, false);
  setElementsEnabled(mapCheckboxes, false);
  map.classList.add(`map--faded`);
  advertForm.classList.add(`ad-form--disabled`);
  window.pinMove.setDefualtPosition();
  window.pinMove.setAddress();
};

const activatePage = () => {
  map.classList.remove(`map--faded`);
  advertForm.classList.remove(`ad-form--disabled`);

  if (document.querySelector(`.map__pin:not(.map__pin--main)`)) {
    setElementsEnabled(mapFilters, true);
  }

  setElementsEnabled(advertFormElements, true);
  setElementsEnabled(mapCheckboxes, true);

  mapPinMain.removeEventListener(`mousedown`, activatePage);
};

window.pageMode = {
  activate: activatePage,
  deactivate: deactivatePage
};
