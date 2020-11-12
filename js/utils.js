'use strict';

const invokeIfKeyIs = (key, cb) => (evt) => evt.key === key && cb(evt);
const invokeIfButtonIs = (button, cb) => (evt) => evt.button === button && cb(evt);
const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
const getTruncatedArray = (arr, limit) => shuffleArray(arr).slice(0, limit);
const removeArray = (arr) => arr.forEach((element) => element.remove());

window.utils = {
  invokeIfKeyIs,
  invokeIfButtonIs,
  getTruncatedArray,
  removeArray,
};
