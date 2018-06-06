
import firebase from '@firebase/app';
import '@firebase/firestore';
import config  from './config.js';


// Initialize Firebase
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const firestore = firebase.firestore();

//timestamps in Cloud Firestore will be read back as Firebase Timestamp objects instead of as system Date Objects (required in the current version)
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

module.exports = firestore;