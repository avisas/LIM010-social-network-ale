import { components } from '../view/components.js';
import { userCurrent } from '../controller-firebase/firebase-authentication.js';
import { getUserAndPublicPosts } from '../controller-firebase/firebase-post.js';

export const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '': container.appendChild(components.loginUser());
      break;
    case '#/': container.appendChild(components.loginUser());
      break;
    case '#/register': container.appendChild(components.registerUser());
      break;
    case '#/home':
      const userId = userCurrent().uid;
      getUserAndPublicPosts(userId, (dataListOfPubs) => {
        container.appendChild(components.homeView(dataListOfPubs));
      });
      break;
    case '#/profile': container.appendChild(components.profileView());
      break;
    default: break;
  }
};
