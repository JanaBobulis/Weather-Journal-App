/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&units=metric&appid=e4556829179c13d93b039efb3a3c764f';

//Write an async function in app.js that uses fetch() to make a GET request to the OpenWeatherMap API.
const getData = async (baseURL, zip, key)=>{
    const res = await fetch(baseURL + zip + key)
    try {
        const projectdata = await res.json();
        console.log(projectdata);
        return projectdata;
    } catch(error) {
        console.log("error", error);
    }
}

// Event listener to add function to existing HTML DOM element with a callback function to execute when it is clicked. Inside that callback function call your async GET request with the parameters: base url user entered zip code (see input in html with id zip),personal API key
document.getElementById('generate').addEventListener('click', performAction);
function performAction(e) {
    let zip = document.getElementById('zip').value;
    let response = document.getElementById('feelings').value;
    getData(baseURL, zip, apiKey)

    .then(function(data){
        console.log(data)
        postData('/addData', {temp: data.temp, response: data.response, date:newDate} );
    })
    .then(updateUI())
    }

// After your successful retrieval of the weather data, you will need to chain another Promise that makes a POST request to add the API data, as well as data entered by the user, to your app. You will need to write another async function to make this POST request. The function should receive a path and a data object. The data object should include temperature, date, user response
const updateUI = async() => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('zip').innerHTML = allData.temperature;
        document.getElementById('feelings').innerHTML = allData.response;
    }catch(error){
        console.log("error", error);
    }
}

//Finally, chain another Promise that updates the UI dynamically Write another async function that is called after the completed POST request. This function should retrieve data from our app, select the necessary elements on the DOM (index.html), and then update their necessary values to reflect the dynamic values for: Temperature, Date, User input
const postData = async ( url ='', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
            return newData;
    } catch(error) {
        console.log('error', error);
    }
}
//postData('/add', {answer:42});

