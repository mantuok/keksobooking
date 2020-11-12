'use strict';

const PIN_SIZE = {
  WIDTH: 65,
  HEIGHT: 84
};
const map = document.querySelector(`.map`);
const Adjustment = {
  X: Math.round(PIN_SIZE.WIDTH / 2),
  Y: PIN_SIZE.HEIGHT
};
const MOVE_X_LIMIT = {
  MIN: 0 - Adjustment.X,
  MAX: map.offsetWidth - Adjustment.X
};
const MOVE_Y_LIMIT = {
  MIN: 130 - Adjustment.Y,
  MAX: 630 - Adjustment.Y
};
const mainPin = map.querySelector(`.map__pin--main`);
const advertForm = document.querySelector(`.ad-form`);
const addressInput = advertForm.querySelector(`[name='address']`);
const DEFAULT_POSITION = {
  X: mainPin.offsetLeft,
  Y: mainPin.offsetTop
};

const setCoords = (property, limitMin, limitMax, pinEndCoords) => {
  if (pinEndCoords < limitMin) {
    mainPin.style[property] = limitMin + `px`;
  } else if (pinEndCoords > limitMax) {
    mainPin.style[property] = limitMax + `px`;
  } else {
    mainPin.style[property] = pinEndCoords + `px`;
  }
};

const setDefualtPosition = () => {
  mainPin.style.left = `${DEFAULT_POSITION.X}` + `px`;
  mainPin.style.top = `${DEFAULT_POSITION.Y}` + `px`;
};

const setAddress = () => {
  const x = mainPin.offsetLeft + Adjustment.X;
  const y = mainPin.offsetTop + Adjustment.Y;
  addressInput.value = `${x}, ${y}`;
};

const onMouseDown = (evt) => {
  evt.preventDefault();

  const mouseStartCoords = {
    x: evt.clientX,
    y: evt.pageY
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const move = {
      x: mouseStartCoords.x - moveEvt.clientX,
      y: mouseStartCoords.y - moveEvt.pageY
    };

    mouseStartCoords.x = moveEvt.clientX;
    mouseStartCoords.y = moveEvt.pageY;

    const pinEndCoords = {
      x: mainPin.offsetLeft - move.x,
      y: mainPin.offsetTop - move.y
    };

    setCoords(`left`, MOVE_X_LIMIT.MIN, MOVE_X_LIMIT.MAX, pinEndCoords.x);
    setCoords(`top`, MOVE_Y_LIMIT.MIN, MOVE_Y_LIMIT.MAX, pinEndCoords.y);

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
