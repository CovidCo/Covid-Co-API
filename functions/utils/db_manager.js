const { Client } = require('pg')
class DbManager {
    constructor() {
      this.dbClient = new Client({
        user: 'dbuser',
        host: 'database.server.com',
        database: 'mydb',
        password: 'secretpassword',
        port: 3211,
      })
      this.dbClient.connect()
    }

    commitTransaction(sqlStatement){
      this.dbClient.query(sqlStatement).then((res) => {
        console.log(res.rows[0])
      }).catch((e) => {
        console.error(e.stack)
      })
    }
}

module.exports = DbManager
