'use strict';

var map, places;

const socket = io(window.location.origin);

socket.on('connect', function(){
  console.log('socket connection opened');
})

socket.on('destinationData', function(data){
  if (data) {
    console.log(data.distance.rows[0].elements[0]);
    map.panTo(data.destination);
  }

})

navigator.geolocation.getCurrentPosition(function(pos){

    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: pos.coords.latitude, lng: pos.coords.longitude},
      zoom: 9,
      minZoom: 9,
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
    places = new google.maps.places.PlacesService(map);


    map.addListener('click', function(e){
      socket.emit('destinationSelect', {origin: map.center, destination: e.latLng});
    });
});

function findAndMarkGasStations (origin) {
  places.radarSearch({
    location: origin,
    radius: '50000',
    type: 'gas_station'
  }, function(results, status){
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      results.forEach(markAndPanTo);
    } else {
      console.error('Error');
    }
  });
}

function markAndPanTo (place) {
  let marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map
      });
  marker.addListener('click', function(e){
    map.panTo(e.latLng);
    findAndMarkGasStations(map.center);
  });
  return marker;
}
