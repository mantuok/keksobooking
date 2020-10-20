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
  const roomsSelect = advertForm.querySelector(`[name='rooms']`);
  const guestsSelect = advertForm.querySelector(`[name='capacity']`);
  const pins = document.querySelector(`.map__pins`);
  const card = document.querySelector(`.map__card`);

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

  pins.addEventListener(`click`, function(evt){
    evt.preventDefault();
    window.cardPopup.close();
    window.cardPopup.open(evt.target.alt);
  });

  pins.addEventListener(`keydown`, function(evt){
    if (evt.key === Key.ENTER) {
      evt.preventDefault();
      window.cardPopup.close();
      window.cardPopup.open(evt.target.querySelector(`img`).alt);
    }
  }, true);

  guestsSelect.addEventListener(`change`, window.formValidation.onRoomsOrGuestsChange);

  roomsSelect.addEventListener(`change`, window.formValidation.onRoomsOrGuestsChange);
})();

    // window.utils.invokeIfKeyIs(Key.ENTER, function(){
    //   console.log(evt.target.querySelector(`img`).alt);
    //   return window.cardPopup.open(evt.target.querySelector(`img`).alt)
    // });
