import firebase from "firebase";


const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBs7BWOBC_lJRtvFJUW-HakcX5TzdheEjM",
  authDomain: "instagram-react-firebase-46fd0.firebaseapp.com",
  projectId: "instagram-react-firebase-46fd0",
  storageBucket: "instagram-react-firebase-46fd0.appspot.com",
  messagingSenderId: "181638665534",
  appId: "1:181638665534:web:86bb2b43c3512c84ff086f",
  measurementId: "G-ZNFM3XY43H",
});

const db=firebaseApp.firestore()

const auth=firebaseApp.auth()
const storage = firebaseApp.storage();

export {db,auth,storage}