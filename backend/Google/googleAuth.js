const { google } = require('googleapis');
const path = require('path');
const credentials = require(path.join(__dirname, 'credentials.json')); // 🔥 your downloaded JSON

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  SCOPES
);

const calendar = google.calendar({ version: 'v3', auth });

async function createGoogleMeet(summary, description, startTimeISO, endTimeISO) {
  try {
    const event = {
      summary: summary,
      description: description,
      start: {
        dateTime: startTimeISO,
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: endTimeISO,
        timeZone: 'Asia/Kolkata',
      },
      conferenceData: {
        createRequest: {
          requestId: Math.random().toString(36).substring(7), // Random ID
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: 1,
      requestBody: event,
    });

    return response.data.hangoutLink; // 🔥 Meet Link
  } catch (err) {
    console.error("❌ Google Meet creation error:", err);
    return "";
  }
}

module.exports = { createGoogleMeet };
