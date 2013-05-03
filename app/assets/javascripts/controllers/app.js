function AppCtrl($scope, $location, Trips) {"use strict";
    $scope.trips = '';
    $scope.trip = '';

    $scope.$on('event:unauthorized', function(event) {
        $location.path('/users/login');
    });
    $scope.$on('event:authenticated', function(event) {
        console.log('authenticated');
    });

}