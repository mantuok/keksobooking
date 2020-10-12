'use strict';

(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  // const pins = document.querySelector(`.map__pins`);

  const renderPin = (advert) => {
    const pinElement = pinTemplate.cloneNode(true);
    pinElement.style = `top: ${advert.location.y + pinElement.offsetHeight / 2}px; left: ${advert.location.x + pinElement.offsetWidth / 2}px`;
    pinElement.querySelector(`img`).src = `${advert.author.avatar}`;
    pinElement.querySelector(`img`).alt = `${advert.offer.title}`;
    return pinElement;
  };

  window.pinRender = {
    render: renderPin
  };
})();
