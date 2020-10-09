'use strict';

(function () {
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
  const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];
  const getRandomArray = (arr) => arr.slice(getRandom(0, arr.length / 2), getRandom(arr.length / 2 + 1, arr.length - 1));
  const invokeIfKeyIs = (key, cb) => (evt) => evt.key === key && cb(evt);

  window.utils = {
    getRandom,
    getRandomFrom,
    getRandomArray,
    invokeIfKeyIs
  };
})();
