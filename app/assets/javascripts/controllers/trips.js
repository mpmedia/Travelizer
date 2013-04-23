function TripsCtrl($scope, Trips, Trip) {"use strict";
    $scope.trips = Trips.index();

    $scope.removeTrip = function(trip) {
        Trip.destroy({
            trip_id : trip._id
        }, function() {
            $scope.trips.splice($scope.trips.indexOf(trip), 1);
        });
    };
}

function TripsAddCtrl($scope, $location, Trips) {"use strict";
    $scope.createTrip = function(trip) {
        var tripService = new Trips(trip);
        tripService.$create(function(trip) {
            $scope.trip = '';
            $location.path('/trips');
        });
    };
}

function TripShowCtrl($scope, $routeParams, Traveller, Flight, Trip) {"use strict";
    $scope.trip = Trip.show({trip_id : $routeParams.trip_id});

    $scope.removeFlight = function(flight) {
        Flight.destroy({
            trip_id : $routeParams.trip_id,
            flight_id : flight._id
        }, function() {
            $scope.trip.flights.splice($scope.trip.flights.indexOf(flight), 1);
        });
    };

    $scope.removeTraveller = function(traveller) {
        Traveller.destroy({
            trip_id : $routeParams.trip_id,
            traveller_id : traveller._id
        }, function() {
            $scope.trip.travellers.splice($scope.trip.travellers.indexOf(traveller), 1);
        });
    };
}

