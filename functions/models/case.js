const {getCurrentDate, parseDate} = require('../utils/date_manager')
const sequelizeConnector = require('../utils/orm_manager')
const { Sequelize, DataTypes, Model } = require('sequelize');
const SMSManager = require('../utils/sms_manager')
const TABLE_NAME = "cases"
const sequelizeConnection = sequelizeConnector()
const caseEntity = { fever: false, cough: false, sore: false, breathing: false, fatigue: false, diarrhea: false,
  travel: false, health_worker: false, personal_contact: false, terms_and_conditions: false, gender: "",
  name: "", phone_number: "", city: "", age: "", pain: false, neighborhood: "", created_at: getCurrentDate(), place_id: "",
  status: true}

const CaseReport  = sequelizeConnection.define('CaseReport', {
    fever: { type: DataTypes.BOOLEAN, allowNull: false},
    cough: { type: DataTypes.BOOLEAN, allowNull: false},
    sore: { type: DataTypes.BOOLEAN, allowNull: false},
    breathing: {type: DataTypes.BOOLEAN, allowNull: false},
    fatigue: {type: DataTypes.BOOLEAN, allowNull: false},
    diarrhea:{ type: DataTypes.BOOLEAN, allowNull: false},
    status:{ type: DataTypes.BOOLEAN, allowNull: false},
    travel: { type: DataTypes.BOOLEAN, allowNull: false},
    health_worker: {type: DataTypes.BOOLEAN, allowNull: false},
    personal_contact: {type: DataTypes.BOOLEAN, allowNull: false},
    pain: { type: DataTypes.BOOLEAN, allowNull: false},
    terms_and_conditions: { type: DataTypes.BOOLEAN, allowNull: false},
    gender: { type: DataTypes.STRING, allowNull: false},
    name: { type: DataTypes.STRING, allowNull: false},
    phone_number: { type: DataTypes.STRING, allowNull: false},
    city: { type: DataTypes.STRING, allowNull: false},
    neighborhood: { type: DataTypes.STRING, allowNull: false},
    age: {type: DataTypes.INTEGER, allowNull: false},
    created_at: {type: DataTypes.DATE},
    place_id: { type: DataTypes.STRING, allowNull: false},
  }, {
    tableName: TABLE_NAME,
    timestamps: false,
});

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
  let caseEntity = parseEntity(casePayload)
  return new Promise((resolve, reject) => {
    CaseReport.create(caseEntity).then(caseReport => {
      console.log(caseReport)
      SMSManager.deliverMessage()
      resolve({'message': 'home report generated', 'status_code': 200})
    }).catch((error) => {
      console.log(error)
      resolve({'message': 'error creating home report', 'status_code': 500})
    });
  });
}

let getCasesCount = (casePayload) => {
  return new Promise((resolve, reject) => {
    CaseReport.count().then((cases) => {
      console.log('counter :' + cases)
      resolve({'status_code': 200, 'counter': cases})
    }).catch((e) => {
      reject({'status_code': 500, 'counter': 0})
    })
  })
}

let getCases = (perPage = 1, page = 0) => {
  const offset = (perPage * page)
  return new Promise((resolve, reject) => {
    CaseReport.findAndCountAll({
        where: {
          status: true
        },
        offset: offset,
        limit: perPage
    }).then(function (result) {
      console.log('result info')
      console.log(result)
      console.log(result.count)
      console.log(result.rows)
      resolve(true)
    }).catch((e) => {
      console.log(e)
      reject(null)
    });
  })
}


module.exports = {
  saveCase,
  getCasesCount,
  getCases
}
