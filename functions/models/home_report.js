const DbManager = require('../utils/db_manager')
const {getCurrentDate, parseDate} = require('../utils/date_manager')
const TABLE_NAME = "home_reports"
const homeReportEntity = {email: "", city: "", place_id: "", home_at: "" , created_at: getCurrentDate()}

let getFieldsList = (baseEntity) => {
  let data = []
  let columns = []
  Object.keys(baseEntity).forEach(function(key){
    let value = baseEntity[key]
    data.push(value)
    columns.push(key)
  })
  return {data, columns}
}

let parseEntity = (homeReportPayload) => {
    let baseEntity = {...homeReportEntity}
    Object.keys(homeReportPayload).forEach(function(key) {
      if (key in baseEntity){
        if (key == 'home_at'){
          baseEntity['home_at'] = parseDate(homeReportPayload['home_at'])
        } else {
          baseEntity[key] = homeReportPayload[key]
        }
      }
    })
    return baseEntity
}

let saveHomeReport = (homeReportPayload) => {
  let dbManager = new DbManager()
  let homeReportEntity = parseEntity(homeReportPayload)
  let transactionData = getFieldsList(homeReportEntity)
  const insertCommand = `INSERT INTO ${TABLE_NAME} (${transactionData['columns'].toString()})
    VALUES ($1, $2, $3, $4, $5);`
   console.log(transactionData)
  return new Promise((resolve, reject) => {
    dbManager.executeTransaction(insertCommand, transactionData['data']).then((response) => {
      console.log(response)
      console.log(response['rowCount'])
      if (response['rowCount'] == 1){
        resolve({'message': 'home report generated', 'status_code': 200})
      } else {
        reject({'message': 'row not affected', 'status_code': 500})
      }
    }).catch((e) => {
      console.log(e)
      resolve({'message': 'error creating home report', 'status_code': 500})
    })
  })
}

let getCounter = () => {
  let dbManager = new DbManager()
  const selectCommand = `SELECT COUNT(*) FROM ${TABLE_NAME};`
  return new Promise((resolve, reject) => {
  dbManager.executeQuery(selectCommand).then((response) => {
      const counter = response['rows'][0]['count']
      resolve({'counter': counter, 'status_code': 200})
    }).catch((e) => {
      console.log(e)
      resolve({'counter': 0, 'status_code': 500})
    })
  })
}


module.exports = {
  saveHomeReport,
  getCounter
}

