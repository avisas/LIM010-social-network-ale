import { createUser, userCurrent } from '../controller-firebase/firebase-authentication.js';
import { updateDisplayName } from '../common/controller-functions.js';

export const createProfile = (id, nameUser, emailUser) => {
  firebase.firestore().collection('users').doc(id).set({
    name: nameUser,
    email: emailUser,
    job: '',
    description: '',
  })
    .then(() => {
      // console.log('usuario creado');
    })
    .catch((error) => {
      // console.log(error);
    });
};

export const getName = (userName) => {
  const user = userCurrent().uid;
  firebase.firestore().collection('users').doc(user).get().then((doc) => {
    if (doc.exists) {
      // console.log('Document data:', doc.data().name);
      userName.textContent = doc.data().name;
    } else {
      // doc.data() will be undefined in this case
      // console.log('No such document!');
    }
  })
    .catch(() => {
      // console.log('Error getting document:', error);
    });
};

export const registerFunction = (event) => {
  event.preventDefault();
  const regMessageErrorLabel = document.getElementById('registerMessageError');
  const nick = document.querySelector('#nick').value;
  const email = document.querySelector('#mail').value;
  const password = document.querySelector('#pass').value;
  createUser(email, password)
    .then(() => {
      const user = userCurrent();
      createProfile(user.uid, nick, email);
      getName(user.uid);
      regMessageErrorLabel.classList.remove('show-message-error');
      regMessageErrorLabel.innerHTML = '';
      window.location.hash = '#/';
      updateDisplayName(user.displayName);
      // alert('Usuario creado correctamente');
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
        case 'auth/operation-not-allowed':
          regMessageErrorLabel.innerHTML = 'Habilite las cuentas de correo electrónico y contraseña en Firebase Console';
          break;
        default:
          regMessageErrorLabel.innerHTML = 'Se ha producido un error';
      }
    });
};
