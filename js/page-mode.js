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
const filterForm = map.querySelector(`.map__filters`);
const advertFormElements = Array.from(advertForm.querySelectorAll(`.ad-form__element, .ad-form-header`));
const mapFilters = Array.from(map.querySelectorAll(`.map__filter, .map__features`));
const mapCheckboxes = Array.from(map.querySelectorAll(`.map__checkbox`));
const mapPinMain = map.querySelector(`.map__pin--main`);

const setElementsEnabled = (elements, enabled) => {
  elements.forEach((element) => {
    element.disabled = !enabled;
  });
};

const onSuccessDownload = (adverts) => {
  window.elementsRender.renderAllPins(adverts);
  window.advertsList = adverts;
};

const deactivatePage = () => {
  setElementsEnabled(advertFormElements, false);
  setElementsEnabled(mapFilters, false);
  setElementsEnabled(mapCheckboxes, false);
  map.classList.add(`map--faded`);
  filterForm.classList.add(`map__filters--disabled`);
  advertForm.classList.add(`ad-form--disabled`);
  window.pinMove.setAddress();
  mapPinMain.addEventListener(`mousedown`, onLeftButtonMousedown);
  mapPinMain.addEventListener(`keydown`, onEnterKeydown);
};

const activatePage = () => {
  window.backend.download(onSuccessDownload, window.messageHandler.onDownloadError);
  map.classList.remove(`map--faded`);
  advertForm.classList.remove(`ad-form--disabled`);
  filterForm.classList.remove(`map__filters--disabled`);
  setElementsEnabled(mapFilters, true);
  setElementsEnabled(advertFormElements, true);
  setElementsEnabled(mapCheckboxes, true);
  mapPinMain.removeEventListener(`mousedown`, onLeftButtonMousedown);
  mapPinMain.removeEventListener(`keydown`, onEnterKeydown);
};

const onLeftButtonMousedown = window.utils.invokeIfButtonIs(Mouse.LEFT_BUTTON, activatePage);
const onEnterKeydown = window.utils.invokeIfKeyIs(Key.ENTER, activatePage);

const resetPage = () => {
  advertForm.reset();
  window.photoUpload.reset();
  window.filterAdverts.resetFilter();
  window.pinMove.setDefualtPosition();
  window.pinMove.setAddress();
  window.utils.removeArray(Array.from(map.querySelectorAll(`.map__pin:not(.map__pin--main)`)));
  window.cardPopup.close();
};

window.pageMode = {
  activate: activatePage,
  deactivate: deactivatePage,
  reset: resetPage,
};
