const DbManager = require('../utils/db_manager')
const {getCurrentDate} = require('../utils/date_manager')

const caseEntity = {
  case_data: { temperature: 0, cough: 0, sore: 0, breathing: 0, fatigue: 0, diarrhea: 0 },
  associates: { travel: 0, health_worker: 0, personal_contact: 0 },
  contact: { name: "",  Phone_number: 0, city: "", age: 0, Neighborhood: "", lat: 0, lng: 0},
  created_at: getCurrentDate()
}

let mergeKeys = (baseEntity, casePayload, baseKey) => {
  Object.keys(casePayload[baseKey]).forEach(function(key) {
    if (key in baseEntity[baseKey]){
        baseEntity[baseKey][key] = casePayload[baseKey][key]
    }
  })
  return baseEntity
}

let parseEntity = (casePayload) => {
    let baseEntity = {...caseEntity}
    if ('case_data' in casePayload){
      baseEntity = mergeKeys(baseEntity, casePayload, 'case_data')
    }
    if ('associates' in casePayload){
      baseEntity = mergeKeys(baseEntity, casePayload, 'associates')
    }
    if ('contact' in casePayload){
      baseEntity = mergeKeys(baseEntity, casePayload, 'contact')
    }
    return baseEntity
}

// let saveCase = (casePayload) => {
// }

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
  getCase
}
