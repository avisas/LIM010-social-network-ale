export const createUser = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

export const userCurrent = () => {
    console.log('userCurrent inicio: ');
    let user = firebase.auth().currentUser;
    console.log('userCurrent fin: '+ user);
    return user;
}

export const signIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

export const signOutLogin = () => firebase.auth().signOut();

export const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
};

export const signInWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider);
};