//= require jquery
//= require angular
//= require ui-bootstrap-tpls-0.2.0 
//= require angular-resource
//= require services/moviesService
//= require controllers/movies

angular.module('AngularRails', ['moviesService', 'ui.bootstrap'])
  .config(['$httpProvider', function(provider){
    provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }])
  .config(['$routeProvider', function(router){
    router
      .when('/movies', {templateUrl:'/movies/index.html', controller:MoviesCtrl})
      .when('/movies/:movie_id', {templateUrl:'/movies/show.html', controller:MovieShowCtrl})
      .when('/movies/:movie_id/edit', {templateUrl:'/movies/edit.html', controller: MovieEditCtrl})
      .otherwise({redirectTo: '/movies'});
  }]);
