// importamos la funcion que vamos a testear
import {
  createUser, signIn, userCurrent, signInWithFacebook, signInWithGoogle, signOutLogin,
} from '../src/controller-firebase/firebase-authentication.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();

mockfirestore.autoFlush();
mockauth.autoFlush();
const mockprovider = new firebasemock.MockFirebase();
mockprovider.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  path => (path ? mockfirestore.child(path) : null),
  () => mockauth,
  () => mockfirestore,
  () => mockprovider,
);

describe('crear un usuario', () => {
  it('debería crear un usuario con email ale@gmail.com y con password hola123', () => createUser('ale@gmail.com', 'hola123')
    .then(() => {
      expect(userCurrent().email).toBe('ale@gmail.com');
    }));
});

describe('Iniciar sesión', () => {
  it('Debería poder iniciar sesion', () => signIn('ale@gmail.com', 'hola123')
    .then(() => {
      expect(userCurrent().email).toBe('ale@gmail.com');
    }));
});

describe('User current', () => {
  it('Debería poder retornar el usuario que ha iniciado sesión', () => signIn('ale@gmail.com', 'hola123')
    .then(() => {
      expect(userCurrent().email).toBe('ale@gmail.com');
    }));
});

describe('Ingresar con Facebook', () => {
  it('Debería poder iniciar sesión con cuenta de Facebook', () => signInWithFacebook('ale@gmail.com', 'hola123')
    .then(() => {
      expect(userCurrent().isAnonymous).toBe(false);
    }));
});

describe('Ingresar con Google', () => {
  it('Debería poder iniciar sesión con Google', () => signInWithGoogle('ale@gmail.com', 'hola123')
    .then(() => {
      expect(userCurrent().isAnonymous).toBe(false);
    }));
});

describe('Cerrar sesión', () => {
  it('Debería poder cerrar sesión', () => signOutLogin()
    .then(() => {
      expect(userCurrent()).toBe(undefined);
    }));
});
