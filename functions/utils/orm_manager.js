const { Sequelize } = require('sequelize');
const functions = require('firebase-functions');
// connection params
const dbHost = functions.config().db.host
const dbUser =  functions.config().db.user
const dbPassword = functions.config().db.password
const dbDatabase = functions.config().db.db_name
// Option 2: Passing parameters separately (other dialects)
const sequelizeConnector = () => {
  return new Sequelize(dbDatabase, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'postgres'
  });
}


module.exports = sequelizeConnector
