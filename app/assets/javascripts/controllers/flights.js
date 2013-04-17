function FlightsCtrl($scope, $location, $routeParams, $dialog, Flights, Flight, Trip) {"use strict";
    $scope.trip = Trip.show({trip_id : $routeParams.trip_id});

    $scope.create = function(flight) {
        flight['trip_id'] = $routeParams.trip_id;
        var flightService = new Flights(flight);
        flightService.$create(function(flight) {
            $scope.trip = Trip.show({trip_id : $routeParams.trip_id});
            //$scope.addFlightForm.reset();
        });
    };

    $scope.remove = function(id) {
        var title = 'Delete Flight?', msg = 'Are you sure you want to delete this flight?', btns = [{
            result : 'cancel',
            label : 'Cancel'
        }, {
            result : 'ok',
            label : 'OK',
            cssClass : 'btn-primary'
        }];

        $dialog.messageBox(title, msg, btns).open().then(function(result) {
            if (result === 'ok') {
                Flight.destroy({
                    flight_id : id
                }, function() {
                    $scope.trip = Trip.show({trip_id : $routeParams.trip_id});
                });
            }
        });
    };
}



