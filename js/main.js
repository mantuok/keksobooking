'use strict';

(function () {
  const Key = {
    ENTER: `Enter`,
  };
  const Mouse = {
    LEFT_BUTTON: 0,
  };
  const advertForm = document.querySelector(`.ad-form`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const roomsSelect = advertForm.querySelector(`[name='rooms']`);
  const guestsSelect = advertForm.querySelector(`[name='capacity']`);
  const pins = document.querySelector(`.map__pins`);

  const onDownloadSuccess = (adverts) => {
    const fragment = document.createDocumentFragment();
    adverts.map(window.pinRender.render).forEach((renderedPin) => fragment.appendChild(renderedPin));
    pins.appendChild(fragment);
  };

  mapPinMain.addEventListener(`mousedown`, function (evt) {
    return evt.button === Mouse.LEFT_BUTTON && window.pageMode.activate();
  });

  mapPinMain.addEventListener(`keydown`, window.utils.invokeIfKeyIs(Key.ENTER, window.pageMode.activate));

  window.pageMode.deactivate();

  window.backend.download(onDownloadSuccess, window.responseHandler.onDownloadError);

  guestsSelect.addEventListener(`change`, window.formValidation.onRoomsOrGuestsChange);

  roomsSelect.addEventListener(`change`, window.formValidation.onRoomsOrGuestsChange);
})();
