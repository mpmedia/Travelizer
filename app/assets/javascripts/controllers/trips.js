function TripsCtrl($scope, $location, $dialog, Trips, Trip) {"use strict";
    $scope.trips = Trips.index();

    $scope.create = function(trip) {
        var tripService = new Trips(trip);
        tripService.$create(function(trip) {
            $location.path('/travellers/' + trip.id);
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
                    $scope.trips = Trips.index();
                });
            }
        });
    };
}

function TripShowCtrl($scope, $location, $routeParams, $dialog, Travellers, Traveller, Trip) {"use strict";
    $scope.trip = Trip.show({trip_id : $routeParams.trip_id});

    $scope.createTraveller = function(traveller) {
        traveller['trip_id'] = $routeParams.trip_id;
        var travellerService = new Travellers(traveller);
        travellerService.$create(function(traveller) {
            $scope.trip = Trip.show({trip_id : $routeParams.trip_id});
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
                });
            }
        });
    };
}

