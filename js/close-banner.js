'use strict';

(function () {
  window.closeBanner = (popup, functionNameEsc, closeBannerMous) => {
    popup.remove();
    document.removeEventListener('keydown', functionNameEsc);
    if (closeBannerMous) {
      document.removeEventListener('mouseup', closeBannerMous);
    }
  };
})();
