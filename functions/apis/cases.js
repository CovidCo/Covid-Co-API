const express = require('express');
const cors = require('cors');
const {saveCase, getCases} = require('../models/case')

const app = express();
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Content-Type', 'application/json');
    next();
};

app.use(allowCrossDomain);

app.post('/', async (req, res) =>{
  let payload = req.body.data
  saveCase(payload).then((response) =>{
    res.status(response['status_code']).json({'data': response['message']})
  }).catch((error) => {
    res.status(error['status_code']).json({'data': error['message']})
  })
})

app.get('/', async (req, res) =>{
  console.log(req.query)
  getCases(req.query).then((response) =>{
    res.status(response['status_code']).json({'data': response['counter']})
  }).catch((error) => {
    res.status(error['status_code']).json({'data': error['counter']})
  })
})


module.exports = app
