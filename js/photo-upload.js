'use strict';

const FILE_TYPES = [`jpg`, `jpeg`, `png`];
const DEFAULT_AVATAR = `img/muffin-grey.svg`;
const PREVIEW_ELEMENT = {
  TAG: `img`,
  WIDTH: `70`,
  HEIGHT: `70`
};
const advertForm = document.querySelector(`.ad-form`);
const avatarChooser = advertForm.querySelector(`.ad-form-header__input`);
const avatarPreview = advertForm.querySelector(`.ad-form-header__preview img`);
const photoChooser = advertForm.querySelector(`.ad-form__input[type='file']`);
const photoPreview = advertForm.querySelector(`.ad-form__photo`);

const uploadImgFile = (imgChooser, preview) => {
  const img = imgChooser.files[0];
  const imgName = img.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return imgName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      if (preview.tagName === `IMG`) {
        preview.src = reader.result;
      } else {
        const previewElement = document.createElement(PREVIEW_ELEMENT.TAG);
        previewElement.src = reader.result;
        previewElement.width = PREVIEW_ELEMENT.WIDTH;
        previewElement.height = PREVIEW_ELEMENT.HEIGHT;
        preview.appendChild(previewElement);
      }
    });

    reader.readAsDataURL(img);
  }
};

const resetPreview = () => {
  avatarPreview.src = DEFAULT_AVATAR;
  if (photoPreview.querySelector(`img`)) {
    photoPreview.querySelector(`img`).remove();
  }
};

avatarChooser.addEventListener(`change`, () => {
  uploadImgFile(avatarChooser, avatarPreview);
});

photoChooser.addEventListener(`change`, () => {
  uploadImgFile(photoChooser, photoPreview);
});

window.photoUpload = {
  reset: resetPreview
};
