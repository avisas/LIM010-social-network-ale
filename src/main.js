// Este es el punto de entrada de tu aplicacion
import { myFunction } from './lib/index.js';

myFunction();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSpzjm4pcwWNrGj01R4qBS1JWKiEGvf-M",
  authDomain: "social-network-da9bb.firebaseapp.com",
  databaseURL: "https://social-network-da9bb.firebaseio.com",
  projectId: "social-network-da9bb",
  storageBucket: "",
  messagingSenderId: "127105401953",
  appId: "1:127105401953:web:ee4714d5b170bbe4"
};
//  Initialize Firebase
firebase.initializeApp(firebaseConfig);
