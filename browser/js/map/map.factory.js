'use strict';

app.factory('MapFactory', function(){
  const socket = io(window.location.origin);

  var map;

  function initMap (center, zoom) {
    map = new google.maps.Map({
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
  }

  function drawMarker (position) {
    return new google.maps.Marker({
            position: position,
            map: map
          });
  }

  function panTo (latLng) {
    map.panTo(latLng);
  }

  return {
    initMap: initMap,
    drawMarker: drawMarker,
    panTo: panTo

  }
});
