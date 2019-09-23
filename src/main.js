// Este es el punto de entrada de tu aplicacion
// import { loginUser } from '../view/login-view.js';

// loginUser();

import { changeView } from '../src/controller-route/route.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSpzjm4pcwWNrGj01R4qBS1JWKiEGvf-M",
  authDomain: "social-network-da9bb.firebaseapp.com",
  databaseURL: "https://social-network-da9bb.firebaseio.com",
  projectId: 'social-network-da9bb',
  storageBucket: 'social-network-da9bb.appspot.com',
  messagingSenderId: '127105401953',
  appId: '1:127105401953:web:ee4714d5b170bbe4',
};
//  Initialize Firebase
firebase.initializeApp(firebaseConfig);

const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};

window.addEventListener('load', init);
