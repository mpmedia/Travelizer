//= require jquery.min
//= require angular
//= require bootstrap.min
//= require bootstrap-datepicker
//= require bootstrap-timepicker
//= require angular-strap.min
//= require angular-resource
//= require gmap-places
//= require services/sessionService
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

angular.module('travelizer', ['sessionService', 'tripsService', 'travellersService', 'flightsService', 'airlinesService', 'airportsService', '$strap.directives'])
  .config(['$httpProvider', function($httpProvider){
        $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

        var interceptor = ['$location', '$rootScope', '$q', function($location, $rootScope, $q) {
            function success(response) {
                return response
            };

            function error(response) {
                if (response.status == 401) {
                    $rootScope.$broadcast('event:unauthorized');
                    $location.path('/users/login');
                    return response;
                };
                return $q.reject(response);
            };

            return function(promise) {
                return promise.then(success, error);
            };
        }];
        $httpProvider.responseInterceptors.push(interceptor);
  }])
  .config(['$routeProvider', function($routeProvider){
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
    .directive('googleplace', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, model) {
                var options = {
                    types: ['(regions)']
                };
                scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

                google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                    //console.log(scope.gPlace.getPlace().geometry.location);
                    scope.$apply(function() {
                        model.$setViewValue(element.val());
                    });
                });
            }
        };
    });
