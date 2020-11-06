'use strict';

const FILE_TYPES = [`jpg`, `jpeg`, `png`];
const advertForm = document.querySelector(`.ad-form`);
const avatarChooser = advertForm.querySelector(`.ad-form-header__input`);
const avatarPreview = advertForm.querySelector(`.ad-form-header__preview img`);
const photoChooser = advertForm.querySelector(`.ad-form__input[type='file']`);
const photoPreview = advertForm.querySelector(`.ad-form__photo`);

const uploadImgFile = (imgChooser, preview) => {
  const img = imgChooser.files[0];
  const imgName = img.name.toLowerCase();

  const matches = FILE_TYPES.some(function (it) {
    return imgName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, function () {
      if (preview.tagName === `IMG`) {
        preview.src = reader.result;
      } else {
        const previewElement = document.createElement(`img`);
        previewElement.src = reader.result;
        previewElement.width = `70`;
        previewElement.height = `70`;
        preview.appendChild(previewElement);
      }
    });

    reader.readAsDataURL(img);
  }
};

avatarChooser.addEventListener(`change`, function () {
  uploadImgFile(avatarChooser, avatarPreview);
});

photoChooser.addEventListener(`change`, function () {
  uploadImgFile(photoChooser, photoPreview);
});
