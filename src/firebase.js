import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2hpJ_hI1HCnpBPS6gxtlXxOKMpw7YkLE",
  authDomain: "create-blogs.firebaseapp.com",
  projectId: "create-blogs",
  storageBucket: "create-blogs.appspot.com",
  messagingSenderId: "406778737974",
  appId: "1:406778737974:web:d67e2fffce216b52dd6f97",
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, timestamp };
