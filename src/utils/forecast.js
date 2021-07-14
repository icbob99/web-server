const request = require('postman-request')


const api_access_key = 'acbb12f35f5bb4486f5e3ff5e19c3f9d'
const forecast = ( latitude, longitude, callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=${api_access_key}&query=${latitude}, ${longitude}`

    const params = {
        url: url, 
        json: true
    }

    request(params, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `It is ${response.body.current.weather_descriptions[0]} in ${response.body.location.name} of ${response.body.location.country}. It is currently ${response.body.current.temperature} degress out. There is a ${response.body.current.precip} % chance of rain.`)   
        }
    })
} 

module.exports = forecast