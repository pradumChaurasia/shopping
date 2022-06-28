import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config =  {
  apiKey: "AIzaSyCRe0qxRs7LoWswJmMHP-31PnntEWMTfxs",
  authDomain: "shopping-bfc29.firebaseapp.com",
  projectId: "shopping-bfc29",
  storageBucket: "shopping-bfc29.appspot.com",
  messagingSenderId: "687867810102",
  appId: "1:687867810102:web:022af0d98ac217adaaa397",
  measurementId: "G-G6J2YVLZ4G"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; //if the user auth object does not exists then return null
//if userAuth does exists then we are querying inside the firestore for the document to see if it already exists


//A query is a request we make to firestore to give us something from the db44

  const userRef = firestore.doc(`users/${userAuth.uid}`);
//fire store return two types of object :references and snapshots
  const snapShot = await userRef.get();
//if snapshot does not exists we then actuallly create a piece of adat
//using userRef
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;//the data we want to use or the property we want to store

    const createdAt = new Date();//make sure in db that when we made the document
    
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); //this give access to new googleprovider auth class from the authenication library
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
//we can use this signInwithGoogle inside the sign-in component
export default firebase;