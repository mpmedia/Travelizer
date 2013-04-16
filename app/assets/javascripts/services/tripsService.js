angular.module('tripsService', ['ngResource'])
  .factory('Trips', function($resource) {
    return $resource('trip.json', {}, {
      index: { method: 'GET', isArray: true},
      create: { method: 'POST' }
    });
  })
  .factory('Trip', function($resource){
    return $resource('trip/:trip_id.json', {}, {
      show: { method: 'GET' },
      update: { method: 'PUT' },
      destroy: { method: 'DELETE' }
    });
  });
