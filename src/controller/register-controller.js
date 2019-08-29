import { createUser, userCurrent } from '../controller-firebase/firebase-authentication.js';

export const registerFunction = (event) => {
  event.preventDefault();
  const regMessageErrorLabel = document.getElementById('registerMessageError');
  const nick = document.querySelector('#nick').value;
  const email = document.querySelector('#mail').value;
  const password = document.querySelector('#pass').value;
  createUser(email, password)
    .then(() => {
      const use = userCurrent();
      createProfile(use.uid, nick, email);
      getName(use.uid);
      regMessageErrorLabel.classList.remove('show-message-error');
      regMessageErrorLabel.innerHTML = '';
      window.location.hash = '#/';
      // alert('Usuario creado correctamente'); // Poner un mensaje bonito
    })
    .catch((error) => {
      regMessageErrorLabel.classList.add('show-message-error');
      switch (error.code) {
        case 'auth/email-already-in-use':
          regMessageErrorLabel.innerHTML = '¡La dirección de correo electrónico ya existe!';
          break;
        case 'auth/weak-password':
          regMessageErrorLabel.innerHTML = 'La contraseña debe tener 6 ó más caracteres';
          break;
        case 'auth/invalid-email':
          regMessageErrorLabel.innerHTML = 'No se escribió correo electrónico válido';
          break;
        default:
          regMessageErrorLabel.innerHTML = 'Se ha producido un error';
      }
    });
};
