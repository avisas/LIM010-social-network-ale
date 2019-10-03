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
      <li><a id="user-name"><span class="icon-user"></span>${userCurrent().displayName}</a></li>
      <li><a id="home-pag"><span class="icon-home2"></span>Home</a></li>
      <li><a id="setting"><span class="icon-info"></span>Setting</a></li>
      <li><a id="sign-out"><span class="icon-exit"></span>Log Out</a></li>
    </ul>
  </nav>
  </header>
  
  <div class="div-main-profile">
  <h2 class="margin h2-profile">Profile</h2>
  <div class="flex-form-profile margin">
  ${userCurrent().photoURL !== null ? `<img class="img-user margin" src="${userCurrent().photoURL}">` : '<img class="img-avatar margin" src="https://icon-library.net/images/avatar-icon-png/avatar-icon-png-16.jpg">'}
  <form class="form-profile">
      <label class ="label-profile">Name</label>
      <input type="text" value="" class="input-form-profile" id="name">
      <label class ="label-profile">Email</label>
      <input type="text" value="" disabled class="input-form-profile" id="email">
      <label class ="label-profile">Occupation</label>
      <input type="text" value="" class="input-form-profile" id="job">
      <label class ="label-profile">About me</label>
      <textarea class="textarea-profile" id="description-textarea"></textarea>
      
      <input type="submit" class="button-profile" id="button-save" value="Save">
      <input type="submit" class="button-profile" id="button-return" value="Return">
    </form>
  </div>
</div>
  `;
  profile.innerHTML = profileContent;

  const btnSignOut = profile.querySelector('#sign-out');
  btnSignOut.addEventListener('click', () => { signOutUser(); });

  const name = profile.querySelector('#name');
  const email = profile.querySelector('#email');
  const job = profile.querySelector('#job');
  const descriptionText = profile.querySelector('#description-textarea');

  getUserData((objData) => {
    name.value = objData.data().name;
    email.value = objData.data().email;
    job.value = objData.data().job;
    descriptionText.value = objData.data().description;
  });

  const save = profile.querySelector('#button-save');
  save.addEventListener('click', (event) => {
    event.preventDefault();
    const newName = name.value;
    const newEmail = email.value;
    const newJob = job.value;
    const newDescription = descriptionText.value;
    updateProfile(newName, newEmail, newJob, newDescription).then(() => {
      window.location.hash = '#/home';
    });
  });

  const returnHomeView = profile.querySelector('#button-return');
  returnHomeView.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.hash = '#/home';
  });

  return profile;
};
