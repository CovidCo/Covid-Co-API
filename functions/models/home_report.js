const {getCurrentDate, parseDate} = require('../utils/date_manager')
const sequelizeConnector = require('../utils/orm_manager')
const { Sequelize, DataTypes, Model } = require('sequelize');
const TABLE_NAME = "home_reports"
const sequelizeConnection = sequelizeConnector()
const HomeReport  = sequelizeConnection.define('HomeReport', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    id: {
      type: DataTypes.BIGINT,
      primaryKey: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    homeAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE
    },
    placeId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: TABLE_NAME
});
const homeReportEntity = {email: "", city: "", place_id: "", home_at: "" , created_at: getCurrentDate()}

// utils
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

// business logic

let getHomeReportByPlaceId = () => {
  return new Promise((resolve, reject) => {
    HomeReport.findAll({
      attributes: ['city', [Sequelize.fn('COUNT', 'place_id'), 'cityCount']], group: ["place_id"]
    }).then(function (result) {
      let cityCounter = {}
      result.forEach(function(item) {
        cityCounter[item.get('city')] = item.get('cityCount')
      })
      resolve(cityCounter)
    }).catch((e) => {
      reject(null)
      console.log(e)
    });
  })
}

let getHomeReportCount= () => {
  return new Promise((resolve, reject) => {
    HomeReport.count().then(people => {
      resolve(people)
    }).catch((e) => {
      console.log(e)
      reject(0)
    })
  })
}

let saveHomeReport = (homeReportPayload) => {
  let dbManager = new DbManager()
  let homeReportEntity = parseEntity(homeReportPayload)
  return new Promise((resolve, reject) => {
    HomeReport.create(homeReportEntity).then(homeReport => {
      console.log(homeReport)
      resolve({'message': 'home report generated', 'status_code': 200})
    }).catch((error) => {
      resolve({'message': 'error creating home report', 'status_code': 500})
    });
  });
}

module.exports = {
  getHomeReportByPlaceId,
  getHomeReportCount,
  saveHomeReport
}

