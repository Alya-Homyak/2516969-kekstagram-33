import { KeyCode } from './full-screen-render';
import { changeImageScale } from './scale-image';
import { reset as resetEffects } from './add-effects';
import { validate, reset, hashtagFieldElement, commentFieldElement } from './validate-input-form';
import { showSuccesMessage, showErrorMessage } from './messages';

const SEND_DATA = 'https://32.javascript.htmlacademy.pro/kekstagram/';
const imageUploadInput = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const uploadSubmitButton = document.querySelector('.img-upload__submit');

function showForm() {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  form.addEventListener('keydown', onDocumentKeydown);
  uploadCancelButton.addEventListener('click', hideForm);
  changeImageScale();
}

export function hideForm() {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadCancelButton.removeEventListener('click', hideForm);
  form.removeEventListener('keydown', onDocumentKeydown);
  resetEffects();
  form.reset();
  reset();
}

function onDocumentKeydown(evt) {
  if(evt.target !== commentFieldElement && evt.target !== hashtagFieldElement) {
    if (evt.key === KeyCode.ESCAPE) {
      evt.preventDefault();
      hideForm();
    }
  }
}

imageUploadInput.addEventListener('change', showForm);

export const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = validate();

    if (isValid) {
      uploadSubmitButton.disabled = true;
      const postData = new FormData(evt.target);
      fetch(
        SEND_DATA,
        {
          method: 'POST',
          body: postData,
        },
      )
        .then((response) => {
          if (response.ok) {
            onSuccess();
            showSuccesMessage();
          } else {
            showErrorMessage();
          }
        })
        .catch(() => {
          showErrorMessage();
        })
        .finally(() => {
          uploadSubmitButton.disabled = false;
        });
    }
  });
};

