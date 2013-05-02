function AppCtrl($scope, Trips) {"use strict";
    $scope.trips = '';
    $scope.trip = '';

    $scope.$on('event:unauthorized', function( event ) {
        console.log('unauthorized');
    });
    $scope.$on('event:authenticated', function( event ) {
        console.log('authenticated');
    });

}