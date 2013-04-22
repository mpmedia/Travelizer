function FlightAddCtrl($scope, $routeParams, Flights, Flight, Trip, Airlines, Airports) {"use strict";
    $scope.trip = Trip.show({trip_id : $routeParams.trip_id});
    $scope.airlines = Airlines.index();
    $scope.airports = Airports.index();
    $scope.passengers = [{name:'', ticket_no:'', seat:''}];

    $scope.createFlight = function(flight) {
        flight['trip_id'] = $routeParams.trip_id;
        flight['passengers'] = $scope.passengers;
        var flightService = new Flights(flight);
        flightService.$create(function(flight) {
            $scope.trip.flights.push(flight);
            $scope.flight = '';
            $scope.passengers = [{name:'', ticket_no:'', seat:''}];
        });
    };

    $scope.findAirline = function(query) {
        return $.map($scope.airlines, function(airline) {
            return airline.iata ? (airline.name + ' (' + airline.iata + ')') : (airline.name + ' (' + airline.icao + ')');
        });
    };

    $scope.findAirport = function(query) {
        return $.map($scope.airports, function(airport) {
            return airport.iata ? (airport.name + ' (' + airport.iata + ')') : (airport.name + ' (' + airport.icao + ')');
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

    $scope.findFlightPassenger = function(query) {
        return $.map($scope.trip.travellers, function(traveller) {
            return traveller.name;
        });
    };

    $scope.addFlightPassenger = function() {
        $scope.passenger = '';
        $scope.passengers.push({name:'', ticket_no:'', seat:''});
    };
}

