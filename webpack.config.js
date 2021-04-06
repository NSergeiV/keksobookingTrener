const path = require("path");

module.exports = {
  entry: [
    "./js/main.js",
    "./js/debounce.js",
    "./js/close-banner.js",
    "./js/form-reset.js",
    "./js/banner-server-error.js",
    "./js/banner-pushServer-well.js",
    "./js/banner-pushServer-error.js",
    "./js/backend.js",
    "./js/form-enter-data.js",
    "./js/slider.js",
    "./js/photoFileAdd.js",
    "./js/placemarks.js",
    "./js/filtering.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
