const CONFIG = require('./config.js');
const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

/**********************
 * HTTP Trigger
 ***********************/
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// root api ---
app.get('/api', (request, response) => {
  response.send('Welcome to the API');
});

// handle any message sent to Twilio ---
app.post('/api/sms', (request, response) => {
  const twiml = new MessagingResponse();
  const body = request.body.Body;

  twiml.message(`your message: ${body}`);

  response.writeHead(200, { 'Content-Type': 'text/xml' });
  response.end(twiml.toString());
});

exports.api = functions.https.onRequest(app);

/**********************
 * Firestore Triggers
 ***********************/
exports.sendSMS = functions.firestore
  .document('Reservations/{ReservatonId}')
  .onCreate((change, context) => {
    const client = require('twilio')(CONFIG.sid, CONFIG.token);

    client.messages.create({
      body: 'Your Reservation has been made.',
      to: CONFIG.testNumber,  // Text this number
      from: CONFIG.twilioNumber // From a valid Twilio number
    })
      .then((message) => console.log(message.sid));

  });
