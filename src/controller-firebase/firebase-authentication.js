
export const createUser = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

export const userCurrent = () => firebase.auth().currentUser;

export const signIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);
