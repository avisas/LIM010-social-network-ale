import { components } from '../view/components.js';
import { userCurrent } from '../controller-firebase/firebase-authentication.js';
import { getUserAndPublicPosts } from '../controller-firebase/firebase-post.js';

export const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  let userId = null;
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
    case '#/home':
      userId = userCurrent().uid;
      getUserAndPublicPosts(userId, (dataListOfPubs) => {
        container.innerHTML = '';
        container.appendChild(components.homeView(dataListOfPubs));
      });
      break;
    case '#/profile': container.appendChild(components.profileView());
      break;
    default: break;
  }
};
