const functions = require('firebase-functions');
const admin = require('firebase-admin');
const homeReports = require('./apis/home_reports')
const cases = require('./apis/cases')
const sendMsm = require('./apis/send_msm')

admin.initializeApp();

exports.cases = functions.https.onRequest(cases)
exports.homeReports = functions.https.onRequest(homeReports)
exports.sendMsm = functions.https.onRequest(sendMsm)
