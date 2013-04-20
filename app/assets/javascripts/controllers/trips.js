function TripsCtrl($scope, $dialog, Trips, Trip) {"use strict";
    $scope.trips = Trips.index();

    $scope.create = function(trip) {
        var tripService = new Trips(trip);
        tripService.$create(function(trip) {
            $scope.trips.push(trip);
            $scope.trip = '';
        });
    };

    $scope.removeTrip = function(trip) {
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
                    trip_id : trip._id
                }, function() {
                    $scope.trips.splice($scope.trips.indexOf(trip, 1));
                });
            }
        });
    };
}

function TripShowCtrl($scope, $dialog, $routeParams, Travellers, Traveller, Flights, Flight, Trip) {"use strict";
    $scope.trip = Trip.show({trip_id : $routeParams.trip_id});

    $scope.createFlight = function(flight) {
        flight['trip_id'] = $routeParams.trip_id;
        var flightService = new Flights(flight);
        flightService.$create(function(flight) {
            $scope.trip = Trip.show({trip_id : $routeParams.trip_id});
            $scope.flight = '';
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
                    trip_id : $routeParams.trip_id,
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
            $scope.trip.travellers.push(traveller);
            $scope.traveller = '';
        });
    };

    $scope.removeTraveller = function(traveller) {
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
                    trip_id : $routeParams.trip_id,
                    traveller_id : traveller._id
                }, function() {
                    $scope.trip.travellers.splice($scope.trip.travellers.indexOf(traveller, 1));
                });
            }
        });
    };
}

