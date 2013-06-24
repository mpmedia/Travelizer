angular.module('attractionsService', ['ngResource'])
  .factory('Attractions', function($resource) {
    return $resource('attraction.json', {}, {
        index: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    });
  })
  .factory('Attraction', function($resource){
    return $resource('attraction/:attraction_id.json', {}, {
      show: { method: 'GET' },
      update: { method: 'PUT' },
      destroy: { method: 'DELETE' }
    });
  });
