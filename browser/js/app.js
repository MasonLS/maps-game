'use strict'

const app = angular.module('app', ['ui.router']);


app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    controller: 'MainCtrl',
    resolve: {
      userLatLng: function(MapsFactory){
        return MapsFactory.getUsersLocation();
      }
    }
  });
});
