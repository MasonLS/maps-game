'use strict';

const http = require('http');
const server = http.createServer();
const Express = require('express');
const app = Express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path')
const socketio = require('socket.io');
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCo5OP6KCIyXvgcmFG6esrY1jnZbC6h0pU'
});

server.on('request', app);

const io = socketio(server);

io.on('connect', function(socket){
  console.log('a new client has connected');

  socket.on('getLocationDetails', function(coords){
    googleMapsClient.reverseGeocode({
      latlng: coords,
      result_type: 'locality'
    }, function(err, res){
      if (!err) {
        console.log('LOCATION', res.json);
        var latLng = res.json.results[0].geometry.location;
        var city = res.json.results[0].address_components[0].short_name;
        var state = res.json.results[0].address_components[2].short_name;
        socket.emit('locationData', {
          latLng: latLng,
          city: city,
          state: state
        });
      }
    });
  });

  socket.on('getDistance', function(data){
    googleMapsClient.distanceMatrix({
      origins: data.origin,
      destinations: data.destination
    }, function(err, res){
      if (!err) {
        var distance = res.json.rows[0].elements[0].distance;
        var duration = res.json.rows[0].elements[0].duration;
        socket.emit('distanceData', {distance: distance, duration: duration});
      }
    });
  });

  // socket.on('destinationSelect', function(data){
  //   console.log(data.destination);
  //   var origin = data.origin;
  //   var destination = data.destination;
  //   googleMapsClient.reverseGeocode({
  //     latlng: destination,
  //     result_type: 'locality'
  //   }, function(err, res){
  //     if (!err) {
  //       var destinationLatLng = res.json.results[0]//.geometry.location;
  //       googleMapsClient.distanceMatrix({
  //         origins: origin,
  //         destinations: destinationLatLng.geometry.location
  //       }, function(err, res){
  //         if (!err){
  //           socket.emit('destinationData', {distance: res.json.rows[0].elements[0], destination: destinationLatLng});
  //         }
  //       });
  //     } else {
  //       console.error(err);
  //     }
  //   })
  // });
  socket.on('disconnect', function(){
    console.log('a client has disconnected');
  });
});

server.listen(3000, () => console.log('Listening on port 3000...'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//static files
app.use(Express.static(path.join(__dirname, 'node_modules')));
app.use(Express.static(path.join(__dirname, 'browser')));


app.get(function(req, res, next){
  res.sendFile('index');
});
