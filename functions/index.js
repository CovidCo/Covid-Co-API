const functions = require('firebase-functions');
const admin = require('firebase-admin');
const reports = require('./apis/reports')
const cases = require('./apis/cases')

admin.initializeApp();

exports.cases = functions.https.onRequest(cases)
exports.reports = functions.https.onRequest(reports)
