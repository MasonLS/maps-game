'use strict';

app.factory('MapFactory', function(){

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
