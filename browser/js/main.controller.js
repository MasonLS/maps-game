'use strict';

app.controller('MainCtrl', function($scope, MapsFactory, $log, userLatLng){

  let currentLocation = {city: null, state: null, latLng: userLatLng};
  let distanceTravelled = {miles: 0, time: 0};

  const map = MapsFactory.initMap(userLatLng, 10);

  let currentLocationMarker = MapsFactory.drawMarker(userLatLng, map);

  map.addListener('click', function(event){
    let coords = event.latLng;

    MapsFactory.getLocationDetails(coords)
      .then(locationDetails => {
        let origin = currentLocation.latLng;
        currentLocation = locationDetails;
        return MapsFactory.getDistanceDetails(origin, locationDetails.latLng);
      })
      .then(distanceDetails => {
        currentLocationMarker.setMap(null);
        map.panTo(coords);
        currentLocationMarker = MapsFactory.drawMarker(currentLocation.latLng, map);

        distanceTravelled.miles += Math.floor(distanceDetails.distance.value/1609.34);
        $scope.currentLocation = currentLocation;
        $scope.distanceTravelled = distanceTravelled;
      })
      .catch($log.error);
  });

});
