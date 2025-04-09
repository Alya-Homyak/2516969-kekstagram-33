import { renderPosts } from './render-photo.js';
import { onCancelButtonClick, setUserFormSubmit } from './input-form.js';
// import { showDataErrorMessage } from './messages.js';
import { showSortButtons, sortPictures } from './sort-posts.js';
import data from '../data.json';

const GET_DATA = data;
renderPosts(GET_DATA);
sortPictures(GET_DATA);
showSortButtons();
// fetch(GET_DATA)
//   .then((response) => response.json())
//   .then((posts) => {
//     renderPosts(posts);
//     sortPictures(posts);
//     showSortButtons();
//   })
//   .catch(() => {
//     showDataErrorMessage();
//   });

setUserFormSubmit(onCancelButtonClick);
