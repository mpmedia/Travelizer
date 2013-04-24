function TravellerAddCtrl($scope, $routeParams, $location, Travellers) {"use strict";
    $scope.createTraveller = function(traveller) {
        traveller['trip_id'] = $routeParams.trip_id;
        var travellerService = new Travellers(traveller);
        travellerService.$create(function(traveller) {
            $scope.traveller = '';
            $location.path('/trips/' + $routeParams.trip_id);
        });
    };
}