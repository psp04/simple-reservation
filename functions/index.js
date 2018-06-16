const CONFIG = require('./config.js');
const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const handleSms = require('./modules/handleSms');
const handleNotification = require('./modules/handleNotification');

// Express Setup and Config
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// handle any message sent to Twilio
app.post('/api/sms', handleSms);

// REST API Function
exports.api = functions.https.onRequest(app);

// Send Notification when Reservation is Made
exports.notification = functions.firestore.document('Reservations/{ReservatonId}').onCreate(handleNotification);
