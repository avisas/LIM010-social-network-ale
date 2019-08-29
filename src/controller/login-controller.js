import { signIn } from '../controller-firebase/firebase-authentication.js';

export const loginFunction = (event) => {
    event.preventDefault();
    const messageErrorLabel = document.getElementById('LoginMessageError');
    const usuario = event.target.email.value;
    const contrasena = event.target.password.value;
    signIn(usuario, contrasena)
      .then(() => {
        messageErrorLabel.classList.remove('show-message-error');
        messageErrorLabel.innerHTML = '';
        window.location.hash = '#/home';
      })
      .catch((error) => {
        messageErrorLabel.classList.add('show-message-error');
        switch (error.code) {
          case 'auth/user-not-found':
            messageErrorLabel.innerHTML = 'Usuario no registrado';
            break;
          case 'auth/wrong-password':
            messageErrorLabel.innerHTML = 'Contraseña incorrecta';
            break;
          case 'auth/invalid-email':
            messageErrorLabel.innerHTML = 'No se ingresó ningún correo electrónico';
            break;
          default:
            messageErrorLabel.innerHTML = 'Se ha producido un error';
        }
      });
  };