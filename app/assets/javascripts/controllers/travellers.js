function TravellerAddCtrl($scope, $routeParams, Travellers, Trip) {"use strict";
    $scope.trip = Trip.show({trip_id : $routeParams.trip_id});

    $scope.createTraveller = function(traveller) {
        traveller['trip_id'] = $routeParams.trip_id;
        var travellerService = new Travellers(traveller);
        travellerService.$create(function(traveller) {
            $scope.trip.travellers.push(traveller);
            $scope.traveller = '';
        });
    };
}