const functions = require('firebase-functions');
const express = require('express');
var bodyParser = require('body-parser');
const twilio = require('twilio');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const CONFIG = require('./config.js');


/*******************
* REST API
********************/

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// routes ---
app.get('/api', (request, response) => {
  response.send("Welcome to the API");
});

//takes in any reply message
app.post('/api/sms', (request, response) => {
  const twiml = new MessagingResponse();
  const body = request.body.Body;

  twiml.message(`you just sent: ${body} to simple reservation app`);

  response.writeHead(200, {'Content-Type': 'text/xml'});
  response.end(twiml.toString());
});



exports.api = functions.https.onRequest(app);


/*******************
* Other Functions
********************/

// exports.smstest = functions.firestore.document('Reservation').onWrite((change, context) => {
//   var client = new twilio(CONFIG.sid, CONFIG.token);

//   client.messages.create({
//     body: 'Hello from Node',
//     to: 'number',  // Text this number
//     from: 'number' // From a valid Twilio number
//   })
//     .then((message) => console.log(message.sid));

// });