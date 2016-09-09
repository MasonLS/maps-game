'use strict';

const Express = require('express');
const app = Express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path')

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCo5OP6KCIyXvgcmFG6esrY1jnZbC6h0pU'
});

app.listen(3000, () => console.log('Listening on port 3000...'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//static files
app.use(Express.static(path.join(__dirname, 'node_modules')));
app.use(Express.static(path.join(__dirname, 'browser')));


app.get(function(req, res, next){
  res.sendFile('index');
});

app.post('/rgeocode', function(req, res, next){
  googleMapsClient.reverseGeocode({
    latlng: req.body,
    result_type: 'locality'
  }, function(err, response){
    if (!err) {
      let latLng = response.json.results[0].geometry.location;
      let city = response.json.results[0].address_components[0].short_name;
      let state = response.json.results[0].address_components[2].short_name;
      res.send({
        latLng: latLng,
        city: city,
        state: state
      });
    } else console.error(new Error('Error: Reverse Geocoding Failure'));
  });
});

app.post('/distance', function(req, res, next){
  googleMapsClient.distanceMatrix({
    origins: req.body.origin,
    destinations: req.body.destination
  }, function(err, response){
    if (!err) {
      let distance = response.json.rows[0].elements[0].distance;
      let duration = response.json.rows[0].elements[0].duration;
      res.send({
        distance: distance,
        duration: duration
      });
    } else console.error(new Error('Error: Distance Matrix Failure'));
  });
});
