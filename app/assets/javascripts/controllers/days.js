function DayUpdateCtrl($scope, $routeParams, $location, Trip, Day, Attraction, Attractions) {"use strict";
    if($scope.$parent.trip == '' || $scope.$parent.trip._id != $routeParams.trip_id) {
        $scope.$parent.trip = Trip.show({trip_id : $routeParams.trip_id});
    }

    $scope.day = Day.get({trip_id: $routeParams.trip_id, day_id: $routeParams.day_id}, function() {
        if(typeof $scope.day.attractions == "undefined") {
            $scope.day.attractions = new Array();
        }
    });

    $scope.initialize = function() {
        google.maps.visualRefresh = true;
        $scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': $scope.$parent.trip.location }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                $scope.map.setCenter(results[0].geometry.location);

                var request = {
                    location: results[0].geometry.location,
                    radius: 800,
                    types: ['establishment'] //https://developers.google.com/places/documentation/supported_types
                };

                $scope.placesList = new Array();

                $scope.infowindow = new google.maps.InfoWindow();
                $scope.service = new google.maps.places.PlacesService($scope.map);
                $scope.service.nearbySearch(request, $scope.callback);

                google.maps.event.addListener($scope.map, 'dragend', function() {
                    $scope.refresh();
                });
            } else {
                //Error
            }
        });
    };

    $scope.refresh = function() {
        var request = {
            location: $scope.map.center,
            radius: 500
            //types: ['establishment'] //https://developers.google.com/places/documentation/supported_types
        };
        $scope.placesList = new Array();
        $scope.service = new google.maps.places.PlacesService($scope.map);
        $scope.service.nearbySearch(request, $scope.callback);
    };

    $scope.callback = function(results, status, pagination) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            return;
        } else {
            $scope.createMarkers(results);

            if (pagination.hasNextPage) {
                var moreButton = document.getElementById('more');

                moreButton.disabled = false;

                google.maps.event.addDomListenerOnce(moreButton, 'click',
                    function () {
                        moreButton.disabled = true;
                        pagination.nextPage();
                    });
            }
        }
    };

    $scope.createMarkers = function(places) {
        var bounds = new google.maps.LatLngBounds();
        var markers = [];

        for (var i = 0, place; place = places[i]; i++) {
            var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            var marker = new google.maps.Marker({
                map: $scope.map,
                icon: image, //place.photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35})
                title: place.name,
                position: place.geometry.location
            });

            marker.set('name', place.name);

            google.maps.event.addListener(marker, 'click', function(){
                var name = this.get('name');
                $scope.infowindow.setContent(name);
                $scope.infowindow.open($scope.map, this);
            });

            if(place.photos && place.photos.length > 0) {
                place.thumb = place.photos[0].getUrl({'maxWidth': 64, 'maxHeight': 64});
            }
            $scope.placesList.push(place);
            $scope.$apply();

            bounds.extend(place.geometry.location);
        }

        $scope.map.fitBounds(bounds);
    };

    $scope.initialize();

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

    /*$scope.findAttraction = function(query) {
        return $.map($scope.placesList, function(place) {
            return place.name;
        });
    };*/

    $scope.addAttraction = function(attraction) {
        var attractionService = new Attractions(attraction);
        attractionService.$create({
            trip_id : $routeParams.trip_id,
            day_id : $routeParams.day_id
        }, function(attraction) {
            $scope.day.attractions.push(attraction); //TODO: Update parent scope
            $scope.attraction = '';
        });
    };

    $scope.removeAttraction = function(attraction) {
        Attraction.destroy({
            trip_id : $routeParams.trip_id,
            day_id : $routeParams.day_id,
            attraction_id : attraction._id
        }, function() {
            $scope.day.attractions.splice($scope.day.attractions.indexOf(attraction), 1); //TODO: Update parent scope
        });
    };
}