import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCM1Upi0ex4sBFTWuk6xZVMQbq1DjSfOsc",
  authDomain: "my-whats-app-7b462.firebaseapp.com",
  projectId: "my-whats-app-7b462",
  storageBucket: "my-whats-app-7b462.appspot.com",
  messagingSenderId: "1034964613578",
  appId: "1:1034964613578:web:f203fc68ae5f1ceec7b733"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();
export default db;
export {auth,provider};