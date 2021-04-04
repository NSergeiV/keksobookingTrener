'use strict';


(function () {
  const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  window.checkingFile = (fileChooser, block) => {
    let file = fileChooser.files[0];
    let fileFotoName = file.name.toLowerCase();
    let matches = FILE_TYPES.some(function (ending) {
      return fileFotoName.endsWith(ending);
    });
    if (matches) {
      let reader = new FileReader();

      reader.addEventListener('load', function () {
        block.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };
})();
