'use strict';

const Title = {
  MIN: 30,
  MAX: 100
};
const Message = {
  TITLE_MIN: `Значение меньше минимума символов на `,
  TITLE_MAX: `Превышение максимума символов на `,
  PRICE_MIN: `Цена меньше минимума на `,
  PRICE_MAX: `Цена превышает максимум на `
};
const MinPrice = {
  BUNGALOW: `0`,
  FLAT: `1 000`,
  HOUSE: `5 000`,
  PALACE: `10 000`,
};
const MAXPRICE = 1000000;
const advertForm = document.querySelector(`.ad-form`);
const roomsSelect = advertForm.querySelector(`[name='rooms']`);
const guestsSelect = advertForm.querySelector(`[name='capacity']`);
const titleInput = advertForm.querySelector(`[name='title']`);
const typeSelect = advertForm.querySelector(`[name='type']`);
const priceInput = advertForm.querySelector(`[name='price']`);
const checkInSelect = advertForm.querySelector(`[name='timein']`);
const checkOutSelect = advertForm.querySelector(`[name='timeout']`);

const checkLimit = (input, value, min, max, messageMin, massageMax) => {
  if (value < min) {
    input.setCustomValidity(messageMin + (min - value));
  } else if (value > max) {
    input.setCustomValidity(massageMax + (value - max));
  } else {
    input.setCustomValidity(``);
  }
  input.reportValidity();
};

const onTitleEnter = () =>
  checkLimit(titleInput, titleInput.value.length, Title.MIN, Title.MAX, Message.TITLE_MIN, Message.TITLE_MAX);

const getMinPrice = () =>
  parseInt(MinPrice[typeSelect.value.toUpperCase()].replace(` `, ``), 10);

const onPriceEnter = () =>
  checkLimit(priceInput, priceInput.value, getMinPrice(), MAXPRICE, Message.PRICE_MIN, Message.PRICE_MAX);

const onTypeChange = () => {
  priceInput.placeholder = MinPrice[typeSelect.value.toUpperCase()];
};

const onCheckInOutChange = (timeSelected, timeToChange) => {
  timeToChange.value = timeSelected.value;
};

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

const onSubmitButtonClick = () => {
  onTitleEnter();
  onTypeChange();
  onPriceEnter();
  onCheckInOutChange(checkInSelect, checkOutSelect);
  onRoomsOrGuestsChange();
};

window.formValidation = {
  onTitleEnter,
  onTypeChange,
  onPriceEnter,
  onCheckInOutChange,
  onRoomsOrGuestsChange,
  onSubmitButtonClick
};
