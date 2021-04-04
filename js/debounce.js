'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500;
  let lastTimeout = null;
  window.debounce = function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      window.matches();
    }, DEBOUNCE_INTERVAL);
  };
})();
