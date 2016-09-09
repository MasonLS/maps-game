'use strict';


app.factory('MapsFactory', function($http, $log, $q){

  function getUsersLocation () {
    return $q(function(resolve, reject){
      navigator.geolocation.getCurrentPosition(function(pos){
        let latLng = {lat: pos.coords.latitude, lng: pos.coords.longitude}
        resolve(latLng);
      }, function(err){
        reject(err);
      });
    })
  }

  function initMap (center, zoom) {
    console.log(document);
    var map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: zoom,
      scrollwheel: false,
      disableDefaultUI: true,
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

    return map;
  }

  function drawMarker (position, map) {
    return new google.maps.Marker({
            position: position,
            map: map,
            animation: google.maps.Animation.DROP
          });
  }

  function getLocationDetails (latLng) {
    return $http.post('/rgeocode', latLng)
      .then(res => res.data)
      .catch($log.error);
  }

  function getDistanceDetails (origin, destination) {
    return $http.post('/distance', {
      origin: origin,
      destination: destination
    }).then(res => res.data)
    .catch($log.error);
  }

  return {
    getUsersLocation: getUsersLocation,
    initMap: initMap,
    drawMarker: drawMarker,
    getLocationDetails: getLocationDetails,
    getDistanceDetails: getDistanceDetails
  }


});



app.factory('MapFactory', function(){

  //methods to write: getGeolocation, getLocationDetails, getDistanceDetails

  function initMap (center, zoom) {
    console.log(document);
    var map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: zoom,
      scrollwheel: false,
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

    return map;
  }

  function drawMarker (position) {
    return new google.maps.Marker({
            position: position,
            map: map
          });
  }


  return {
    initMap: initMap,
    drawMarker: drawMarker
  }
});
