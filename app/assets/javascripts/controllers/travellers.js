function TravellersCtrl($scope, $location, $routeParams, Travellers, Trip) {"use strict";
    $scope.trip = Trip.show({trip_id : $routeParams.trip_id});

    $scope.create = function(traveller) {
        traveller['trip_id'] = $routeParams.trip_id;
        var travellerService = new Travellers(traveller);
        travellerService.$create(function(traveller) {
            $scope.trip = Trip.show({trip_id : $routeParams.trip_id});
        });
    }
}



