angular.module('airportsService', ['ngResource'])
  .factory('Airports', function($resource) {
    return $resource('airport.json', {}, {
        index: { method: 'GET', isArray: true }
    });
  })
