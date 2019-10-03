import { createUser, userCurrent } from '../controller-firebase/firebase-authentication.js';
import { updateDisplayName } from '../view/common-view.js';

export const createProfile = (id, nameUser, emailUser) => {
  firebase.firestore().collection('users').doc(id).get()
    .then((doc) => {
      if (!doc.exists) {
        firebase.firestore().collection('users').doc(id).set({
          name: nameUser,
          email: emailUser,
          job: '',
          description: '',
        });
      }
    })
    .then(() => {
    })
    .catch(() => {
    });
};

// export const getName = (callbackFucntion) => {
//   const user = userCurrent().uid;
//   firebase.firestore().collection('users').doc(user).get()
//     .then((doc) => {
//       if (doc.exists) {
//         callbackFucntion(doc.data().name);
//       } else {
//         callbackFucntion('');
//       }
//     })
//     .catch(() => {
//     });
// };

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
      // getName(() => {

      // });
      regMessageErrorLabel.classList.remove('show-message-error');
      regMessageErrorLabel.innerHTML = '';
      window.location.hash = '#/';
      updateDisplayName(user.displayName);
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
