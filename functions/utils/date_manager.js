const moment = require('moment-timezone')

const momentTZ = moment().tz("America/Bogota")

let getCurrentDate = () => {
return momentDate = momentTZ.format("YYYY-MM-DD HH:mm:ss");
}

module.exports = {
  getCurrentDate
}
