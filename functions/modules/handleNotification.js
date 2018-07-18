const CONFIG = require('../config.js');
const client = require('twilio')(CONFIG.sid, CONFIG.token);

/**
 * @description Converts time from 24hour HTML format to 12hours
 * @param {string} slot – string in 24hour format "20:12".
 * @returns {string} the time in 12 hour format "8:12pm"
 */
function convertTime(slot) {
  var time = slot.split(':');
  var hours = time[0];
  var minutes = time[1];
  var meredian = hours >= 12 ? 'pm' : 'am';

  if (hours > 12) {
    hours -= 12;
  }
  if (hours == 00) {
    hours = 12;
  }

  return hours + ':' + minutes + meredian;
}


module.exports = function (snap, context) {
  var res = snap.data();

  // Send message to client
  client.messages
    .create({
      body: `Your reservation with ${res.barberName} has been scheduled for ${convertTime(res.slot)}. Reply with YES to confirm or NO to cancel at any time`,
      to: res.clientPhone, // Text this number
      from: CONFIG.twilioNumber // From a valid Twilio number
    })
    .then(message => console.log(message.sid));
}