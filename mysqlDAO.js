var mysql = require('promise-mysql') // wrapper for pool
const MongoClient = require('mongodb').MongoClient  // connection string for mongo
const url = 'mongodb://localhost:27017'  // url to connecet to

var pool // variable
const dbName = 'headsOfStateDB'
const collName = 'headsOfState'

var headsOfStateDB
var headsOfState

mysql.createPool({  //pool
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Albert',  // details from mysql
    database: 'geography',
    insecureAuth: true,
    multipleStatements: true
})
    .then((result) => {
        pool = result   // run if successful 
    })
    .catch((error) => {
        console.log(error)  // run if fails
    });
                                                            
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
        headsOfStateDB = client.db(dbName) // will connect 
        headsOfState = headsOfStateDB.collection(collName)
    })
    .catch((error) => {  // wont connect
        console.log(error)
    })

    var getCountries = function () {
        return new Promise((resolve, reject) => {
            pool.query('Select * from country')  // query method
                .then((result) => {  // result from country table
                    resolve(result)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    var getCities = function () {
        return new Promise((resolve, reject) => {
            pool.query('Select * from city')
                .then((result) => {  //if promise successful
                    resolve(result)
                })
                .catch((error) => {  //if promise fails
                    reject(error)
                })
        })
    }

    var getHeadsOfStates = function () {
        return new Promise((resolve, reject) => {
            var cursor = headsOfState.find()
            if (cursor.cursorState.cmd.find != 'headsOfStateDB.headsOfState') {  //returns array of docs
                reject('Wrong DB/Collection')
            } else {
                cursor.toArray()
                    .then((documents) => {
                        resolve(documents)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            }
        })
    
    }

    module.exports = { getCountries, getCities, getHeadsOfStates }