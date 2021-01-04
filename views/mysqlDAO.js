var mysql = require('promise-mysql')

var pool 

 mysql.createPool({
    connectionLimit : 3,
    host            : 'localhost',
    user            : 'root',
    password        : 'Albert',
    database        : 'geography'
    
   
})
.then((result) => {
    pool = result
})
.catch((error) =>{
    console.log(error)


})

var getCountry =function(){
    return new Promise((resolve,reject)=>{
        pool.query('select * from country')
            .then((result)=>{
                resolve(result)
            })
            .catch(error =>{
                reject(error)
            })
    })
}
module.exports = {getCountry}