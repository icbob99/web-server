const request = require('postman-request')


const api_access_key = 'acbb12f35f5bb4486f5e3ff5e19c3f9d'
const forecast = ( latitude, longitude, callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=${api_access_key}&query=${latitude}, ${longitude}`

    const params = {
        url: url, 
        json: true
    }

    request(params, (error, response, body) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `It is ${body.current.weather_descriptions[0]} in ${body.location.name} of ${body.location.country}. It is currently ${body.current.temperature} degress out. There is a ${body.current.precip} % chance of rain. And the humidity is ${body.current.humidity}`)   
        }
    })
} 

module.exports = forecast