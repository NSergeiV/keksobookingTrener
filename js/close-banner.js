'use strict';
// Закрытие баннеров с данными и карточки с информацией

(function () {
  window.closeBanner = (popup, functionNameEsc, closeBannerMous) => {
    popup.remove();
    document.removeEventListener('keydown', functionNameEsc);
    if (closeBannerMous) {
      document.removeEventListener('mouseup', closeBannerMous);
    }
  };
})();
