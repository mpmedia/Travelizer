function TripsCtrl($scope, $location, $dialog, Trips, Trip) {"use strict";
    $scope.trips = Trips.index();

    $scope.create = function(trip) {
        var tripService = new Trips(trip);
        tripService.$create(function(trip) {
            $location.path('#/trips');
        });
    };

    $scope.removeTrip = function(id) {
        var title = 'Delete Trip?', msg = 'Are you sure you want to delete this trip?', btns = [{
            result : 'cancel',
            label : 'Cancel'
        }, {
            result : 'ok',
            label : 'OK',
            cssClass : 'btn-primary'
        }];

        $dialog.messageBox(title, msg, btns).open().then(function(result) {
            if (result === 'ok') {
                Trip.destroy({
                    trip_id : id
                }, function() {
                    $location.path('#/trips');
                });
            }
        });
    };
}

function TripShowCtrl($scope, $location, $dialog, $routeParams, Travellers, Traveller, Flights, Flight, Trip) {"use strict";
    $scope.trip = Trip.show({trip_id : $routeParams.trip_id});

    $scope.createFlight = function(flight) {
        flight['trip_id'] = $routeParams.trip_id;
        var flightService = new Flights(flight);
        flightService.$create(function(flight) {
            $scope.trip = Trip.show({trip_id : $routeParams.trip_id});
            //$location.path('#/trips/' + $routeParams.trip_id);
        });
    };

    $scope.removeFlight = function(id) {
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
                    //$location.path('#/trips/' + $routeParams.trip_id);
                });
            }
        });
    };

    $scope.createTraveller = function(traveller) {
        traveller['trip_id'] = $routeParams.trip_id;
        var travellerService = new Travellers(traveller);
        travellerService.$create(function(traveller) {
            $scope.trip = Trip.show({trip_id : $routeParams.trip_id});
            //$location.path('#/trips/' + $routeParams.trip_id);
        });
    };

    $scope.removeTraveller = function(id) {
        var title = 'Delete Traveller?', msg = 'Are you sure you want to delete this traveller?', btns = [{
            result : 'cancel',
            label : 'Cancel'
        }, {
            result : 'ok',
            label : 'OK',
            cssClass : 'btn-primary'
        }];

        $dialog.messageBox(title, msg, btns).open().then(function(result) {
            if (result === 'ok') {
                Traveller.destroy({
                    traveller_id : id
                }, function() {
                    $scope.trip = Trip.show({trip_id : $routeParams.trip_id});
                    //$location.path('#/trips/' + $routeParams.trip_id);
                });
            }
        });
    };
}

