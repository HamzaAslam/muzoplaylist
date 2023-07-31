import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAIEo2MUATFoIsC_VN11RuP-D07S0AdDgc",
  authDomain: "muzo-playlist.firebaseapp.com",
  projectId: "muzo-playlist",
  storageBucket: "muzo-playlist.appspot.com",
  messagingSenderId: "761299344769",
  appId: "1:761299344769:web:291658501edae5ca1f9c80",
};
//Init firebase
firebase.initializeApp(firebaseConfig);

//init firbase services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, timeStamp, projectStorage };
