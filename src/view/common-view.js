import { userCurrent } from '../controller-firebase/firebase-authentication.js';

export const updateDisplayName = (newDisplayName) => {
  const user = userCurrent();
  let newVariable = newDisplayName;
  if (!newVariable) {
    newVariable = user.displayName || user.email;
  }
  user.updateProfile({
    displayName: newVariable,
  });
};
