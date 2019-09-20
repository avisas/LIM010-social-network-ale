// importamos la funcion que vamos a testear
import { createUser } from '../src/controller-firebase/firebase-authentication.js';

describe('crear un usuario', () => {
  it('debería crear un usuario con email ale@gmail.com y con password hola123', () => createUser('ale@gmail.com', 'hola123')
    .then((user) => {
      expect(user.email).toBe('ale@gmail.com');
    }));
});
