const { Client } = require('pg')
const functions = require('firebase-functions');

class DbManager {
    constructor() {
      this.dbClient = new Client({
        host: functions.config().db.host,
        user: functions.config().db.user,
        password: functions.config().db.password,
        database: functions.config().db.db_name
      })
      this.dbClient.connect()
    }

    executeTransaction(sqlStatement){
      return new Promise((resolve, reject) => {
        this.dbClient.query(sqlStatement).then((res) => {
          console.log(res)
          resolve(res)
        }).catch((e) => {
          console.error(e.stack)
          reject(e)
        })
      })
    }
}

module.exports = DbManager