'use strict';

(function () {
  const uploadSuccessMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const advertForm = document.querySelector(`.ad-form`);

  const onError = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 10; display: flex; justify-content: center; align-items: center; width: 500px; height: 200px; padding: 30px 30px; text-align: center; color: #f5463c; background-color: #d4d4d4; border-radius: 5px; box-shadow: 0px 0px 6px grey`;
    node.style.position = `fixed`;
    node.style.top = `calc(50% - 100px)`;
    node.style.left = `calc(50% - 250px)`;
    node.style.fontSize = `24px`;
    node.style.fontWeight = `700`;
    node.style.fontFamily = `Roboto, Arial, sans-serif`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const onUpload = () => {
    const fragment = document.createDocumentFragment();
    const uploadSuccessMessage = uploadSuccessMessageTemplate.cloneNode(true);
    fragment.appendChild(uploadSuccessMessage);
    advertForm.appendChild(fragment);
  }

  window.messageHandler = {
    onError,
    onUpload
  };
})();
