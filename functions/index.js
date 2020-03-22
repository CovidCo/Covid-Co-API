const functions = require('firebase-functions');
const admin = require('firebase-admin');
const homeReports = require('./apis/home_reports')
const cases = require('./apis/cases')

admin.initializeApp();

exports.cases = functions.https.onRequest(cases)
exports.homeReports = functions.https.onRequest(homeReports)
