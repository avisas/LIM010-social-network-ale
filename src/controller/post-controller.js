import { userCurrent } from '../controller-firebase/firebase-authentication.js';
import {
  deletePostFirebase, editPostFirebase,
} from '../controller-firebase/firebase-post.js';
import {
  addCommentFirebase, editCommentFirebase, addLikeFirebase, deleteLikeFirebase,
} from '../controller-firebase/firebase-likes.js';
// import { homeView } from '../view/home-view.js';

export const saveComment = (postId) => {
  const commentMessageLabel = document.getElementById('commentMessage');
  const postComment = document.querySelector(`#post-comment-${postId}`).value;
  const user = userCurrent();
  const userId = user.uid;
  const userName = user.displayName;
  if (postComment !== '') {
    addCommentFirebase(userId, userName, postId, postComment)
      .then(() => {
        commentMessageLabel.classList.remove('show-message-error');
        commentMessageLabel.innerHTML = '';
      })
      .catch(() => {
        commentMessageLabel.classList.add('show-message-error');
        commentMessageLabel.innerHTML = 'Cannot add a comment at this moment';
      });
  } else {
    commentMessageLabel.classList.add('show-message-error');
    commentMessageLabel.innerHTML = 'You should add a comment';
  }
};

export const deletePost = (id) => {
  const deleteMessageLabel = document.getElementById('deleteMessage');
  deletePostFirebase(id)
    .then(() => {
      deleteMessageLabel.classList.remove('show-message-error');
      deleteMessageLabel.innerHTML = '';
    })
    .catch(() => {
      deleteMessageLabel.classList.add('show-message-error');
      deleteMessageLabel.innerHTML = 'Cannot delete a post in this moment';
    });
};

export const editPost = (id) => {
  const textPost = document.querySelector(`#text-${id}`);
  const selectPrivacy = document.querySelector(`#select-privacy-${id}`);
  const editButton = document.querySelector(`#edit-${id}`);
  const saveButton = document.querySelector(`#save-post-${id}`);

  textPost.contentEditable = true;
  selectPrivacy.disabled = false;
  textPost.focus();
  saveButton.classList.remove('hide');
  editButton.classList.add('hide');
  saveButton.addEventListener('click', (event) => {
    event.preventDefault();
    const editMessageLabel = document.getElementById('editMessage');
    const printPost = textPost.innerHTML;
    const selectedPrivacy = selectPrivacy.value;
    editPostFirebase(id, printPost, selectedPrivacy)
      .then(() => {
        saveButton.classList.add('hide');
        editButton.classList.remove('hide');
        editMessageLabel.classList.remove('show-message-error');
        editMessageLabel.innerHTML = '';
      })
      .catch(() => {
        editMessageLabel.classList.add('show-message-error');
        editMessageLabel.innerHTML = 'Cannot edit this post in this moment';
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
    const note = textComment.value;
    editCommentFirebase(idPost, idComment, note)
      .then(() => {
        btnSaveComment.classList.add('hide');
        btnEditComment.classList.remove('hide');
      })
      .catch(() => {
      });
  });
};

// export const showLikePost = (list, id) => {
//   const buttonLike = list.querySelector(`#like-${id}`);
//   const buttonDislike = list.querySelector(`#dislike-${id}`);
//   const user = userCurrent();
//   showLikeFirebase(id).onSnapshot((querySnapshot) => {
//     document.getElementById(`counter-${id}`).innerHTML = querySnapshot.size;
//     querySnapshot.forEach((doc) => {
//       if (doc.data().idUser !== user.uid || !doc.exists) {
//         buttonLike.classList.remove('hide');
//         buttonDislike.classList.add('hide');
//       } else {
//         buttonLike.classList.add('hide');
//         buttonDislike.classList.remove('hide');
//       }
//     });
//   });
// };

export const addLikePost = (postId) => {
  const buttonLike = document.getElementById(`like-${postId}`);
  const buttonDislike = document.getElementById(`dislike-${postId}`);
  const user = userCurrent();
  const userUid = user.uid;
  const userName = user.displayName;
  addLikeFirebase(userUid, userName, postId)
    .then(() => {
      buttonDislike.classList.remove('hide');
      buttonLike.classList.add('hide');
    });
};

export const deleteLikePost = (postId) => {
  const user = userCurrent().uid;
  const buttonLike = document.getElementById(`like-${postId}`);
  const buttonDislike = document.getElementById(`dislike-${postId}`);
  deleteLikeFirebase(user, postId)
    .then(() => {
      buttonDislike.classList.add('hide');
      buttonLike.classList.remove('hide');
    });
};

// export const allNotes = (content) => {
//   const contentPost = content.querySelector('#content-post');
//   getUserAndPublicPosts((notes) => {
//     contentPost.innerHTML = '';
//     contentPost.appendChild(homeView(notes));
//   });
// };
