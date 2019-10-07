import { components } from '../view/components.js';
import { userCurrent } from '../controller-firebase/firebase-authentication.js';
import { getUserAndPublicPosts } from '../controller-firebase/firebase-post.js';

export const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';

  switch (route) {
    case '':
      container.innerHTML = '';
      container.appendChild(components.loginUser());
      break;
    case '#/':
      container.innerHTML = '';
      container.appendChild(components.loginUser());
      break;
    case '#/register':
      container.innerHTML = '';
      container.appendChild(components.registerUser());
      break;
    case '#/home': {
      const pintarHomeConUserId = (userId) => {
        getUserAndPublicPosts(userId, (dataListOfPubs) => {
          container.innerHTML = '';
          container.appendChild(components.homeView(dataListOfPubs));
        });
      };

      const user = userCurrent();
      if (user) {
        pintarHomeConUserId(user.uid);
      } else {
        firebase.auth().onAuthStateChanged((u) => {
          if (u) {
            pintarHomeConUserId(u.uid);
          }
        });
      }
      break;
    }
    case '#/profile': container.appendChild(components.profileView());
      break;
    default: break;
  }
};
