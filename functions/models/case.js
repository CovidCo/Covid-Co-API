const DbManager = require('../utils/db_manager')
const {getCurrentDate} = require('../utils/date_manager')
const TABLE_NAME = "cases"

const caseEntity = { temperature: false, cough: false, sore: false, breathing: false, fatigue: false, diarrhea: false,
  travel: false, health_worker: false, personal_contact: false, name: "", phone_number: "", city: "",
  age: false, neighborhood: "", created_at: getCurrentDate() }

let getFieldsList = (baseEntity) => {
  let data = []
  let columns = []
  Object.keys(baseEntity).forEach(function(key){
    let value = baseEntity[key]
    if (value == 'true' || value == 'false'){
      console.log('bool detected')
      let boolValue = value == 'true' ? true: false
      data.push(boolValue)
    }else {
      data.push(value)
    }
    columns.push(key)
  })
  return {data, columns}
}

let parseEntity = (casePayload) => {
    let baseEntity = {...caseEntity}
    Object.keys(casePayload).forEach(function(key) {
      if (key in baseEntity){
        baseEntity[key] = casePayload[key]
      }
    })
    return baseEntity
}

let saveCase = (casePayload) => {
  let dbManager = new DbManager()
  let caseEntity = parseEntity(casePayload)
  let transactionData = getFieldsList(caseEntity)
  let caseInfo = null
  console.log(transactionData)
  const insertCommand = `INSERT INTO ${TABLE_NAME} (${transactionData['columns'].toString()}) VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);`
  console.log(insertCommand)
  console.log(caseEntity)
  console.log(transactionData)
  dbManager.executeTransaction(insertCommand, transactionData['data']).then((response) => {
    console.log(response)
    caseInfo = response
}).catch((e) => {
    console.log(e)
    caseInfo = {'error': 'error creating case'}
  })
  return caseInfo
}

let getCase = (casePayload) => {
  let dbManager = new DbManager()
  let caseInfo = null
  dbManager.executeTransaction("SELECT COUNT(*) FROM cases").then((response) => {
    caseInfo = response
  }).catch((e) => {
    console.log(e)
    caseInfo = {'error': 'error fetching case'}
  })
  return caseInfo
}

module.exports = {
  parseEntity,
  saveCase
}
