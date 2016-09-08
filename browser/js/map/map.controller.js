'use strict'


app.controller('MapCtrl', function($scope, MapFactory, $rootScope){

  const socket = io(window.location.origin);

  var startLatLng;

  const currentLocation = {city: null, state: null};
  const distanceTravelled = {miles: 0, time: 0};
  $rootScope.distanceTravelled = distanceTravelled;

  var map = MapFactory.initMap({lat: -34.397, lng: 150.644}, 10);

  map.addListener('click', function(e){
    let coords = e.latLng;
    socket.emit('getLocationDetails', coords);
    socket.emit('getDistance', {origin: map.center, destination: coords});
  });

  socket.on('locationData', function(data){
    map.panTo(data.latLng);
    MapFactory.drawMarker(data.latLng);

    currentLocation.city = data.city;
    currentLocation.state = data.state;
    $scope.$digest;
  });

  socket.on('distanceData', function(data){
    var distance = data.distance;
    var duration = data.duration;

    distanceTravelled.miles += Math.floor(distance.value/1609.34);
    console.log(distanceTravelled.miles);
    distanceTravelled.time = duration.value;
    $scope.$digest;
    $rootScope.$digest;
  });


});
