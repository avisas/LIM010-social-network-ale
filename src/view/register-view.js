import { registerFunction} from '../controller/register-controller.js';

export const registerUser = () => {
  const formRegister = document.createElement('div');
  formRegister.className = 'container-login';
  const registerContent = `
    <div class="section-image">
      <img class="img-login" src="img/banner03.jpg">
    </div>
  <div class="login">
    <form id="form-register" class="flex-form">
      <img src="img/logo.png" class="img-logo" alt="Logo meet and code">
      <p class="slogan-coders">¡Bienvenido a <strong>Meet and Code</strong>, la red de coders en acción!</p>
      <input type="text" name="nickname" placeholder="Usuario" class="inputForm" id="nick">
      <input type="text" name="mail" placeholder="Email" class="inputForm" id="mail">
      <input type="password" name="pass" placeholder="Password" class="inputForm" id="pass">
      <input type="submit" class="button-login" id="button-register" value="Register">
      <label id="registerMessageError"></label>
    </form>
    <p>¿Ya tienes una cuenta?&nbsp;<a href="#/"><span id="" class="register-href">Ingresa</span></a></p>
  </div>
    `;
  formRegister.innerHTML = registerContent;

  const btnRegister = formRegister.querySelector('#button-register');
  btnRegister.addEventListener('click', () => { registerFunction() });
  
  return formRegister;
};