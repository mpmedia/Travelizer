function TripsCtrl($scope, Trip, Trips) {"use strict";
    $scope.$parent.trips = Trips.index();
    $scope.removeTrip = function(trip) {
        Trip.destroy({
            trip_id : trip._id
        }, function() {
            $scope.$parent.trips.splice($scope.$parent.trips.indexOf(trip), 1);
        });
    };
}

function TripsAddCtrl($scope, $location, Trips) {"use strict";
    $scope.newTrip = '';
    $scope.createTrip = function(trip) {
        var tripService = new Trips(trip);
        tripService.$create(function(trip) {
            $scope.trips.push(trip);
            $location.path('/trips/'+trip._id);
        });
    };
}

function TripShowCtrl($scope, $routeParams, Traveller, Trip) {"use strict";
    if($scope.$parent.trip == '' || $scope.$parent.trip._id != $routeParams.trip_id) {
        $scope.$parent.trip = Trip.show({trip_id : $routeParams.trip_id});
    }

    $scope.removeTraveller = function(traveller) {
        Traveller.destroy({
            trip_id : $routeParams.trip_id,
            traveller_id : traveller._id
        }, function() {
            $scope.$parent.trip.travellers.splice($scope.$parent.trip.travellers.indexOf(traveller), 1);
        });
    };
}

