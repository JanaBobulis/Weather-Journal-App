// Setup empty JS object to act as endpoint for all routes
let projectData = {};
console.log('hello!');
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { response } = require('express');
app.use(cors()); //connecting project dependencies 
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3030; 
const server = app.listen(port, listening);
function listening(){
    console.log("server running");
    console.log(`running on localhost: ${port}`);
};

// GET route
app.get('/all', getData);
 function getData(req, res) {
    console.log(req)
    res.send(projectData);
};

//POST route with three pieces of data 

app.post('/add', function (req, res){
     newData = { 
          temperature: req.body.temperature,
           date: req.body.date,
           response: req.body.response
        }
        projectData = newData;
        console.log(projectData);
        res.send(projectData);

});
