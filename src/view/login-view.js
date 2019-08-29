import { loginFunction } from '../controller/login-controller.js';

export const loginUser = () => {
  const formLogin = document.createElement('div');
  formLogin.className = 'container-login';
  const loginContent = `
<div class="section-image flex">
  </div>
  <div class="login">
    <form id="login-authentication" class="flex-form">
      <!-- <img src=" " class="image-login" alt="logo del login-authentication"> -->
      <p class="slogan-coders">¡Bienvenido a <strong>Wakanda!</strong></p>
      <div class="inputForm">
        <input type="text" name="email" value="" placeholder="Email" class="inputForm1" id="email">
      </div>
      <div class="inputForm">
        <input type="password" name="password" value="" placeholder="Password" class="inputForm1" id="password">
        <span id="show-eye" class="eye-class"><i class="far fa-eye"></i></span>
      </div>
      <input type="submit" name="" class="button-login" value="Log In">
      <label id="LoginMessageError"></label>
    </form>
    <div class="flex-form">
      <p>O bien ingresa con...</p>
      <div class="social-icon">
        <span id="facebook"><i class="fab fa-facebook icon-fb"></i></span>
        <span id="google"><i class="fab fa-google icon-google"></i></span>
      </div>
      <p>¿No tienes una cuenta?&nbsp;<a href="#/register"><span id="register"
            class="register-href">Regístrate</span></a></p>
    </div>
  </div>
`;
  formLogin.innerHTML = loginContent;

  const loginAuthentication = formLogin.querySelector('#login-authentication');
  const loginFacebook = formLogin.querySelector('#facebook');
  const loginGoogle = formLogin.querySelector('#google');
  const showEye = formLogin.querySelector('#show-eye');

  loginAuthentication.addEventListener('submit', () => { loginFunction() });
  // loginFacebook.addEventListener('click', signInFacebook);
  // loginGoogle.addEventListener('click', signInGoogle);
  // showEye.addEventListener('click', showPassword);
  return formLogin;
};