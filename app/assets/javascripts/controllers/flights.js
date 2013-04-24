function FlightAddCtrl($scope, $routeParams, Flights, Flight, Airlines) {"use strict";
    $scope.airlines = Airlines.index();
    $scope.passengers = [{name:'', ticket_no:'', seat:''}];

    $scope.createFlight = function(flight) {
        flight['trip_id'] = $routeParams.trip_id;
        flight['passengers'] = $scope.passengers;
        var flightService = new Flights(flight);
        flightService.$create(function(flight) {
            $scope.$parent.trip.flights.push(flight);
            $scope.flight = '';
            $scope.passengers = [{name:'', ticket_no:'', seat:''}];
        });
    };

    $scope.findAirline = function(query) {
        return $.map($scope.airlines, function(airline) {
            return airline.iata ? (airline.name + ' (' + airline.iata + ')') : (airline.name + ' (' + airline.icao + ')');
        });
    };

    $scope.removeFlight = function(flight) {
        Flight.destroy({
            trip_id : $routeParams.trip_id,
            flight_id : flight._id
        }, function() {
            $scope.$parent.trip.flights.splice($scope.$parent.trip.flights.indexOf(flight), 1);
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

    $scope.removeFlightPassenger = function(passenger) {
        $scope.passengers.splice($scope.passengers.indexOf(passenger), 1);
    };
}

