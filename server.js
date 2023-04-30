// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors")
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));
const port = 3000
// Setup Server
app.get('/')
app.listen(port,listen)
function listen(){
    console.log(`listening at loval host ${port}`)
}
app.get('/weather',(req,res)=>{
    res.send(projectData)
})
app.post('/weatherData',(req,res)=>{
    projectData = {...req.body}
    res.send()
})

