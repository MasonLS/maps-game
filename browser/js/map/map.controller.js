'use strict'


app.controller('MainCtrl', function($scope, MapsFactory, $log){

  const map = MapsFactory.initMap({lat: -34.397, lng: 150.644}, 10);

  let currentLocation = {city: null, state: null, latLng: {lat: -34.397, lng: 150.644}};
  let currentLocationMarker = MapsFactory.drawMarker(currentLocation.latLng, map);
  let distanceTravelled = {miles: 0, time: 0};

  map.addListener('click', function(event){
    let coords = event.latLng;

    MapsFactory.getLocationDetails(coords)
      .then(locationDetails => {
        let origin = currentLocation.latLng;
        currentLocation = locationDetails;
        return MapsFactory.getDistanceDetails(origin, locationDetails.latLng);
      })
      .then(distanceDetails => {
        currentLocationMarker = MapsFactory.drawMarker(currentLocation.latLng, map);

        distanceTravelled.miles += Math.floor(distanceDetails.distance.value/1609.34);
        $scope.currentLocation = currentLocation;
        $scope.distanceTravelled = distanceTravelled;
      })
      .catch($log.error);

      currentLocationMarker.setMap(null);
      map.panTo(coords);
  });


});
