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
  const map = document.querySelector(`.map`);
  const mapFilter = document.querySelector(`.map__filters-container`);

  const onDownloadSuccess = (adverts) => {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(window.elementsRender.card(adverts[0]));
    map.insertBefore(fragment, mapFilter);
    window.elementsRender.allElements(adverts, window.elementsRender.pin, pins);
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
