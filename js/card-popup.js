'use strict';

(function () {
  const Key = {
    ENTER: `Enter`,
    ESC: `Escape`
  };

  const openPopup = (targetPinName) => {
    window.elementsRender.selectedCard(Array.from(window.advertsList), targetPinName);
    document.addEventListener(`keydown`, window.utils.invokeIfKeyIs(Key.ESC, closePopup));
    document.querySelector(`.popup__close`).addEventListener(`click`, closePopup);
  }

  const closePopup = () => {
    const card = document.querySelector(`.map__card`);
    card && card.remove();
    document.removeEventListener(`keydown`, function () {return window.utils.invokeIfKeyIs(Key.ESC, closePopup)});
  }

  window.cardPopup = {
    open: openPopup,
    close: closePopup
  }
})();
