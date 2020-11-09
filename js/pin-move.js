'use strict';

const PIN_SIZE = {
  WIDTH: 65,
  HEIGHT: 88
};
const map = document.querySelector(`.map`);
const margin = map.getBoundingClientRect().x;
const adjustment = margin + (PIN_SIZE.WIDTH / 2);
const MOVE_X_LIMIT = {
  MIN: margin,
  MAX: margin + map.offsetWidth
};
const MOVE_Y_LIMIT = {
  MIN: 130,
  MAX: 630
};
const mainPin = document.querySelector(`.map__pin--main`);
const advertForm = document.querySelector(`.ad-form`);
const addressInput = advertForm.querySelector(`[name='address']`);
const DEFAULT_POSITION = {
  X: mainPin.offsetLeft,
  Y: mainPin.offsetTop
};

const setCoords = (startCoords, property, limitMin, limitMax, endCoords, adj = 0) => {
  if (startCoords < limitMin) {
    mainPin.style[property] = limitMin - adj + `px`;
  } else if (startCoords > limitMax) {
    mainPin.style[property] = limitMax - adj + `px`;
  } else {
    mainPin.style[property] = endCoords + `px`;
  }
};

const setDefualtPosition = () => {
  mainPin.style.left = `${DEFAULT_POSITION.X}` + `px`;
  mainPin.style.top = `${DEFAULT_POSITION.Y}` + `px`;
}

const setAddress = () => {
  const x = Math.round(mainPin.offsetLeft + PIN_SIZE.WIDTH / 2 - 1);
  const y = mainPin.offsetTop + PIN_SIZE.HEIGHT;
  addressInput.value = `${x}, ${y}`;
};

const onMouseDown = (evt) => {
  evt.preventDefault();

  const startCoords = {
    x: evt.clientX,
    y: evt.pageY
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const move = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.pageY
    };

    startCoords.x = moveEvt.clientX;
    startCoords.y = moveEvt.pageY;

    const endCoords = {
      x: mainPin.offsetLeft - move.x,
      y: mainPin.offsetTop - move.y
    };

    setCoords(startCoords.x, `left`, MOVE_X_LIMIT.MIN, MOVE_X_LIMIT.MAX, endCoords.x, adjustment);
    setCoords(startCoords.y, `top`, MOVE_Y_LIMIT.MIN, MOVE_Y_LIMIT.MAX, endCoords.y);

    setAddress();
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();
    setAddress();
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};

window.pinMove = {
  move: onMouseDown,
  setAddress,
  setDefualtPosition
};
