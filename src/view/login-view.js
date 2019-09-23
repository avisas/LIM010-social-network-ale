import {
  loginFunction,
  signInGoogle,
  signInFacebook,
  showPassword,
} from '../controller/login-controller';

export const loginUser = () => {
  const formLogin = document.createElement('div');
  formLogin.className = 'container-login';
  const loginContent = `
  <div class="section-image flex">
  </div>
  <div class="login">
    <form id="login-authentication" class="flex-form">
      <!-- <img src="./src/img/bear café (2).jpg" class="image-login" alt="logo-login-auth"> -->
      <p class="slogan-coders">¡Bienvenido a <strong>Wakanda Café!</strong></p>
      <div class="inputForm">
        <input type="text" name="email" value="" placeholder="Email" class="inputForm1" id="email">
      </div>
      <div class="inputForm">
        <input type="password" name="password" value="" placeholder="Password" class="inputForm1" id="password">
        <span id="show-eye" class="eye-class"><i class="far fa-eye"></i></span>
      </div>
      <input type="submit" id="login-auth" class="button-login" value="Log In">
      <label id="LoginMessageError"></label>
    </form>
    <div class="flex-form">
      <p>O bien ingresa con...</p>
      <div class="social-icon">
        <span id="facebook" class="icon-fb"><i class="fab fa-facebook"></i></span>
        <span id="google" class="icon-google"><i class="fab fa-google"></i></span>
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

  loginAuthentication.addEventListener('submit', (event) => { loginFunction(event); });
  loginFacebook.addEventListener('click', (event) => { signInFacebook(event); });
  loginGoogle.addEventListener('click', (event) => { signInGoogle(event); });
  showEye.addEventListener('click', () => { showPassword(); });
  return formLogin;
};
