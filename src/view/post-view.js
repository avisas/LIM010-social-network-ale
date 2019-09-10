import { userCurrent } from "../controller-firebase/firebase-authentication.js";

export const postList = (note) => {
    const liElement = document.createElement('li');
    liElement.classList.add('li-child');
    liElement.innerHTML = `
    <div class="div-post">
  <div class="user-publicated flex-name-post">
    <div class="only-flex">
      <div>
        <p> Publicado por: ${note.username} </p>
        <select id="select-privacy-${note.userID}" class="btn-select" name="select" disabled>
        ${note.privacy === 'privado' ? `<option value="privado" selected>Privado</option>
        <option value="publico">Público</option>` : `<option value="privado">Privado</option>
        <option value="publico" selected>Público</option> `}
        </select>
      </div>
      <p class="date-publication">${note.timePost}</p>
    </div>
    ${userCurrent().id === note.userID ? `
    <span class="btn-delete" id="delete-${note.userID}"><i class="fas fa-trash-alt"></i></span>` : 
    `<span class="hide" id="delete-${note.userID}"><i class="fas fa-trash-alt"></i></span>`}
  </div>
  <div class="middle-post">
    <div class="textarea no-border" id="text-${note.userID}" contentEditable="false">${note.publication}</div>
  </div>
  <div class="botom-post">
    <div>
      <i class="fa fa-heart-o heart-empty" id="like" data-post=""></i>
      <i class="fa fa-heart hide heart-full" aria-hidden="true" id="dislike" data-post=""></i>
      <a id="counter" class="counter-heart"></a>
    </div>
    <div>
      <span id="show-comment"><i class="far fa-comment"></i></span>
      <a id="commentsCount" class="counter-heart"></a>
    </div>
    <span class="margin-left hide" id="save-post" data-note="" data-privacidad=""><i
        class="fa fa-floppy-o iconSave"></i></span>
    <span class="margin-left hide" id="edit" data-note="" data-privacidad=""><i
        class="fa fa-pencil-square-o iconEdit"></i></span>
  </div>
  <div id="comments-section" class="hide">
    <form id="form-publication" maxlength=50 class="form-comment" required>
      <textarea placeholder="Escribe tu comentario" id="comment" class="textarea-comment"></textarea>
      <span id="btn-comment" data-post="" class="margin btn-comment"><i class="far fa-paper-plane"></i></span>
    </form>
    <section id="allComments"></section>
  </div>
</div>
    `;
    
    return liElement;
};