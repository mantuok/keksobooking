'use strict';

const Key = {
  ESC: `Escape`,
  ENTER: `Enter`
};
const uploadSuccessMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const uploadFailedMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

const renderMessage = (status) => {
  const fragment = document.createDocumentFragment();
  let newMessage = ``;
  if (status === `success`) {
    newMessage = uploadSuccessMessageTemplate.cloneNode(true);
  } else {
    newMessage = uploadFailedMessageTemplate.cloneNode(true);
  }
  fragment.appendChild(newMessage);
  document.querySelector(`main`).appendChild(fragment);
};

const onDownloadError = (errorMessage) => {
  renderMessage(`error`);
  document.querySelector(`.error__message`).textContent = errorMessage;
  document.addEventListener(`click`, onMessageClose);
  document.addEventListener(`keydown`, onEscKeydown);
};

const onMessageOpen = (status) => {
  renderMessage(`${status}`);
  document.addEventListener(`click`, onMessageClose);
  document.addEventListener(`keydown`, onEscKeydown);
  if (document.querySelector(`.error__button`)) {
    document.querySelector(`.error__button`).addEventListener(`click`, onMessageClose);
  }
};

const onMessageClose = () => {
  if (document.querySelector(`.success`)) {
    document.querySelector(`.success`).remove();
  } else {
    document.querySelector(`.error`).remove();
  }
  document.removeEventListener(`click`, onMessageClose);
  document.removeEventListener(`keydown`, onEscKeydown);
};

const onEscKeydown = window.utils.invokeIfKeyIs(Key.ESC, onMessageClose);

window.messageHandler = {
  onDownloadError,
  show: onMessageOpen
};
