import { signIn, signInWithGoogle, signInWithFacebook, userCurrent } from '../controller-firebase/firebase-authentication.js';
import { createProfile } from './register-controller.js';

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
      const user = userCurrent();
      updateDisplayName(user.displayName); 
    })
    .catch((error) => {
      messageErrorLabel.classList.add('show-message-error');
      switch (error.code) {
        case 'auth/user-not-found':
          messageErrorLabel.innerHTML = 'Usuario no vinculado a esta cuenta';
          break;
        case 'auth/wrong-password':
          messageErrorLabel.innerHTML = '¡Contraseña incorrecta!';
          break;
        case 'auth/invalid-email':
          messageErrorLabel.innerHTML = 'No se ingresó ningún correo electrónico';
          break;
        case 'auth/user-disabled':
          messageErrorLabel.innerHTML = 'Usuario no habilitado';
          break;
        default:
          messageErrorLabel.innerHTML = 'Se ha producido un error';
      }
    });
};

export const signInGoogle = (event) => {
  event.preventDefault();
  const user = userCurrent();
  signInWithGoogle()
    .then(() => {
      window.location.hash = '#/home';
      createProfile(user.uid, user.displayName, user.email);
      updateDisplayName(user.displayName);
    })
    .catch((error) => {
      messageErrorLabel.classList.add('show-message-error');
      switch (error.code) {
        case 'auth/account-exists-with-different-credential':
          messageErrorLabel.innerHTML = 'Este correo está asociado a otra cuenta';
          break;
        case 'auth/invalid-credential':
          messageErrorLabel.innerHTML = 'Ingrese un correo válido';
          break;
        case 'auth/operation-not-allowed':
          messageErrorLabel.innerHTML = 'Esta cuenta no está habilitada en Firebase console';
          break;
        case 'auth/user-disabled':
          messageErrorLabel.innerHTML = 'Esta cuenta se encuentra deshabilitada';
          break;
        case 'auth/user-not-found':
          messageErrorLabel.innerHTML = 'No se encuentra ningún usuario vinculado a esta cuenta';
          break;
        case 'auth/wrong-password':
          messageErrorLabel.innerHTML = 'Contraseña inválida';
          break;
        case 'auth/invalid-verification-code':
          messageErrorLabel.innerHTML = 'El código de la credencial de la credencial no es válido';
          break;
        case 'auth/invalid-verification-id':
          messageErrorLabel.innerHTML = 'El ID de la credencial de la credencial no es válido';
          break;
        default: break;
      }
    });
  };

export const signInFacebook = (event) => {
  event.preventDefault();
  const user = userCurrent();
  signInWithFacebook().then(() => {
    window.location.hash = '#/home';
    createProfile(user.uid, user.displayName, user.email);
    updateDisplayName(user.displayName);
  }).catch((error) => {
    messageErrorLabel.classList.add('show-message-error');
    switch (error.code) {
      case 'auth/account-exists-with-different-credential':
        messageErrorLabel.innerHTML = 'Este correo está asociado a otra cuenta';
        break;
      case 'auth/invalid-credential':
        messageErrorLabel.innerHTML = 'Ingrese un correo válido';
        break;
      case 'auth/operation-not-allowed':
        messageErrorLabel.innerHTML = 'Esta cuenta no está habilitada en Firebase console';
        break;
      case 'auth/user-disabled':
        messageErrorLabel.innerHTML = 'Esta cuenta se encuentra deshabilitada';
        break;
      case 'auth/user-not-found':
        messageErrorLabel.innerHTML = 'No se encuentra ningún usuario vinculado a esta cuenta';
        break;
      case 'auth/wrong-password':
        messageErrorLabel.innerHTML = 'Contraseña inválida';
        break;
      case 'auth/invalid-verification-code':
        messageErrorLabel.innerHTML = 'El código de la credencial de la credencial no es válido';
        break;
      case 'auth/invalid-verification-id':
        messageErrorLabel.innerHTML = 'El ID de la credencial de la credencial no es válido';
        break;
      default: break;
    }
  });
};

export const showPassword = () => {
  const tipo = document.querySelector('#password');
  if (tipo.type === 'password') {
    tipo.type = 'text';
  } else {
    tipo.type = 'password';
  }
};

export const updateDisplayName = (newDisplayName) => {
  const user = userCurrent();
  if (!newDisplayName) {
    newDisplayName = user.displayName || user.email;
  }
  user.updateProfile({
    displayName: newDisplayName
  });
};