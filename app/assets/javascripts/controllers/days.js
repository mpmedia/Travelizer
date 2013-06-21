function DayUpdateCtrl($scope, $routeParams, $location, Day) {"use strict";
    $scope.updateDay = function(day) {
        /*Day.update({
            trip_id : $routeParams.trip_id,
            day_id : $routeParams.day_id
        }, function() {
            $location.path('/'+$routeParams.trip_id);
        });*/

        var dayService = new Day(day);
        dayService.$update({
            trip_id : $routeParams.trip_id,
            day_id : $routeParams.day_id
        }, function(day) {
            $location.path('/' + $routeParams.trip_id);
        });
    };
}