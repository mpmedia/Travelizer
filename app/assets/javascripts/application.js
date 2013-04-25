//= require jquery.min
//= require angular
//= require bootstrap.min
//= require bootstrap-datepicker
//= require bootstrap-timepicker
//= require angular-strap.min
//= require angular-resource
//= require services/tripsService
//= require services/travellersService
//= require services/flightsService
//= require services/airlinesService
//= require services/airportsService
//= require controllers/app
//= require controllers/trips
//= require controllers/flights
//= require controllers/travellers

angular.module('travelizer', ['tripsService', 'travellersService', 'flightsService', 'airlinesService', 'airportsService', '$strap.directives'])
  .config(['$httpProvider', function(provider){
    provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }])
  .config(['$routeProvider', function(router){
    router
      .when('/', {templateUrl:'/home/index.html'})
      .when('/trips', {templateUrl:'/trips/index.html', controller:TripsCtrl})
      .when('/trips/add', {templateUrl:'/trips/add.html', controller:TripsAddCtrl})
      .when('/trips/:trip_id', {templateUrl:'/trips/show.html', controller:TripShowCtrl})
      .when('/flights/:trip_id', {templateUrl:'/flights/add.html', controller:FlightAddCtrl})
      .when('/travellers/:trip_id', {templateUrl:'/travellers/add.html', controller:TravellerAddCtrl});
  }]);
