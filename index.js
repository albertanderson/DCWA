var express = require('express')
var app = express()
var mysqlDAO = require('./mysqlDAO')
var bodyParser = require('body-parser')


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:false}))


app.get('/', (req, res)=>{  // call back function
    res.sendFile(__dirname + "/views/index.html")
 })
 
 app.get('/showCountries', (req, res)=>{  //get show countries
     mysqlDAO.getCountries()
     .then((result)=>{
         res.render('showCountries', {countries:result})
     })
     .catch((error)=>{
         res.send(error)
         
     })
 })

 app.get('/showCities', (req, res)=>{
    mysqlDAO.getCities()
    .then((result)=>{
        res.render('showCities', {cities:result})
    })
    .catch((error)=>{
        {
            res.send(error)
        }
    })
})


app.get('/showHeadsOfState', (req, res)=>{
    mysqlDAO.getHeadsOfStates()
    .then((documents)=>{
        res.render('showHeadsOfState', {heads:documents})
    })
    .catch((error)=>{
        res.send('<h1> Error Message</h1>');
    })
})

 app.listen(3000, () => {
    console.log("Listening on port 3000")
})