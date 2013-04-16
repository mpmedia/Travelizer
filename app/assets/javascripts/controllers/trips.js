function TripsCtrl($scope, $location, Trips) {"use strict";
    $scope.trips = Trips.index();

    $scope.create = function(trip) {
        var tripService = new Trips(trip);
        tripService.$create(function(trip) {
            $location.path('/travellers/' + trip.id);
        });
    }
}

function TripShowCtrl($scope, $location, $routeParams, $dialog, Trip) {"use strict";
    $scope.trip = Trip.show({
        trip_id : $routeParams.trip_id
    });

    $scope.remove = function(id) {
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
                    $location.path('/trips');
                });
            }
        });
    };

    $scope.convertBoolean = function(val) {
        return val ? 'Yes' : 'No';
    };
}

