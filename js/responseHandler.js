'use strict';

(function () {
  const pins = document.querySelector(`.map__pins`);

  const onDownloadSuccess = (adverts) => {
    const fragment = document.createDocumentFragment();
    adverts.map(window.pinRender.render).forEach((renderedPin) => fragment.appendChild(renderedPin));
    pins.appendChild(fragment);
  }
  // const renderPins = (adverts) => {
  //   const fragment = document.createDocumentFragment();
  //   adverts.map(renderPin).forEach((renderedPin) => fragment.appendChild(renderedPin));
  //   pins.appendChild(fragment);
  // };

  const onDownloadError = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 10; margin: 0 auto; padding: 50px; text-align: center; color: red; background-color: blue`;
    node.style.position = `absolute`;
    node.style.top = 0;
    node.style.left = 0;
    node.style.fontSize = `24px`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  }

  window.responseHandler = {
    onDownloadSuccess,
    onDownloadError
  }

})();
