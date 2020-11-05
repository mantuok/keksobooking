const path = require("path");

module.exports = {
  entry: [
    "./js/utils.js",
    "./js/debounce.js",
    "./js/backend.js",
    "./js/message-handler.js",
    "./js/page-mode.js",
    "./js/elements-render.js",
    "./js/form-validation.js",
    "./js/photo-upload",
    "./js/pin-move.js",
    "./js/filter-adverts.js",
    "./js/main.js",
    "./js/card-popup.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
