import { signOutUser } from '../controller/home-controller.js';
import { userCurrent } from '../controller-firebase/firebase-authentication.js';
import { updateProfile, getUserData } from '../controller/profile-controller.js';

export const profileView = () => {
  const profile = document.createElement('div');
  const profileContent = `
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
  
  <div class="div-main-profile">
  <h2 class="margin">Profile</h2>
  <div class="flex-form-profile margin">
  ${userCurrent().photoURL !== null ? `<img class="img-user margin" src="${userCurrent().photoURL}">` : '<img class="img-avatar margin" src="https://icon-library.net/images/avatar-icon-png/avatar-icon-png-16.jpg">'}
  <form class="form-profile">
      <label>Nombre</label>
      <input type="text" value="" class="inputForm" id="name">
      <label>Email</label>
      <input type="text" value="" disabled class="inputForm" id="email">
      <label>Ocupación</label>
      <input type="text" value="" class="inputForm" id="job">
      <label>cuéntales sobre ti</label>
      <textarea class="textarea-profile" id="description-textarea"></textarea>
      <input type="submit" class="button-login" id="button-save" value="Guardar">
      <input type="submit" class="button-login" id="button-return" value="Regresar">
    </form>
  </div>
</div>
  `;
  profile.innerHTML = profileContent;

  const btnSignOut = homeDiv.querySelector('#sign-out');
  btnSignOut.addEventListener('click', () => { signOutUser() });

  const name = profile.querySelector('#name');
  const email = profile.querySelector('#email');
  const job = profile.querySelector('#job');
  const descriptionText = profile.querySelector('#description-textarea');

  getUserData(name, email, job, descriptionText);
  const save = profile.querySelector('#button-save');
  save.addEventListener('click', (event) => {
    event.preventDefault();
    const newName = name.value;
    const newEmail = email.value;
    const newJob = job.value;
    const newDescription = descriptionText.value;

    updateProfile(newName, newEmail, newJob, newDescription).then(() => {
      window.location.hash = '#/profile';
    });
  });

  const returnHomeView = profile.querySelector('#button-return');
  returnHomeView.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.hash = '#/home';
  });

  return profile;
};
