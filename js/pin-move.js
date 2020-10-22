'use strict';

(function () {
  const PIN_SIZE = {
    WIDTH: 62,
    HEIGHT: 88
  };
  const mainPin = document.querySelector(`.map__pin--main`);
  const advertForm = document.querySelector(`.ad-form`);
  const addressInput = advertForm.querySelector(`[name='address']`);

  const setAddress = () => {
    const x = mainPin.offsetLeft + PIN_SIZE.WIDTH / 2;
    const y = mainPin.offsetTop + PIN_SIZE.HEIGHT;
    addressInput.value = `${x}, ${y}`;
  };

  const onMouseDown = (evt) => {
    evt.preventDefault();

    const startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      const move = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.clientY;

      mainPin.style.top = (mainPin.offsetTop - move.y) + `px`;
      mainPin.style.left = (mainPin.offsetLeft - move.x) + `px`;

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
