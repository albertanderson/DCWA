var express = require('express')
var mysqlDAO =require ('./mysqlDAO')

var app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/index.html")
 })

app.get('/showCountry',(req,res)=>{
    mysqlDAO.getCountry()
    .then((result) =>{
        console.log(result)
        res.render("showCountry",{country:result})
    })
    .catch((error)=>{
        res.send(error)
    })
})

app.listen(3000, () => {
    console.log("Listening on port 3000")

})