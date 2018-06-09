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
  var twiml = new MessagingResponse();
  var body = request.body.Body.toLowerCase().trim();
  var msg;

  switch (body) {
    case 'confirm':
      msg = "thanks for confirming";
      break;
    case 'can\'t go':
      msg = "your reservation has been canceled";
      break;
    default:
      msg = "sorry, please respond with CONFIRM or CAN'T GO";
  }

  twiml.message(msg);

  response.writeHead(200, { 'Content-Type': 'text/xml' });
  response.end(twiml.toString());
});

exports.api = functions.https.onRequest(app);

/**********************
 * Firestore Triggers
 ***********************/
exports.sendSMS = functions.firestore
  .document('Reservations/{ReservatonId}')
  .onCreate((snap, context) => {
    const client = require('twilio')(CONFIG.sid, CONFIG.token);
    var res = snap.data();

    function convertTime(slot) {
      var time = slot.split(":");
      var hours = time[0];
      var minutes = time[1];
      var meredian = hours >= 12 ? "pm" : "am";

      //convert to ampm
      if (hours > 12) {
        hours -= 12;
      }
      if (hours == 00) {
        hours = 12;
      }

      return hours + ":" + minutes + meredian;
    }

    client.messages.create({
      body: `Your reservation with ${res.barberName} has been scheduled for ${convertTime(res.slot)}. Reply with CONFIRM or cancel at any time by replying CAN'T GO`,
      to: CONFIG.testNumber,  // Text this number
      from: CONFIG.twilioNumber // From a valid Twilio number
    })
      .then((message) => console.log(message.sid));

  });
