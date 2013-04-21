function TripsCtrl($scope, Trips, Trip) {"use strict";
    $scope.trips = Trips.index();

    $scope.create = function(trip) {
        var tripService = new Trips(trip);
        tripService.$create(function(trip) {
            $scope.trips.push(trip);
            $scope.trip = '';
        });
    };

    $scope.removeTrip = function(trip) {
        Trip.destroy({
            trip_id : trip._id
        }, function() {
            $scope.trips.splice($scope.trips.indexOf(trip, 1));
        });
    };
}

function TripShowCtrl($scope, $routeParams, Travellers, Traveller, Flights, Flight, Trip) {"use strict";
    $scope.trip = Trip.show({trip_id : $routeParams.trip_id});
    $scope.passengers = [{name:'', ticket_no:'', seat:''}];

    $scope.createFlight = function(flight) {
        flight['trip_id'] = $routeParams.trip_id;
        flight['passengers'] = $scope.passengers;
        console.log(flight);
        var flightService = new Flights(flight);
        flightService.$create(function(flight) {
            $scope.trip.flights.push(flight);
            $scope.flight = '';
            $scope.passengers = [{name:'', ticket_no:'', seat:''}];
        });
    };

    $scope.removeFlight = function(flight) {
        Flight.destroy({
            trip_id : $routeParams.trip_id,
            flight_id : flight._id
        }, function() {
            $scope.trip.flights.splice($scope.trip.flights.indexOf(flight, 1));
        });
    };

    $scope.addFlightPassenger = function() {
        $scope.passenger = '';
        $scope.passengers.push({name:'', ticket_no:'', seat:''});
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
        Traveller.destroy({
            trip_id : $routeParams.trip_id,
            traveller_id : traveller._id
        }, function() {
            $scope.trip.travellers.splice($scope.trip.travellers.indexOf(traveller, 1));
        });
    };
}

