angular.module('flightsService', ['ngResource'])
  .factory('Flights', function($resource) {
    return $resource('flight.json', {}, {
        index: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    });
  })
  .factory('Flight', function($resource){
    return $resource('flight/:flight_id.json', {}, {
      show: { method: 'GET' },
      update: { method: 'PUT' },
      destroy: { method: 'DELETE' }
    });
  });
