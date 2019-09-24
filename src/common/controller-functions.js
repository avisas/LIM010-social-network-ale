import { userCurrent } from '../controller-firebase/firebase-authentication.js';
import { updateProfile } from '../controller/profile-controller.js';

export const updateDisplayName = (newDisplayName) => {
  // console.log(`dentro de updateDisplayName. type:${typeof newDisplayName}. newDisplayName:${ newDisplayName }`);
  // console.log(newDisplayName);
  const user = userCurrent();
  if (!newDisplayName) {
    newDisplayName = user.displayName || user.email;
  }
  user.updateProfile({
    displayName: newDisplayName,
  });
};
