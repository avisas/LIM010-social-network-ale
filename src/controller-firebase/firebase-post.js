import { dataBase } from '../main.js';

export const addPostFirebase = (post, privacySelected, user, imgUrl) => {
    return dataBase.collection('posts').add({
      notes: post,
      privacidad: privacySelected,
      user: user.uid,
      userName: user.displayName,
      timePost: datePost(),
      image: imgUrl,
    });
  };