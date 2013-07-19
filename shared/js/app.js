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
		for (var i = 0; i < boxes.length; i++) {
			$scope.boxpolys[i] = new google.maps.Rectangle({
			  bounds: boxes[i],
			  fillOpacity: 0,
			  strokeOpacity: 1.0,
			  strokeColor: '#000000',
			  strokeWeight: 1,
			  map: $scope.map
			});
		}		
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