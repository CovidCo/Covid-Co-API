const express = require('express');
const cors = require('cors');

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
  let reqBody = req.body
  res.status(200).json({'data': reqBody })
})

module.exports = app
