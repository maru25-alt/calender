import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAMyTHLz6WbqQhWHl9Q9RipzsCwYR7FTeM",
  authDomain: "blog-comments-7b192.firebaseapp.com",
  databaseURL: "https://blog-comments-7b192.firebaseio.com",
  projectId: "blog-comments-7b192",
  storageBucket: "blog-comments-7b192.appspot.com",
  messagingSenderId: "102464096079",
  appId: "1:102464096079:web:3113be7954d83495dea73a",
  measurementId: "G-GQW60HEFZ0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
const  timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { auth, provider, storage , timestamp}
export default db