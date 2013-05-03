angular.module('tripsService', ['ngResource', 'securityService'])
  .factory('Trips', ['$resource','TokenHandler',function($resource, tokenHandler) {
    var resource = $resource('trip.json', {}, {
      index: { method: 'GET', isArray: true},
      create: { method: 'POST' }
    });
    //resource = tokenHandler.wrapActions(resource, ['index', 'create']);
    return resource;
  }])
  .factory('Trip', function($resource){
    return $resource('trip/:trip_id.json', {}, {
      show: { method: 'GET' },
      update: { method: 'PUT' },
      destroy: { method: 'DELETE' }
    });
  });
