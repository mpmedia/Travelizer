function DayUpdateCtrl($scope, $routeParams, $location, Trip, Day) {"use strict";
    if($scope.$parent.trip == '' || $scope.$parent.trip._id != $routeParams.trip_id) {
        $scope.$parent.trip = Trip.show({trip_id : $routeParams.trip_id});
    }

    $scope.day = Day.get({trip_id: $routeParams.trip_id, day_id: $routeParams.day_id});

    $scope.updateDay = function(day) {
        var dayService = new Day(day);
        dayService.$update({
            trip_id : $routeParams.trip_id,
            day_id : $routeParams.day_id
        }, function(day) {
            $.each($scope.$parent.trip.days, function(index, value) {
                if(value._id == day._id) {
                    $scope.$parent.trip.days[index] = day;
                }
            });

            $location.path('/' + $routeParams.trip_id);
        });
    };
}