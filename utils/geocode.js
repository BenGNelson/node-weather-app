const request = require('request')
const config = require('./config.json');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${config.geocodeToken}&limit=1`
    request( {url, json: true }, (error, { body }) => {
        if (error) {
            // Request returned an error
            callback('Unable to connect to location services.')
        } else if (body.features.length === 0) {
            // Search did not return any locations
            callback('Unable to find location. Try another search.')
        } else {
            // Response received 
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode