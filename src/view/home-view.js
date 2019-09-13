import { signOutUser } from '../controller/home-controller.js';
import { savePost } from '../controller/post-controller.js';
import { postList } from '../view/post-view.js';
import { getUserAndPublicPosts } from '../controller-firebase/firebase-post.js';
import { userCurrent } from '../controller-firebase/firebase-authentication.js';

export const homeView = (pubs) => {
  const homeDiv = document.createElement('div');
  const homeContent = `
  <header>
  <h2>Wakanda Café</h2>
  <nav class="flex">
    <a id="hamb-menu" class="hamb-menu"><span class="icon-menu"></span></a>
    <ul id="show-hamb" class="hide list-menu">
      <li><a id="user-name"><span class="icon-user"></span>User</a></li>
      <li><a id="home-pag"><span class="icon-home2"></span>Home</a></li>
      <li><a id="setting"><span class="icon-info"></span>Setting</a></li>
      <li><a id="sign-out"><span class="icon-exit"></span>Log Out</a></li>
    </ul>
  </nav>
</header>
<main>
  <div id="form-save" class="div-post">
    <form id="form-publication" class="" maxlength=50 required>
      <textarea id="text-area-post" placeholder="¿Que quieres compartir?" class="textarea-post"></textarea>
      <div class="flex-bottom-form">
        <div>
          <label for="fileButton" id="image" class="btn-picture"><i class="far fa-images"></i></label>
          <input type="text" class="file-name" id="input-file-name"/>
          <input type="file" class="hide" name="file" value="upload" id="fileButton" />
        </div>
        <select id="privacy" class="btn-select" name="select">
          <option value="publico" selected>Público</option>
          <option value="privado">Privado</option>
        </select>
        <input type="button" id="share-post" class="btn-share" value="Compartir">
      </div>
    </form>
  </div>
  <div class="content-post" id="content-post">
  <ul id="post-list" class="ul-parent"></ul>
  </div>
</main>
  `;
  homeDiv.innerHTML = homeContent;

  const ulPost = homeDiv.querySelector('#post-list');
  pubs.forEach((note) => {
    let ans = postList(note);
    ulPost.appendChild(ans);
  });

  const btnSignOut = homeDiv.querySelector('#sign-out');
  btnSignOut.addEventListener('click', () => { signOutUser() });

  const btnSharePost = homeDiv.querySelector('#share-post');
  btnSharePost.addEventListener('click', (event) => { savePost(event) });

  const fileName = homeDiv.querySelector('#input-file-name');
  const fileButton = homeDiv.querySelector('#fileButton');
  fileButton.addEventListener('change', () => {
    const fileValue = fileButton.files[0].name;
    fileName.value = fileValue;
  });

  const HambMenu = homeDiv.querySelector('#hamb-menu');
  const showHamb = homeDiv.querySelector('#show-hamb');
  let modoMenu = 0;

  HambMenu.addEventListener('click', () => {
    if (modoMenu === 0) {
      showHamb.classList.add('block');
      showHamb.classList.remove('hide');
      modoMenu = 1;
    } else {
      showHamb.classList.add('hide');
      showHamb.classList.remove('block');
      modoMenu = 0;
    }
  });
  return homeDiv;

};
