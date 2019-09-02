import { signOutLogin } from '../controller-firebase/firebase-authentication.js';

export const signOutUser = () => {
  signOutLogin().then(() => {
    window.location.hash = '#/';
  }, () => {
    // console.log(error);
  });
};