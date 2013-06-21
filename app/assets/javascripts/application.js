//= require jquery.min
//= require angular
//= require bootstrap.min
//= require bootstrap-datepicker
//= require bootstrap-timepicker
//= require angular-strap.min
//= require angular-resource
//= require services/sessionService
//= require services/tripsService
//= require services/travellersService
//= require services/daysService
//= require controllers/app
//= require controllers/trips
//= require controllers/travellers
//= require controllers/days
//= require controllers/users

angular.module('travelizer', ['sessionService', 'tripsService', 'travellersService', 'daysService', '$strap.directives'])
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
      .when('/:trip_id', {templateUrl:'/trips/show.html', controller:TripShowCtrl})
      .when('/:trip_id/travellers/add', {templateUrl:'/travellers/add.html', controller:TravellerAddCtrl})
      .when('/:trip_id/days/edit/:day_id', {templateUrl:'/days/edit.html', controller:DayUpdateCtrl})
      .when('/users/login', {templateUrl:'/users/login.html', controller:UsersCtrl})
      .when('/users/register', {templateUrl:'/users/register.html', controller:UsersCtrl});
  }])
    .directive('googleplaces', function() {
        return {
            require: 'ngModel',
            scope: {
                lonlat: '=lonlat'
            },
            link: function(scope, element, attrs, model) {
                var options = {
                    types: ['(regions)']
                };
                scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

                google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                    scope.$apply(function() {
                        //scope.lonlat = scope.gPlace.getPlace().geometry.location.toUrlValue();
                        //console.log(model);
                        model.$setViewValue(element.val());
                    });
                    //console.log(scope);
                });
            }
        };
    });
