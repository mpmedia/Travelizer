function TripsCtrl($scope, Trips) {"use strict";
    $scope.trips = Trips.index();

    $scope.create = function(trip) {
        var tripService = new Trips(trip);
        tripService.$create(function(trip) {
            $scope.trips = Trips.index();
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

function TripEditCtrl($scope, $routeParams, $location, Trip) {
    "use strict";
    
    $scope.master = {};
    var trip_id = $routeParams.trip_id;
    $scope.trip = Trip.show({
        trip_id : trip_id
    }, function(resource) {
        $scope.master = angular.copy(resource);
    });

    $scope.update = function(trip) {
        trip.$update({
            trip_id : trip_id
        }, function(updatedTrip) {
            $location.path('/trips/' + updatedTrip.id);
        });
    }
}

