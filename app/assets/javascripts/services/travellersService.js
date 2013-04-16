angular.module('travellersService', ['ngResource'])
  .factory('Travellers', function($resource) {
    return $resource('traveller.json', {}, {
        index: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    });
  })
  .factory('Traveller', function($resource){
    return $resource('traveller/:traveller_id.json', {}, {
      show: { method: 'GET' },
      update: { method: 'PUT' },
      destroy: { method: 'DELETE' }
    });
  });
