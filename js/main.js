'use strict';

const Key = {
  ENTER: `Enter`,
  ESC: `Escape`
};
const Mouse = {
  LEFT_BUTTON: 0,
};
const advertForm = document.querySelector(`.ad-form`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const titleInput = advertForm.querySelector(`[name='title']`);
const typeSelect = advertForm.querySelector(`[name='type']`);
const priceInput = advertForm.querySelector(`[name='price']`);
const roomsSelect = advertForm.querySelector(`[name='rooms']`);
const guestsSelect = advertForm.querySelector(`[name='capacity']`);
const checkInSelect = advertForm.querySelector(`[name='timein']`);
const checkOutSelect = advertForm.querySelector(`[name='timeout']`);
const resetButton = advertForm.querySelector(`.ad-form__reset`);
const filterByType = document.querySelector(`[name='housing-type']`);
const filterByPrice = document.querySelector(`[name='housing-price']`);
const filterByRooms = document.querySelector(`[name='housing-rooms']`);
const filterByGuests = document.querySelector(`[name='housing-guests']`);
const filtersByFeatures = Array.from(document.querySelectorAll(`[name='features']`));
const pins = document.querySelector(`.map__pins`);
const submitButton = document.querySelector(`.ad-form__submit`);

const onSuccessDownload = (adverts) => {
  window.advertsList = adverts;
};

const onSuccesUpload = () => {
  window.messageHandler.show(`success`);
  window.pageMode.reset();
  window.pageMode.deactivate();
};

const onFailedUpload = () => {
  window.messageHandler.show(`error`);
};

const filterHandler = window.debounce(function () {
  if (document.querySelector(`.map__card`)) {
    window.cardPopup.close();
  }
  const filteredAdverts = window.filterAdverts.getFilteredList();
  window.elementsRender.renderFilteredPins(filteredAdverts);
});

window.pageMode.deactivate();

window.backend.download(onSuccessDownload, window.messageHandler.onDownloadError);

mapPinMain.addEventListener(`mousedown`, function (evt) {
  return window.pinMove.move(evt);
});

pins.addEventListener(`click`, function (evt) {
  const target = evt.target;
  const targetParent = target.parentNode;
  if (targetParent.classList.contains(`map__pin`) && !targetParent.classList.contains(`map__pin--main`)) {
    evt.preventDefault();
    window.cardPopup.close();
    window.cardPopup.open(target.alt);
  }
});

pins.addEventListener(`keydown`, function (evt) {
  const target = evt.target;
  if (evt.key === Key.ENTER && !target.classList.contains(`map__pin--main`)) {
    evt.preventDefault();
    window.cardPopup.close();
    window.cardPopup.open(target.querySelector(`img`).alt);
  }
}, true);

titleInput.addEventListener(`input`, window.formValidation.onTitleEnter);

typeSelect.addEventListener(`change`, window.formValidation.onTypeChange);

priceInput.addEventListener(`input`, window.formValidation.onPriceEnter);

checkInSelect.addEventListener(`change`, function () {
  return window.formValidation.onCheckInOutChange(checkInSelect, checkOutSelect);
});

checkOutSelect.addEventListener(`change`, function () {
  return window.formValidation.onCheckInOutChange(checkOutSelect, checkInSelect);
});

guestsSelect.addEventListener(`change`, window.formValidation.onRoomsOrGuestsChange);

roomsSelect.addEventListener(`change`, window.formValidation.onRoomsOrGuestsChange);

submitButton.addEventListener(`click`, window.formValidation.onSubmitButtonClick);

submitButton.addEventListener(`keydown`, window.utils.invokeIfKeyIs(Key.ENTER, window.formValidation.onSubmitButtonClick));

advertForm.addEventListener(`submit`, function (evt) {
  const advertData = new FormData(advertForm);
  window.backend.upload(onSuccesUpload, onFailedUpload, advertData);
  evt.preventDefault();
});

resetButton.addEventListener(`click`, function () {
  window.pageMode.reset();
  window.pageMode.deactivate();
});

filterByType.addEventListener(`change`, filterHandler);
filterByPrice.addEventListener(`change`, filterHandler);
filterByRooms.addEventListener(`change`, filterHandler);
filterByGuests.addEventListener(`change`, filterHandler);
filtersByFeatures.forEach((feature) => feature.addEventListener(`change`, filterHandler));
