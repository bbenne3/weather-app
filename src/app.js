const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fetchWeather = require(path.join(__dirname, 'utils')).fetchWeather;


const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const port = process.env.PORT || 3001;

const app = express();

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'BB',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'You need help!',
    name: 'BB',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Not me',
  });
});

app.get('/weather', (req, res) => {
  const {
    address,
  } = req.query;

  if (!address) {
    return res.status(400).json({
      error: 'Address needed to get the weather',
    });
  }
  fetchWeather(address, (weather) => {
    res.json({
      forecast: weather,
      address,
    });
  });
});

app.get('/products', (req, res) => {
  const {
    type,
  } = req.query;

  if (!type) {
    return res.status(400).json({
      error: 'You need to provide a product type',
    });
  }

  res.json({
    products: [],
    type,
  });
});

app.get('*', (req, res) => {
  res.status(404).render('404', {
    title: 'Not Found',
    error: `${req.path} not found`,
  });
});

app.listen(port, () => {
  console.log('app running');
});
