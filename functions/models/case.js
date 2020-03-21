const cases = require('../utils/db_manager')

const caseEntity = {
  case_data: { temperature: 0, cough: 0, sore: 0, breathing: 0, fatigue: 0, diarrhea: 0 },
  associates: { travel: 0, health_worker: 0, personal_contact: 0 },
  contact: { name: "",  Phone_number: 0, city: "", age: 0, Neighborhood: "", lat: 0, lng: 0}
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

module.exports = {
  parseEntity
}
