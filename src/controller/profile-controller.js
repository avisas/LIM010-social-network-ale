import { userCurrent } from '../controller-firebase/firebase-authentication.js';

export const updateUserName = (user, newName) => user.updateProfile({
  displayName: newName,
}).then(() => {
}).catch(() => {
});

export const getUserData = (fxAllUserData) => {
  const user = userCurrent();
  firebase.firestore().collection('users').doc(user.uid).onSnapshot((doc) => {
    fxAllUserData(doc);
  });
};

export const updateProfile = (nameUser, emailUser, jobUser, descriptionUser) => {
  const user = userCurrent();
  const userProfile = firebase.firestore().collection('users').doc(user.uid);
  user.updateProfile({
    displayName: nameUser,
  });
  return userProfile.update({
    name: nameUser,
    email: emailUser,
    job: jobUser,
    description: descriptionUser,
  }).then(() => {
  }).catch(() => {
  });
};
