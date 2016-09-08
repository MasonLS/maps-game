'use strict'

app.controller('MapCtrl', function($scope, $log){

  const socket = io(window.location.origin);
  var map;

  $scope.distanceTravelled = '0';

  var metersTravelled = 0;

  navigator.geolocation.getCurrentPosition(function(pos){

      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: pos.coords.latitude, lng: pos.coords.longitude},
        zoom: 10,
        minZoom: 10,
        disableDefaultUI: false,
        styles: [
          {
            featureType: 'all',
            stylers: [
              {visibility: 'off'}
            ]
          },
          {
            featureType: 'landscape',
            stylers: [
              {visibility: 'simplified'}
            ]
          },
          {
            featureType: 'water',
            stylers: [
              {visibility: 'on'}
            ]
          },
          {
            featureType: 'road.highway',
            stylers: [
              {visibility: 'simplified'},
            ]
          },
          {
            featureType: 'administrative.locality',
            stylers: [
              {visibility: 'simplified'},
              {clickable: true}
            ]
          }
        ]
      });

      map.addListener('click', function(e){
        socket.emit('destinationSelect', {origin: map.center, destination: e.latLng});
      });
  });

  socket.on('connect', function(){
    console.log('socket connection opened');
  });

  socket.on('destinationData', function(data){
    console.log(data);
    if (data) {
      console.log(data.distance.distance.value);
      map.panTo(data.destination.geometry.location);
      new google.maps.Marker({
            position: data.destination.geometry.location,
            map: map
          });
      $scope.currentLocation = data.destination.address_components[0].short_name + ' ' + data.destination.address_components[2].short_name;
      metersTravelled += data.distance.distance.value;
      $scope.distanceTravelled = Math.floor(metersTravelled/1609);
      $scope.$digest();
    }

  });
});
