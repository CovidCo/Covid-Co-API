const express = require('express');
const cors = require('cors');
const SMSManager = require('../utils/sms_manager')

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
	console.log(req.body.phone);
	var result = SMSManager.deliverMessage(req.body.phone);
	if(!result.error){
		res.status(200).json({'data': result})
	} else {
		res.status(500).json({error: result.e});
	}
})

module.exports = app