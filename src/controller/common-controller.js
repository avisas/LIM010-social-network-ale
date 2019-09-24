import { userCurrent } from '../controller-firebase/firebase-authentication.js';
import { addPostFirebase, uploadImage } from '../controller-firebase/firebase-post.js';

export const savePost = (event) => {
  event.preventDefault();
  const post = document.querySelector('#text-area-post').value;
  const privacySelected = document.querySelector('#privacy').value;
  const fileButton = document.querySelector('#fileButton');
  const user = userCurrent();
  const userId = user.uid;
  const userName = user.displayName;
  if (post !== '') {
    if (fileButton.files[0] === undefined) {
      addPostFirebase(post, privacySelected, userId, userName, '');
    } else {
      uploadImage(fileButton.files[0])
        .then(url => addPostFirebase(post, privacySelected, userId, userName, url));
    }
  } else {
    alert('Error al intentar publicar un post');
  }
};