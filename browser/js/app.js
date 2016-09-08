'use strict'

const app = angular.module('app', ['ui.router']);

app.config(function($stateProvider){
  $stateProvider.state('mapState', {
    url: '/map',
    templateUrl: 'js/map/map.html',
    controller: 'MapCtrl',
    // resolve: {
    //   userLocation: function(){
    //     const getCurrentPosition = Promise.promisify(navigator.geolocation.getCurrentPosition);
    //     return getCurrentPosition().then(function(pos){return {lat: pos.coords.latitude, lng: pos.coords.longitude}});
    //     // .then(function(pos){
    //     //   return {lat: pos.coords.latitude, lng: pos.coords.longitude};
    //     // });
    //   }
    // }
  })
});


app.run(function($state){
  $state.go('mapState');
});
