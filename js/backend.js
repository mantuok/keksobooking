'use strict';

(function () {
  const TIMEOUT_MS = 1000;
  const StatusCode = {
    OK: 200
  };
  const Method = {
    GET: `GET`,
    POST: `POST`
  };
  const Url = {
    DOWNLOAD: `https://21.javascript.pages.academy/keksobooking/data`,
    UPLOAD: `https://21.javascript.pages.academy/keksobooking`
  };
  const advertForm = document.querySelector(`.ad-form`);

  const sendRequest = (onSuccess, onError, method, URL, data) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        xhr.onError(`Произошла ошибка ` + xhr.status + xhr.statusText);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + TIMEOUT_MS + ` мс`);
    });
    xhr.timeout = TIMEOUT_MS;
    xhr.open(method, URL);
    xhr.send(data);
  };

  const download = (onSuccess, onError) => sendRequest(onSuccess, onError, Method.GET, Url.DOWNLOAD);
  // const advertData = new FormData(advertForm);
  const upload = (onSuccess, onError, advertData) => sendRequest(onSuccess, onError, Method.POST, Url.UPLOAD, advertData)

  window.backend = {
    download,
    upload
  };
})();
