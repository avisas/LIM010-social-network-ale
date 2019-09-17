import { postDate } from './firebase-post.js';

export const addLikeFirebase = (userId, userName, postId) => {
  firebase.firestore().collection('posts').doc(postId).collection('likes')
    .doc(userId).set({
      userId: userId,
      userName: userName,
      postId: postId,
    });
};

export const deleteLikeFirebase = (user, postId) => {
  firebase.firestore().collection('posts').doc(postId).collection('likes')
    .doc(user).delete();
};

export const showLikeFirebase = (idPost) => {
  firebase.firestore().collection('posts').doc(idPost).collection('likes');
};

export const addCommentFirebase = (userUid, userName, postId, text) => {
  firebase.firestore().collection('posts').doc(postId).collection('comment').add({
    idUser: userUid,
    nameUser: userName,
    comment: text,
    idPost: postId,
    timePost: postDate(),
  });
};

export const deleteCommentFirebase = (idPost, idComment) => {
  firebase.firestore().collection('posts').doc(idPost).collection('comment')
  .doc(idComment).delete();
};

export const editCommentFirebase = (idPost, idComment, commentEdit) => {
  firebase.firestore().collection('posts').doc(idPost).collection('comment')
  .doc(idComment).update({
    updateComment: commentEdit,
    updateTimePost: postDate(),
  });
};

export const getAllComments = (idPost, callback) => {
  firebase.firestore().collection('posts').doc(idPost).collection('comment')
    .orderBy('datePost', 'desc').onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      callback(data);
    });
};