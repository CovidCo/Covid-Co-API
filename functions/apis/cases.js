const express = require('express');
const cors = require('cors');
const {parseEntity} = require('../models/case')

const app = express();
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.post('/', async (req, res) =>{
  let payload = req.body.data
  payload = parseEntity(payload)
  res.status(200).json({'data': payload})
})

module.exports = app
