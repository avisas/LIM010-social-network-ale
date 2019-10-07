import Mockfirebase from 'mock-cloud-firestore';
import {
  addPostFirebase, deletePostFirebase, editPostFirebase, getUserAndPublicPosts,
} from '../src/controller-firebase/firebase-post.js';

const confMock = () => {
  const fixtureData = {
    __collection__: {
      posts: {
        __doc__: {
          user01: {
            userName: 'Alejandra',
            user: '1',
            timePost: '4 de septiembre de 2019 - 10:15 a. m.',
            privacy: 'publico',
            publication: 'prueba uno',
            img: '',
          },
          user02: {
            userName: 'Almendra',
            user: '2',
            timePost: '4 de septiembre de 2019 - 10:15 a. m.',
            privacy: 'publico',
            publication: 'prueba dos',
            img: '',
          },
          user03: {
            userName: 'Paola',
            user: '3',
            timePost: '4 de septiembre de 2019 - 10:15 a. m.',
            privacy: 'privado',
            publication: 'prueba tres',
            img: '',
          },
        },
      },
    },
  };

  global.firebase = new Mockfirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });
};

beforeEach(confMock);

describe('Add post', () => {
  it('Debería poder agregar un post', done => addPostFirebase('primer post prueba', 'publico', '001', 'Sandra', '').then(() => {
    const callback = (publication) => {
      const result = publication.find(elemento => elemento.publication === 'primer post prueba');
      expect(result.publication).toBe('primer post prueba');
      done();
    };
    getUserAndPublicPosts('001', callback);
  }));
});

describe('Delete post', () => {
  it('Deberia poder eliminar el post con id user02', done => deletePostFirebase('user02').then(() => {
    const callback = (notes) => {
      const result = notes.find(elemento => elemento.id === 'user02');
      expect(result).toBe(undefined);
      done();
    };
    getUserAndPublicPosts('2', callback);
  }));
});

describe('Edit post', () => {
  it('Deberia poder editar el post con id user02', done => editPostFirebase('user02', 'post editado', 'publico').then(() => {
    const callback = (publication) => {
      const result = publication.find(elemento => elemento.publication === 'post editado');
      expect(result.publication).toBe('post editado');
      done();
    };
    getUserAndPublicPosts('user02', callback);
  }));
});
