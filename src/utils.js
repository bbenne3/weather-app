const fetch = require('node-fetch');
const http = require('http');
const accessKey = 'bfa51130768bd41ec7d6dd56a0b81c05';
const baseUrl = 'http://api.weatherstack.com/';

const parseWeatherResponse = (response) => response.json();
const handleWeatherResponse = (r) => {
  console.group('Weather for ', r.location.name);
  console.log('Temp', r.current.temperature, 'Feels like', r.current.feelslike);
  console.log('Weather is ', r.current['weather_descriptions'].join(', '));
  console.groupEnd();
};

const fetchWeather = (location, callback) => {
  const params = new URLSearchParams();
  params.append('query', location);
  params.append('access_key', accessKey);
  params.append('units', 'f');

  fetch(`${baseUrl}/current?${params.toString()}`)
    .then(parseWeatherResponse)
    .then(callback);
};

module.exports = {
  fetchWeather,
};
