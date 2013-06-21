angular.module('daysService', ['ngResource'])
  .factory('Days', function($resource) {
    return $resource('day.json', {}, {
        index: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    });
  })
  .factory('Day', function($resource){
    return $resource('day/:day_id.json', {}, {
      show: { method: 'GET' },
      update: { method: 'PUT' },
      destroy: { method: 'DELETE' }
    });
  });
