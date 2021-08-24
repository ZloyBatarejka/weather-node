const request = require('request');

const forecast = ({longitude, latitude}, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=4fae5157753d08a891c7f71831a5723d&query=${encodeURIComponent(longitude)}, ${encodeURIComponent(latitude)}`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('No connection', null);
        } else if (body.error) {
            callback('No such Place', null);
        } else {
            callback(null, body.current);
        }
    });
}


module.exports = forecast;