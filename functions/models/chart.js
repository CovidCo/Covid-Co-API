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

let getHomeReportByPlaceId = () => {
  return new Promise((resolve, reject) => {
    HomeReport.findAll({
      attributes: ['city', [Sequelize.fn('COUNT', 'city'), 'cityCount']], group: ["city"]
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

module.exports = {
  getHomeReportByPlaceId
}

