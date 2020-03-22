const moment = require('moment-timezone')

let getCurrentDate = () => {
  const momentTZ = moment().tz("America/Bogota")
  return momentDate = momentTZ.format("YYYY-MM-DD HH:mm:ss");
}

let parseDate = (inputDate) => {
  const momentTZ = moment(inputDate).tz("America/Bogota")
  return momentDate = momentTZ.format("YYYY-MM-DD HH:mm:ss");
}

module.exports = {
  getCurrentDate,
  parseDate
}
