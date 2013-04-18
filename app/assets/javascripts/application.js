//= require jquery
//= require angular
//= require ui-bootstrap-tpls-0.2.0 
//= require angular-resource
//= require services/tripsService
//= require services/travellersService
//= require services/flightsService
//= require controllers/trips

angular.module('sojo', ['tripsService', 'travellersService', 'flightsService', 'ui.bootstrap'])
  .config(['$httpProvider', function(provider){
    provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }])
  .config(['$routeProvider', function(router){
    router
      .when('/trips', {templateUrl:'/trips/index.html', controller:TripsCtrl})
      .when('/trips/:trip_id', {templateUrl:'/trips/show.html', controller:TripShowCtrl})
      .otherwise({redirectTo: '/trips'});
  }]);
