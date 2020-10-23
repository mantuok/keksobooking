'use strict';

(function () {
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

  const pins = document.querySelector(`.map__pins`);

  const onDownloadSuccess = (adverts) => {
    window.elementsRender.allPins(adverts);
    window.advertsList = adverts;
  };

  mapPinMain.addEventListener(`mousedown`, function (evt) {
    return evt.button === Mouse.LEFT_BUTTON && window.pageMode.activate();
  });

  mapPinMain.addEventListener(`keydown`, window.utils.invokeIfKeyIs(Key.ENTER, window.pageMode.activate));

  window.pageMode.deactivate();

  window.backend.download(onDownloadSuccess, window.responseHandler.onDownloadError);

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
})();
