import firebase from 'firebase';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  apiKey: process.env.firebaseApiKey,
  authDomain: process.env.firebaseAuthDomain,
  databaseURL: process.env.firebaseDbUrl,
  projectId: process.env.firebaseProjectId,
  storageBucket: process.env.firebaseStorageBucket,
  messagingSenderId: process.env.firebaseSenderId
};
firebase.initializeApp(config);

const firebaseAuth = firebase.auth();
const db = firebase.database();
const usersRef = db.ref('users');

module.exports = {
    firebase,
    firebaseAuth,
    usersRef
};