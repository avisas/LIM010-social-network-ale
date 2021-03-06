import { registerFunction } from '../controller/register-controller.js';

export const registerUser = () => {
  const formRegister = document.createElement('div');
  formRegister.className = 'container-login';
  const registerContent = `
  <div class="section-image">
  </div>
<div class="login">
  <form id="form-register" class="flex-form">
  <!-- <img src="./src/img/bear café (2).jpg" class="image-login" alt="Logo eco café"> -->
    <p class="slogan-coders">¡Welcome to <strong>Wakanda Café!</strong></p>
    <input type="text" name="nickname" placeholder="User" class="inputForm" id="nick">
    <input type="text" name="mail" placeholder="Email" class="inputForm" id="mail">
    <input type="password" name="pass" placeholder="Password" class="inputForm" id="pass">
    <input type="submit" class="button-login" name="register" value="Register">
    <label id="registerMessageError"></label>
  </form>
  <p>¿Already have an account?&nbsp;<a href="#/"><span id="" class="register-href">Ingresa</span></a></p>
</div>
    `;
  formRegister.innerHTML = registerContent;

  const btnRegister = formRegister.register;
  btnRegister.addEventListener('click', (event) => { registerFunction(event); });

  return formRegister;
};
