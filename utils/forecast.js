const request = require('request')
const config = require('./config.json')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/${config.forecastToken}/${latitude},${longitude}`

    request( {url, json: true}, (error, { body }) => {
        if (error) {
            // Request returned an error
            callback('Unable to connect to weather service.')
        } else if (body.error) {
            // No location for provided latitude and longitude
            callback('Unable to find location.')
        } else {
            // Response received
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.
            The high for today is ${body.daily.data[0].temperatureHigh} and the low is ${body.daily.data[0].temperatureLow}.`)
        }
    } )
}

module.exports = forecast