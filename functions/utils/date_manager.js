const moment = require('moment-timezone')

let getCurrentDate = () => {
  const momentTZ = moment().tz("America/Bogota")
  return momentDate = momentTZ.format("YYYY-MM-DD HH:mm:ss");
}

let parseDate = (inputDate) => {
  console.log('input date: ' + inputDate)
  return  moment(inputDate, 'DD/MM/YYYY', true)
}

module.exports = {
  getCurrentDate,
  parseDate
}
