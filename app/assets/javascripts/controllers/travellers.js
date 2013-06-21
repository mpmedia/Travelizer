function TravellerAddCtrl($scope, $routeParams, $location, Travellers) {"use strict";
    $scope.createTraveller = function(traveller) {
        traveller['trip_id'] = $routeParams.trip_id;
        var travellerService = new Travellers(traveller);
        travellerService.$create(function(traveller) {
            $scope.traveller = '';
            $scope.$parent.trip.travellers.push(traveller);
            $location.path('/' + $routeParams.trip_id);
        });
    };
}