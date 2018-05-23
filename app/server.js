
import firebase from '@firebase/app';
import '@firebase/firestore';
import config  from './db/config.js';


// Initialize Firebase
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const firestore = firebase.firestore();

//timestamps in Cloud Firestore will be read back as Firebase Timestamp objects instead of as system Date Objects (required in the current version)
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

// get all documents in a collection
firestore.collection("Clients").get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
  });
});
