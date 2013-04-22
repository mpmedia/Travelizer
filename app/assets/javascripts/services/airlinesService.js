angular.module('airlinesService', ['ngResource'])
  .factory('Airlines', function($resource) {
    return $resource('airline.json', {}, {
        index: { method: 'GET', isArray: true }
    });
  })
