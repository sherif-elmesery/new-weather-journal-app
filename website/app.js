/* Global Variables */
const inputZip = document.querySelector('#zip');
console.log(inputZip);
const mainDiv = document.querySelector('#entryHolder');
console.log(mainDiv);
const dateDiv = document.querySelector('#date');
const temDiv = document.querySelector('#temp');
const contentDiv = document.querySelector('#content');
const generateBtn = document.querySelector('#generate');
const url = `https://api.openweathermap.org/data/2.5/weather?`;
const api = `&appid=6994f5dd1ea93df87da950f2d8b89a22`;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// create event listener when click on generate button
generateBtn.addEventListener('click', getWeather);
// start asynchronus function to ubdate the client side
async function getWeather(z) {
    try {
        const zipValue = inputZip.value
        const clientFeeling = document.querySelector("#feelings").value
        if (zipValue === "") {
            alert('zip code can not be empty')
        } else {


            getWeatherData()
                .then((temperature) => {
                    return postWeather(temperature, clientFeeling)
                }).then((data) => {
                    async () => {
                        const newWeather = await fetch('/weather')
                        const newData = await newWeather.json()
                        console.log(newData)
                        return newData;
                    }


                }).then((final) => {

                    ubdateUi(final)

                })




        }
    } catch (error) {
        console.log("ERROR", error)
    }
}
// get data from api
async function getWeatherData() {
    const res = await fetch(`${url}zip=${inputZip.value}${api}&units=metric`)
    const weather = await res.json()
    console.log(weather)
    const temperature = weather.main.temp
    console.log(temperature)
    //console.log(clientFeeling)
    return temperature;

}
// send data to the server
async function postWeather(temperature, clientFeeling) {
    await fetch('/weatherData', {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            Date: newDate,
            temperature,
            clientFeeling,

        })
    })
}
// ubdate user interface
async function ubdateUi(newDate, temperature, clientFeelings) {
    const newWeather = await fetch('/weather')
    const newData = await newWeather.json()
    dateDiv.innerHTML = newData.Date;
    temDiv.innerHTML = newData.temperature;
    contentDiv.innerHTML = newData.clientFeeling;




}
    










