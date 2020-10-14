'use strict';

(function () {
  const advertForm = document.querySelector(`.ad-form`);
  const roomsSelect = advertForm.querySelector(`[name='rooms']`);
  const guestsSelect = advertForm.querySelector(`[name='capacity']`);


  const getGuestsLimit = (rooms) => rooms <= 3 ? Array.from({length: rooms}, (x, i) => i + 1) : [0];

  const validateGuests = (rooms, guests) => {
    if (getGuestsLimit(rooms).includes(0) && guests !== 0) {
      guestsSelect.setCustomValidity(`Данное помещение не преднозначено для гостей`);
    } else if (!getGuestsLimit(rooms).includes(guests)) {
      guestsSelect.setCustomValidity(`Максимально возможное количество гостей в данном помещении: ${rooms}`);
    } else {
      guestsSelect.setCustomValidity(``);
    }

    guestsSelect.reportValidity();
  };

  const onRoomsOrGuestsChange = () => {
    const rooms = parseInt(roomsSelect.options[roomsSelect.selectedIndex].value, 10);
    const guests = parseInt(guestsSelect.options[guestsSelect.selectedIndex].value, 10);
    validateGuests(rooms, guests);
  };

  window.formValidation = {
    onRoomsOrGuestsChange
  };
})();
