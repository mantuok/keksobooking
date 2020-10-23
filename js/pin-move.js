'use strict';

(function () {
  const PIN_SIZE = {
    WIDTH: 65,
    HEIGHT: 88
  };
  const map = document.querySelector(`.map`);

  const tempMargin = 97
  const MOVE_X_LIMIT = {
    MIN: tempMargin,
    MAX: tempMargin + map.offsetWidth
  };
  const MOVE_Y_LIMIT = {
    MIN: 130,
    MAX: 630
  };

  const mainPin = document.querySelector(`.map__pin--main`);
  const advertForm = document.querySelector(`.ad-form`);
  const addressInput = advertForm.querySelector(`[name='address']`);

  // const getMargin = () => {
  //   const domRect = map.getBoundingClientRect()
  //   console.log(domRect);
  //   // const margin = domRect
  // }

  // getMargin();

  const checkLimit = (coords, limitMin, startCoords, limitMax) => {
    if (coords < limitMin) {
      startCoords = limitMin;
    } else if (coords > limitMax) {
      startCoords = limitMax;
    } else {
      startCoords = coords;
    }
    return startCoords;
  };

  const setAddress = () => {
    const x = Math.round(mainPin.offsetLeft + PIN_SIZE.WIDTH / 2);
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

      console.log(startCoords);

      const move = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.pageY
      };

      // checkLimit(moveEvt.x, MOVE_X_LIMIT.MIN, startCoords.x, MOVE_X_LIMIT.MAX);
      // checkLimit(moveEvt.y, MOVE_Y_LIMIT.MIN, startCoords.y, MOVE_Y_LIMIT.MAX);

      // mainPin.style.top = startCoords.y + `px`;
      // mainPin.style.left = startCoords.x + `px`;

      // console.log("map:" + map.offsetWidth)
      // console.log(`x: ${moveEvt.clientX}`)
      // console.log(`y: ${moveEvt.clientY}`)
      // console.log(map.getBoundingClientRect());
      // if (moveEvt.clientX < MOVE_X_LIMIT.MIN) {
      //   startCoords.x = MOVE_X_LIMIT.MIN;
      //   mainPin.style.left = 0 - (PIN_SIZE.WIDTH / 2);
      // } else if (moveEvt.clientX > MOVE_X_LIMIT.MAX) {
      //   startCoords.x = MOVE_X_LIMIT.MAX;
      //   mainPin.style.left = MOVE_X_LIMIT.MAX - (PIN_SIZE.WIDTH / 2);
      // } else {
      //   startCoords.x = moveEvt.clientX
      //   mainPin.style.left = (mainPin.offsetLeft - move.x) + `px`;
      // }

      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.pageY;

      if (startCoords.x < MOVE_X_LIMIT.MIN) {
        mainPin.style.left = MOVE_X_LIMIT.MIN - tempMargin - (PIN_SIZE.WIDTH / 2) + `px`;
      } else if (startCoords.x > MOVE_X_LIMIT.MAX) {
        mainPin.style.left = MOVE_X_LIMIT.MAX - tempMargin - (PIN_SIZE.WIDTH / 2)  + `px`;
      } else {
        mainPin.style.left = (mainPin.offsetLeft - move.x) + `px`;
      }

      if (startCoords.y < MOVE_Y_LIMIT.MIN) {
        mainPin.style.top = MOVE_Y_LIMIT.MIN + `px`;
      } else if (startCoords.y > MOVE_Y_LIMIT.MAX) {
        mainPin.style.top = MOVE_Y_LIMIT.MAX + `px`;
      } else {
        mainPin.style.top = (mainPin.offsetTop - move.y) + `px`;
      }

      setAddress();
    }

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      setAddress();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    }

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  }

  window.pinMove = {
    move: onMouseDown,
    setAddress
  };
})();
