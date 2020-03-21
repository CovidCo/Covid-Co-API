const express = require('express');
const cors = require('cors');

const app = express();
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.post('/', async (req, res) =>{
  let reqBody = req.body
  res.status(200).json({'data': reqBody })
})

module.exports = app
