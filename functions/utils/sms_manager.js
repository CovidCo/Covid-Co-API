const AWS = require('aws-sdk');
const functions = require('firebase-functions');
// keys
const accessKeyId = functions.config().aws.access_key_id
const secretAccessKey =  functions.config().aws.secret_access_key

let deliverMessage = async (phoneNumber) => {
    var params = {
        Message: 'Hola, se ha generado un nuevo caso',
        PhoneNumber: '+' + phoneNumber.toString()
    };
    var messageAttributes = {
        attributes: {
            "DefaultSMSType": "Transactional"
        }
    }
    // code credit AWS team
    // https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sns-examples-publishing-messages.html
    try {
        let publishTextMessagePromise = new AWS.SNS({apiVersion: '2010-03-31' ,
        											accessKeyId: accessKeyId,
        											secretAccessKey: secretAccessKey,
        											region: 'us-east-1' })
        await publishTextMessagePromise.setSMSAttributes(messageAttributes).promise()
        let messagePromise = publishTextMessagePromise.publish(params).promise();
        return  messagePromise
    } catch (e) {
        console.log(e)
        return {error: true, e}
    }
}

module.exports = {
  deliverMessage
}
