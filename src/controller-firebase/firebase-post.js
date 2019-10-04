export const postDate = () => {
  const opt1 = {
    month: 'short', day: 'numeric', year: 'numeric',
  };
  const opt2 = {
    hour12: 'true', hour: 'numeric', minute: 'numeric',
  };
  const date = new Date().toLocaleDateString('es-Es', opt1);
  const time = new Date().toLocaleTimeString('es-Es', opt2);
  const dataTime = `${date} - ${time}`;
  return dataTime;
};

export const addPostFirebase = (notePost, selectPrivacy, userUid, userDisplayName, imgUrl) => {
  firebase.firestore().collection('posts').add({
    publication: notePost,
    privacy: selectPrivacy,
    userID: userUid,
    username: userDisplayName,
    timePost: postDate(),
    img: imgUrl,
  });
};

export const deletePostFirebase = id => (
  firebase.firestore().collection('posts').doc(id).delete()
);

export const editPostFirebase = (id, post, selectedPrivacy) => (
  firebase.firestore().collection('posts').doc(id).update({
    publication: post,
    privacy: selectedPrivacy,
    timePost: postDate(),
  })
);

export const getUserAndPublicPosts = (userId, callback) => {
  firebase.firestore().collection('posts').orderBy('timePost', 'desc')
    .onSnapshot((querySnapshot) => {
      const listOfPubs = [];
      querySnapshot.forEach(doc => listOfPubs.push({ id: doc.id, ...doc.data() }));
      callback(listOfPubs.filter(pub => ((pub.privacy === 'publico') || (pub.userID === userId))));
    });
};

// para cada elemento de sese list of pub ( publicacion) filtra con ciertas condiciones.
export const uploadImage = (file) => {
  const postImageRef = firebase.storage().ref().child(`images/${file.name}`);
  return postImageRef.put(file)
    .then(snapshot => snapshot.ref.getDownloadURL());
};
