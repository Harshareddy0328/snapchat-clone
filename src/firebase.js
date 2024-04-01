import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA3q4cqecMHzWCxVFzfUPqfFv5g7MRj2U4",
    authDomain: "snapchat-clone-f3a74.firebaseapp.com",
    projectId: "snapchat-clone-f3a74",
    storageBucket: "snapchat-clone-f3a74.appspot.com",
    messagingSenderId: "456757814806",
    appId: "1:456757814806:web:bed19f3ae471d5a4d8b737"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db, auth, storage, provider};