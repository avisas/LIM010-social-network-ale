import { components } from '../view/components.js';

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
    case '#/header': container.appendChild(components.header());
      document.write('Ingresaste al home');
      container.innerHTML = '';
      break;
    default: break;
  }
};
