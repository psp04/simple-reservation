
const CONFIG = require('../config.js');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const functions = require('firebase-functions');
const admin = require('firebase-admin');

//init admin sdk
admin.initializeApp(functions.config().firebase);
var db = admin.firestore();

module.exports = function (request, response) {
  var twiml = new MessagingResponse();
  var body = request.body.Body.toLowerCase().trim();
  var fromNumber = request.body.From;


  //search reservations
  var reservations = db.collection('Reservations');
  var query = reservations.where("clientPhone", "==", request.body.From).get()
    .then(snapshot => {
        if(snapshot.empty){
          twiml.message(`there is no reservation associated with this number. Please visit our site to make a reservation: ${CONFIG.reservationURL}`);
          response.writeHead(200, { 'Content-Type': 'text/xml' });
          response.end(twiml.toString());
        }else{
          snapshot.forEach(doc => {
            var matchingRes = reservations.doc(doc.id);
            var msg;
  
            //Handle diffrent Responses from client
            switch (body) {
              case 'yes':
                var setWithOptions = matchingRes.set({
                  status: "smsConfirm"
                }, { merge: true });
                msg = `thanks for confirming #${doc.id}`;
                break;
              case 'no':
                var deleteDoc = matchingRes.delete();
                msg = "your reservation has been canceled";
                break;
              default:
                msg = `sorry, please respond with YES to confirm or NO to cancel your reservation. #${doc.id}`;
            }
  
            twiml.message(msg);
            response.writeHead(200, { 'Content-Type': 'text/xml' });
            response.end(twiml.toString());
          });
        }
        
      
    })
    .catch(err => {
      
    });
}


