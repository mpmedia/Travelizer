function TravellersCtrl($scope, $location, $routeParams, $dialog, Travellers, Traveller, Trip) {"use strict";
    $scope.trip = Trip.show({trip_id : $routeParams.trip_id});

    $scope.create = function(traveller) {
        traveller['trip_id'] = $routeParams.trip_id;
        var travellerService = new Travellers(traveller);
        travellerService.$create(function(traveller) {
            $scope.trip = Trip.show({trip_id : $routeParams.trip_id});
            //$scope.addTravellerForm.reset();
        });
    };

    $scope.remove = function(id) {
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



