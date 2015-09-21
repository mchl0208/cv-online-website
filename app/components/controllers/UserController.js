'use strict';

// create the controller and inject Angular's $scope
// set for Route Controller
cvApp.controller('UserController', function($scope) {
	$scope.user = {};
 	//$scope.data.case = true;

 	$scope.user.isLogged = false;

 	$scope.template = {
		"headerHome": "components/views/headers/header-home.html",
		"partSlider": "components/views/partials/part-slider.html",
		"header" : "components/views/headers/header.html"
	}
});