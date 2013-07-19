var travelizer = angular.module('travelizer', [])
travelizer.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {templateUrl:'/home.html',controller:'HomeCtrl'})
        .otherwise({redirectTo: '/'});
}]);
function AppCtrl($scope, $location, $http, $document, $window) {"use strict";
    
}
function HomeCtrl($scope, $location, $http, $document, $window) {"use strict";
	var mapOptions = {
		center: new google.maps.LatLng(37.09024, -95.712891),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoom: 4
	};

	$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
	$scope.routeBoxer = new RouteBoxer();

	$scope.directionService = new google.maps.DirectionsService();
	$scope.directionsRenderer = new google.maps.DirectionsRenderer({ map: $scope.map });  

	$scope.travelizeRoute = function(travelizer) {
		// Clear any previous route boxes from the map
		$scope.clearBoxes();

		// Convert the distance to box around the route from miles to km
		$scope.distance = parseFloat(0.1) * 1.609344;

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
			  var boxes = $scope.routeBoxer.box(path, $scope.distance);
			  $scope.drawBoxes(boxes);
			} else {
			  alert("Directions query failed: " + status);
			}
		});
		
		
    };
	
	$scope.drawBoxes = function(boxes) {
		$scope.boxpolys = new Array(boxes.length);
		$scope.service = new google.maps.places.PlacesService($scope.map);
		for (var i = 0; i < boxes.length; i++) {
			$scope.boxpolys[i] = new google.maps.Rectangle({
			  bounds: boxes[i],
			  fillOpacity: 0,
			  strokeOpacity: 1.0,
			  strokeColor: '#000000',
			  strokeWeight: 1,
			  map: $scope.map
			});
			//var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(-33.8902, 151.1759), new google.maps.LatLng(-33.8474, 151.2631));
			var request = {
				bounds: $scope.boxpolys[i].getBounds(), //The bounds within which to search for Places
				types: ['establishment']
			};
			$scope.searchNearby(request, i);
		}		
	};
	
	$scope.searchNearby = function(request, timeout) {
		setTimeout(function() { 
			$scope.service.nearbySearch(request, function(results, status, pagination) {
				if (status === google.maps.places.PlacesServiceStatus.OK) {
					$scope.createMarkers(results);
				} else {
					console.log(status);
				}});
		}, (timeout * 1000));
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
			
			bounds.extend(place.geometry.location);
		}

		$scope.map.fitBounds(bounds);
	};
	
	$scope.clearBoxes = function() {
		if ($scope.boxpolys != null) {
			for (var i = 0; i < $scope.boxpolys.length; i++) {
			  $scope.boxpolys[i].setMap(null);
			}
		}
		$scope.boxpolys = null;
	};	
}