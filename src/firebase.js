import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBm0oqkghr79FsxeztJGcu2YAVAnoz9QAs",
  authDomain: "calender-app-9d3e2.firebaseapp.com",
  projectId: "calender-app-9d3e2",
  storageBucket: "calender-app-9d3e2.appspot.com",
  messagingSenderId: "716527449284",
  appId: "1:716527449284:web:25cace782303b00853c591",
  measurementId: "G-3T4930JECP"

};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
const  timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { auth, provider, storage , timestamp}
export default db