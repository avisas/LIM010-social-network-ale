import { userCurrent } from '../controller-firebase/firebase-authentication.js';
import { addPostFirebase } from '../controller-firebase/firebase-post.js';

export const savePost = (event) => {
    event.preventDefault();
    const post = document.querySelector('#text-area-post').value;
    const privacySelected = document.querySelector('#privacy').value;
    const user = userCurrent();
    if (post !== '') {
      if (fileButton.files[0] === undefined) {
        addPostFirebase(post, privacySelected, user, '')
          .then(() => {
            alert('Publicación guardada');
          });
      } else {
        // console.log(uploadImage(fileButton.files[0]));
        uploadImage(fileButton.files[0], uploader)
          .then(url => addPostFirebase(post, privacySelected, user, url));
        const modalTitle = 'Nuevo Registro';
        const modalContent = 'Publicación ingresada';
        modalMessage(modalTitle, modalContent, '#a5bf48ed');
      }
    } else {
      const modalTitle = 'Error de Registro';
      const modalContent = 'Ingresé el contenido que deseé compartir';
      modalMessage(modalTitle, modalContent, '#fa5457');
    }
  };

};