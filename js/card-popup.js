'use strict';

const Key = {
  ENTER: `Enter`,
  ESC: `Escape`
};

const onPopupOpen = (targetPinName) => {
  window.elementsRender.renderSelectedCard(Array.from(window.advertsList), targetPinName);
  document.querySelector(`img[alt='${targetPinName}']`).classList.add(`map__pin--active`);
  document.addEventListener(`keydown`, window.utils.invokeIfKeyIs(Key.ESC, onPopupClose));
  document.querySelector(`.popup__close`).addEventListener(`click`, onPopupClose);
};

const onPopupClose = () => {
  const card = document.querySelector(`.map__card`);
  const pin = document.querySelector(`.map__pin--active`);
  if (card) {
    card.remove();
    pin.classList.remove(`map__pin--active`);
  }
  document.removeEventListener(`keydown`, () => {
    return window.utils.invokeIfKeyIs(Key.ESC, onPopupClose);
  });
};

window.cardPopup = {
  open: onPopupOpen,
  close: onPopupClose
};
