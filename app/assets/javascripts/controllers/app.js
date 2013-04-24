function AppCtrl($scope, Trips) {"use strict";
    $scope.trips = Trips.index();
    $scope.trip = '';
}