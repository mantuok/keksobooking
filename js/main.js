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

  mapPinMain.addEventListener(`mousedown`, function (evt) {
    return evt.button === Mouse.LEFT_BUTTON && window.pageMode.activate();
  });

  mapPinMain.addEventListener(`keydown`, window.utils.invokeIfKeyIs(Key.ENTER, window.pageMode.activate));

  window.pageMode.deactivate();

  window.pinRender.render(window.advertGeneration.adverts);

  guestsSelect.addEventListener(`change`, window.formValidation.onRoomsOrGuestsChange);

  roomsSelect.addEventListener(`change`, window.formValidation.onRoomsOrGuestsChange);
})();
