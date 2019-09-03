import { signOutUser } from '../controller/home-controller.js';

export const homeView = () => {
  const homeDiv = document.createElement('div');
  const homeContent = `
  <header>
  <h2>Wakanda Café</h2>
  <nav class="flex">
    <a id="hamb-menu" class="hamb-menu"><span class="icon-menu"></span></a>
    <ul id="show-hamb" class="hide list-menu">
      <li><a id="user-name"><span class="icon-user">User</a></li>
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
      <div class="">
        <select id="privacy" class="btn-select" name="select">
          <option value="publico" selected>Público</option>
          <option value="privado">Privado</option>
        </select>
        <input type="button" id="compartir-post" class="btn-share" value="Compartir">
      </div>
    </form>
  </div>

  <section>
    <ul id="notes-list" class="ul-parent"></ul>
  </section>
</main>
  `;
homeDiv.innerHTML = homeContent;

const btnSignOut = homeDiv.querySelector('#sign-out');
btnSignOut.addEventListener('click', () => {signOutUser() });


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
