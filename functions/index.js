const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
admin.initializeApp();

const app = express();
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.post('/', async (req, res) =>{
  let reqBody = req.body
  res.status(200).json({'data': reqBody })
})


exports.contacts = functions.https.onRequest(app)
