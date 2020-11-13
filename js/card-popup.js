'use strict';

const Key = {
  ENTER: `Enter`,
  ESC: `Escape`
};

const onPopupOpen = (targetPinName) => {
  window.elementsRender.renderSelectedCard(Array.from(window.advertsList), targetPinName);
  document.querySelector(`img[alt='${targetPinName}']`).parentNode.classList.add(`map__pin--active`);
  document.addEventListener(`keydown`, onEscKeydown);
  document.querySelector(`.popup__close`).addEventListener(`click`, onPopupClose);
};

const onPopupClose = () => {
  const card = document.querySelector(`.map__card`);
  const pin = document.querySelector(`.map__pin--active`);
  if (card) {
    card.remove();
    pin.classList.remove(`map__pin--active`);
  }
  document.removeEventListener(`keydown`, onEscKeydown);
};

const onEscKeydown = window.utils.invokeIfKeyIs(Key.ESC, onPopupClose);

window.cardPopup = {
  open: onPopupOpen,
  close: onPopupClose
};
