import { userCurrent } from '../controller-firebase/firebase-authentication.js';
import { addPostFirebase } from '../controller-firebase/firebase-post.js';

export const savePost = (event) => {
  event.preventDefault();
  const post = document.querySelector('#text-area-post').value;
  const privacySelected = document.querySelector('#privacy').value;
  const user = userCurrent();
  const userId = user.uid;
  const userName = user.displayName;
  if (post !== '') {
    addPostFirebase(post, privacySelected, userId, userName, '')
  } else {
    alert('Error al intentar publicar un post');
  }
};