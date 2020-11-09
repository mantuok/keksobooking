'use strict';

const Key = {
  ENTER: `Enter`,
  ESC: `Escape`
};

const onPopupOpen = (targetPinName) => {
  window.elementsRender.renderSelectedCard(Array.from(window.advertsList), targetPinName);
  document.addEventListener(`keydown`, window.utils.invokeIfKeyIs(Key.ESC, onPopupClose));
  document.querySelector(`.popup__close`).addEventListener(`click`, onPopupClose);
};

const onPopupClose = () => {
  const card = document.querySelector(`.map__card`);
  if (card) {
    card.remove();
  }
  document.removeEventListener(`keydown`, function () {
    return window.utils.invokeIfKeyIs(Key.ESC, onPopupClose);
  });
};

window.cardPopup = {
  open: onPopupOpen,
  close: onPopupClose
};
