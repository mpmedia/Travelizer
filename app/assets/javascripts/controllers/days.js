function DayUpdateCtrl($scope, $routeParams, $location, Trip, Day, Attractions) {"use strict";
    if($scope.$parent.trip == '' || $scope.$parent.trip._id != $routeParams.trip_id) {
        $scope.$parent.trip = Trip.show({trip_id : $routeParams.trip_id});
    }

    $scope.day = Day.get({trip_id: $routeParams.trip_id, day_id: $routeParams.day_id});

    var API_KEY = 'AIzaSyC6YRqrRWcKpIg5G9Dt0ZyQ5KuQF79vGvA';
    var service_url = 'https://www.googleapis.com/freebase/v1/mqlread';
    var location = $scope.trip.location;
    var query = [{
        "mid": null,
        "name": null,
        "type": "/travel/tourist_attraction",
        "/travel/tourist_attraction/near_travel_destination": [{
            "name": location
        }]
    }];
    var params = {
        'key': API_KEY,
        'query': JSON.stringify(query)
    };
    $.getJSON(service_url, params, function(response) {
        $scope.suggestions = response.result;
    });

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

    $scope.findAttraction = function(query) {
        return $.map($scope.suggestions, function(attraction) {
            return attraction.name;
        });
    };

    $scope.addAttraction = function(attraction) {
        var attractionService = new Attractions(attraction);
        attractionService.$create({
            trip_id : $routeParams.trip_id,
            day_id : $routeParams.day_id
        }, function(attraction) {
            $scope.day.attractions.push(attraction);
            $scope.attraction = '';
        });
    };

    $scope.removeAttraction = function(attraction) {
        $scope.day.attractions.splice($scope.attractions.indexOf(attraction), 1);
    };
}