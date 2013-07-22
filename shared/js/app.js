var travelizer = angular.module('travelizer', []);
travelizer.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {templateUrl:'/home.html',controller:'HomeCtrl'})
        .otherwise({redirectTo: '/'});
}]);
travelizer.directive('googleplaces', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, model) {
			scope.gPlace = new google.maps.places.Autocomplete(element[0]);

			google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
				scope.$apply(function() {
					model.$setViewValue(element.val());
				});
			});
		}
	};
});
function AppCtrl($scope, $location, $http, $document, $window) {"use strict";
    google.maps.visualRefresh = true;
	var mapOptions = {
		center: new google.maps.LatLng(37.09024, -95.712891),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoom: 4
	};
	
	$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
}
function HomeCtrl($scope, $location, $http, $document, $window) {"use strict";
	$scope.routeBoxer = new RouteBoxer();
	
	$scope.directionService = new google.maps.DirectionsService();
	$scope.directionsRenderer = new google.maps.DirectionsRenderer({ map: $scope.$parent.map });  
	$scope.placeFilter = new Array();
	$scope.placesList = new Array();
	$scope.markers = new Array();
	$scope.boxpolys = new Array();
	$scope.infowindow = new google.maps.InfoWindow();
	$scope.showResults = false;
	
	$scope.travelizeRoute = function(travelizer) {
		// Clear any previous route boxes from the map
		$scope.clearBoxes();
		$scope.clearMarkers();
		$scope.placesList = new Array();
		$scope.showResults = true;
		
		if(travelizer.filter)
			$scope.placeFilter.push(travelizer.filter)
		
		$scope.request = {
			origin: travelizer.from,
			destination: travelizer.to,
			travelMode: google.maps.DirectionsTravelMode.DRIVING
		}

		// Make the directions request
		$scope.directionService.route($scope.request, function(result, status) {
			if (status == google.maps.DirectionsStatus.OK) {
			  $scope.directionsRenderer.setDirections(result);
			  // Box around the overview path of the first route
			  var path = result.routes[0].overview_path;
			  //var distance = result.routes[0].legs[0].distance.value / 1609.344; // Convert meters to miles
			  var boxes = $scope.routeBoxer.box(path, 0.1);
			  $scope.drawBoxes(boxes);
			} else {
			  alert("Directions query failed: " + status);
			}
		});
    };
	
	$scope.resetResults = function() {
		$scope.clearBoxes();
		$scope.clearMarkers();
		$scope.placesList = new Array();
		$scope.showResults = false;
	};
	
	$scope.drawBoxes = function(boxes) {
		$scope.boxpolys = new Array(boxes.length);
		$scope.service = new google.maps.places.PlacesService($scope.$parent.map);
        $scope.notice = $.pnotify({
            text: 'Searching...',
            hide: false,
            closer: false,
            sticker: false,
            shadow: false,
            addclass: 'stack-bottomright custom',
            stack: {"dir1": "up", "dir2": "left", "firstpos1": 50, "firstpos2": 25},
            opacity: .8,
            nonblock: true,
            nonblock_opacity: .2,
            delay: 1000,
            history: false,
            animate_speed: 'fast',
            width: '190px',
            icon: ''
        });
		for (var i = 0; i < boxes.length; i++) {
			$scope.boxpolys[i] = new google.maps.Rectangle({
			  bounds: boxes[i],
			  fillOpacity: 0,
			  strokeOpacity: 0,
			  strokeColor: '#000000',
			  strokeWeight: 0,
			  map: $scope.$parent.map
			});
			var request = {
				bounds: $scope.boxpolys[i].getBounds(), //The bounds within which to search for Places
				types: $scope.placeFilter
			};
			$scope.searchNearby(request, i, boxes.length);
		}
	};
	
	$scope.searchNearby = function(request, index, count) {
		setTimeout(function() { 
			$scope.service.nearbySearch(request, function(results, status, pagination) {
                $scope.notice.pnotify({hide: false, text: Math.floor((index/count)*100) + "% complete..."});
				if (status === google.maps.places.PlacesServiceStatus.OK) {
					$scope.createMarkers(results);
                    $scope.notice.pnotify({hide: true});
				} else {
                    $scope.notice.pnotify({hide: true});
				}});
		}, (index * 500));
    };
	
	$scope.createMarkers = function(places) {
		var bounds = new google.maps.LatLngBounds();
		
		for (var i = 0, place; place = places[i]; i++) {
			var image = {
				url: place.icon,
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(25, 25)
			};

			var marker = new google.maps.Marker({
				map: $scope.$parent.map,
				icon: image,
				title: place.name,
				position: place.geometry.location
			});

			marker.set('name', place.name);
			
			$scope.markers.push(marker);
			google.maps.event.addListener(marker, 'click', function(){
				var name = this.get('name');
				$scope.infowindow.setContent(name);
				$scope.infowindow.open($scope.$parent.map, this);
			});

			if(place.photos && place.photos.length > 0) {
				place.thumb = place.photos[0].getUrl({'maxWidth': 64, 'maxHeight': 64});
			}

			$scope.placesList.push(place);
            $scope.$apply();
			
			bounds.extend(place.geometry.location);
		}

		//$scope.map.fitBounds(bounds);
	};
	
	$scope.clearMarkers = function() {
		if ($scope.markers.length > 0) {
			for (var i = 0; i < $scope.markers.length; i++) {
			  $scope.markers[i].setMap(null);
			}
		}
		$scope.markers = [];
	};	
	
	$scope.clearBoxes = function() {
		if ($scope.boxpolys.length > 0) {
			for (var i = 0; i < $scope.boxpolys.length; i++) {
			  $scope.boxpolys[i].setMap(null);
			}
		}
		$scope.boxpolys = [];
	};	
}