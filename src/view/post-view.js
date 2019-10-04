import { userCurrent } from '../controller-firebase/firebase-authentication.js';
import {
  editPost,
  deletePost,
  addLikePost,
  deleteLikePost,
  saveComment,
} from '../controller/post-controller.js';

export const postList = (note) => {
  console.log(note);
  const liElement = document.createElement('li');
  liElement.classList.add('li-child');
  liElement.innerHTML = `
    <div class="div-post">
  <div class="user-publicated padding flex-name-post">
    <div class="only-flex">
      <div>
        <p> Publicado por: ${note.username} </p>
        <select id="select-privacy-${note.id}" class="btn-select" name="select" disabled>
          ${note.privacy === 'privado' ? `<option value="privado" selected>Privado</option>
          <option value="publico">Público</option>` : `<option value="privado">Privado</option>
          <option value="publico" selected>Público</option> `}
        </select>
      </div>
      <p class="date-publication">${note.timePost}</p>
    </div>
    ${userCurrent().uid === note.userID ? `
    <span class="btn-delete" id="delete-${note.id}"><i class="fas fa-trash-alt"></i></span>
    ` : `<span class="hide" id="delete-${note.id}"><i class="fas fa-trash-alt"></i></span>`}
  </div>
  <div class="middle-post">
    <div class="textarea no-border padding" id="text-${note.id}" contentEditable="false">${note.publication}</div>
    ${note.img !== '' ? `<img class="img-post margin" src="${note.img}">` : ''}
  </div>
  <div class="botom-post padding">
    <div>
      <i class="fa fa-heart-o heart-empty hide" id="like-${note.id}" data-post="${note.id}"></i>
      <i class="fa fa-heart hide heart-full" aria-hidden="true" id="dislike-${note.id}" data-post="${note.id}"></i>
      <a id="counter-${note.id}" class="counter-heart"></a>
    </div>
    <div>
      <span id="icon-comment"><i class="far fa-comment"></i></span>
      <a id="comments-counter-${note.id}" class="counter-heart"></a>
    </div>
    ${userCurrent().uid === note.userID ? ` 
    <span class="margin-left hide" id="save-post-${note.id}" data-note="${note.publication}" data-privacidad="${note.privacy}"><i
        class="fa fa-floppy-o icon-save"></i></span>
    <span class="margin-left" id="edit-${note.id}" data-note="${note.publication}" data-privacidad="${note.privacy}"><i
        class="fa fa-pencil-square-o icon-edit"></i></span> ` : ` 
        <span class="margin-left hide" id="save-post-${note.id}" data-note="${note.publication}" data-privacidad="${note.privacy}"><i class="fa fa-floppy-o icon-save"></i></span>
        <span class="margin-left hide" id="edit-${note.id}" data-note="${note.publication}" data-privacidad="${note.privacy}"><i class="fa fa-pencil-square-o icon-edit"></i><span>`}
  </div>
  <div id="comments-section" class="hide">
    <form id="form-publication" maxlength=50 class="form-comment" required>
      <textarea placeholder="Write your comment here" id="post-comment-${note.id}" class="textarea-comment"></textarea>
      <span id="btn-comment-${note.id}" data-post="${note.id}" class="margin btn-comment"><i class="far fa-paper-plane"></i></span>   
      </form>
      <label id="commentMessage"></label>
      <label id="deleteMessage"></label> 
      <label id="editMessage"></label>
    <section id="all-comments-${note.id}"></section>
  </div>
</div>
    `;

  liElement.querySelector(`#delete-${note.id}`)
    .addEventListener('click', () => { deletePost(note.id); });

  liElement.querySelector(`#edit-${note.id}`)
    .addEventListener('click', () => { editPost(note.id); });

  liElement.querySelector(`#like-${note.id}`)
    .addEventListener('click', () => { addLikePost(note.id); });

  liElement.querySelector(`#dislike-${note.id}`)
    .addEventListener('click', () => { deleteLikePost(note.id); });

  liElement.querySelector(`#btn-comment-${note.id}`)
    .addEventListener('click', (postID) => {
      const comment = liElement.querySelector(`#post-comment-${note.id}`);
      saveComment(postID);
      comment.value = '';
    });

  // showLikePost(liElement, note.userID);

  // const allComents = liElement.querySelector(`#all-comments-${note.userID}`);
  const iconComment = liElement.querySelector('#icon-comment');
  const commentSection = liElement.querySelector('#comments-section');
  // const counterComment = liElement.querySelector(`#comments-counter-${note.userID}`);

  // const iconDeletePost = liElement.querySelector(`#delete-${note.userID}`);
  // iconDeletePost.addEventListener('click', (id) => { deletePost(id); });

  iconComment.addEventListener('click', () => {
    if (commentSection.className === 'hide') {
      commentSection.classList.remove('hide');
    } else {
      commentSection.classList.add('hide');
    }
  });

  // getAllComments(note.userID, (coments) => {
  //   allComents.innerHTML = '';
  //   coments.forEach((comment) => {
  //     allComents.appendChild(listComment(comment));
  //   });
  //   counterComment.innerHTML = coments.length;
  // });

  return liElement;
};
