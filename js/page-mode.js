'use strict';

const Mouse = {
  LEFT_BUTTON: 0,
};
const Key = {
  ENTER: `Enter`,
  ESC: `Escape`
};
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
  window.pinMove.setAddress();
  mapPinMain.addEventListener(`mousedown`, activateOnMousedown);
  mapPinMain.addEventListener(`keydown`, activateOnKeydown);
};

const activatePage = () => {
  window.elementsRender.allPins(window.advertsList);
  map.classList.remove(`map--faded`);
  advertForm.classList.remove(`ad-form--disabled`);
  if (document.querySelector(`.map__pin:not(.map__pin--main)`)) {
    setElementsEnabled(mapFilters, true);
  }
  setElementsEnabled(advertFormElements, true);
  setElementsEnabled(mapCheckboxes, true);
  mapPinMain.removeEventListener(`mousedown`, activateOnMousedown);
  mapPinMain.removeEventListener(`keydown`, activateOnKeydown);
};

const activateOnMousedown = window.utils.invokeIfButtonIs(Mouse.LEFT_BUTTON, activatePage);
const activateOnKeydown = window.utils.invokeIfKeyIs(Key.ENTER, activatePage);

const resetPage = () => {
  window.filterAdverts.reset();
  window.pinMove.setDefualtPosition();
  window.utils.removeArray(Array.from(document.querySelectorAll(`.map__pin:not(.map__pin--main)`)));
  window.cardPopup.close();
}

window.pageMode = {
  activate: activatePage,
  deactivate: deactivatePage,
  reset: resetPage,
};
