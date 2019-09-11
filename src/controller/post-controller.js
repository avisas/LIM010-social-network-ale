import { userCurrent } from '../controller-firebase/firebase-authentication.js';
import { addPostFirebase, deletePostFirebase, editPostFirebase } from '../controller-firebase/firebase-post.js';

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
        addPostFirebase(post, privacySelected, userId, userName, '')
        .then ( () => {
        });
    } else {
      uploadImage(fileButton.files[0])
      .then(url => addPostFirebase(post, privacySelected, userId, userName, url)); 
    }
  } else {
    alert('Error al intentar publicar un post');
  }
};

export const saveComment = (postId) => {
  const postComment = document.querySelector(`#comment-${postId}`).value;
  const user = userCurrent();
  const userId = user.uid;
  const userName = user.displayName;
  if (postComment !== '') {
    addCommentFirebase(userId, userName, postId, postComment)
      .then(() => {
      }).catch((error) => {
        alert('Error al intentar enviar un comentario a este post');
      });
  } else {
    alert('Ingrese un comentario');
  }
};

export const deletePost = (id) => {
  deletePostFirebase(id)
    .then(() => {
    })
    .catch((error) => {
      alert('El post no se puede eliminar en estos momentos');
    });
};

export const editPost = (id) => {
  const textPost = document.querySelector(`#text-${id}`);
  const selectPrivacy = document.querySelector(`#selectPriv-${id}`);
  const editButton = document.querySelector(`#edit-${id}`);
  const saveButton = document.querySelector(`#save-post-${id}`);

  textPost.contentEditable = true;
  selectPrivacy.disabled = false;
  textPost.focus();
  saveButton.classList.remove('hide');
  editButton.classList.add('hide');
  saveButton.addEventListener('click', (event) => {
    event.preventDefault();
    const printPost = textPost.innerHTML;
    const selectedPrivacy = selectPrivacy.value;
    editPostFirebase(id, printPost, selectedPrivacy)
      .then(() => {
        saveButton.classList.add('hide');
        editButton.classList.remove('hide');
      })
      .catch((error) => {
        const modalTitle = 'Error Editar Publicación';
        const modalContent = `Error adding document:${error}`;
        modalMessage(modalTitle, modalContent);
      });
  });
};

export const editComment = (idComment, idPost) => {
  const textComment = document.querySelector(`#post-comment-${idComment}`);
  textComment.disabled = false;
  textComment.style.backgroundColor = '#fefefe';
  const btnSaveComment = document.querySelector(`#savecomment-${idComment}`);
  const btnEditComment = document.querySelector(`#edit-${idComment}`);

  btnSaveComment.classList.remove('hide');
  btnEditComment.classList.add('hide');
  btnSaveComment.addEventListener('click', (event) => {
    event.preventDefault();
    textComment.style.backgroundColor = '#f2eeed';
    textComment.disabled = true;
    //AQUI ME QUEDÉ //
    const note = textComment.value;
    editCommentFirebase(idPost, idComment, note)
      .then(() => {
        boton.classList.add('hide');
        botonEditar.classList.remove('hide');
      })
      .catch((error) => {
        const modalTitle = 'Error Editar Comentario';
        const modalContent = `Error adding document:${error}`;
        modalMessage(modalTitle, modalContent);
      });
  });
};