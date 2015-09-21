'use strict';

// create the controller and inject Angular's $scope
// set for Route Controller
cvApp.controller('HomeController', function($scope) {
	$scope.imagess = [
		{ source: 'resources/images/Hombre-mirando-un-papel-frente-a-su-computadora.jpg' },
		{ source: 'resources/images/how-to-make-your-resume-stand-out-tbjtuskp.jpg'}
	];
});