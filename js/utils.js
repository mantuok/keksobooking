'use strict';

const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];
const getRandomArray = (arr) => arr.slice(getRandom(0, arr.length / 2), getRandom(arr.length / 2 + 1, arr.length - 1));
const invokeIfKeyIs = (key, cb) => (evt) => evt.key === key && cb(evt);
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
  getRandom,
  getRandomFrom,
  getRandomArray,
  invokeIfKeyIs,
  shuffleArray,
  getTruncatedArray,
  removeArray,
};
