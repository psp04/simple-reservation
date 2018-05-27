const functions = require('firebase-functions');
const express = require('express');


/*******************
* REST API
********************/

const app = express();

// routes ---
app.get('/', (request, response)=> {
  response.send("Welcome to the API");
});

exports.api = functions.https.onRequest(app);


/*******************
* Other Functions
********************/

// exports.myFunctionName = functions.firestore
//     .document('users/marie').onWrite((change, context) => {
//       /* ... Your code here */
// });