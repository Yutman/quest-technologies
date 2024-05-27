import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword, 
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'; // 'doc' is needed to get a document instance.'getDoc' is needed to get a snapshot of the document instance. 'setDoc' is needed to set a document instance.


const firebaseConfig = {
  apiKey: "AIzaSyAgzPIOQEBSOE79uQwRmV7U4Mh6W4PhXWU",
  authDomain: "quest-technologies-db.firebaseapp.com",
  projectId: "quest-technologies-db",
  storageBucket: "quest-technologies-db.appspot.com",
  messagingSenderId: "111317873205",
  appId: "1:111317873205:web:150f99fabb7c1a9e5e777c"
}; // My web app's Firebase configuration

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider(); // Google authentication provider is essentially a class that we get from firebase authentication


googleProvider.setCustomParameters({ 
        prompt: 'select_account' 
}); // always trigger the google popup whenever we use the google auth provider for authentication and sign in

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore(firebaseApp); // This is the database instance that we will use to interact with the firestore database

export const createUserDocumentFromAuth = async (
  userAuth, 
  additionalInformation = {}
) => {
  if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapShot = await getDoc(userDocRef);
    

    if (!userSnapShot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      } catch (error) {
        console.log('Error creating user', error.message);
      }
    }

    return userDocRef;
    // if user data does not exist in the database, create a new user document
    // if user data exists in the database, return the user document
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  //Check if email and password are provided  
  if (!email || !password) 
      return;

//Create a new user with the provided email and password
  return await createUserWithEmailAndPassword(auth, email, password);
}
