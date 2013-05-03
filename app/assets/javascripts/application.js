//= require jquery.min
//= require angular
//= require bootstrap.min
//= require bootstrap-datepicker
//= require bootstrap-timepicker
//= require angular-strap.min
//= require angular-resource
//= require services/securityService
//= require services/tripsService
//= require services/travellersService
//= require services/flightsService
//= require services/airlinesService
//= require services/airportsService
//= require controllers/app
//= require controllers/trips
//= require controllers/flights
//= require controllers/travellers
//= require controllers/users

angular.module('travelizer', ['securityService', 'tripsService', 'travellersService', 'flightsService', 'airlinesService', 'airportsService', '$strap.directives'])
  .config(['$httpProvider', function($httpProvider){
        $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

        var interceptor = ['$rootScope', '$q', function(scope, $q) {
            function success(response) {
                return response
            };

            function error(response) {
                if (response.status == 401) {
                    var deferred = $q.defer();
                    scope.$broadcast('event:unauthorized');
                    return deferred.promise;
                };
                return $q.reject(response);
            };

            return function(promise) {
                return promise.then(success, error);
            };
        }];
        $httpProvider.responseInterceptors.push(interceptor);
  }])
  .config(['$routeProvider', '$httpProvider', function($routeProvider){
    $routeProvider
      .when('/', {templateUrl:'/home/index.html'})
      .when('/trips', {templateUrl:'/trips/index.html', controller:TripsCtrl})
      .when('/trips/add', {templateUrl:'/trips/add.html', controller:TripsAddCtrl})
      .when('/trips/:trip_id', {templateUrl:'/trips/show.html', controller:TripShowCtrl})
      .when('/flights/:trip_id', {templateUrl:'/flights/add.html', controller:FlightAddCtrl})
      .when('/travellers/:trip_id', {templateUrl:'/travellers/add.html', controller:TravellerAddCtrl})
      .when('/users/login', {templateUrl:'/users/login.html', controller:UsersCtrl})
      .when('/users/register', {templateUrl:'/users/register.html', controller:UsersCtrl});
  }])
  .run(['Security', function(security) {
        // Get the current user when the application starts
        // (in case they are still logged in from a previous session)
        //security.requestCurrentUser();
  }]);
