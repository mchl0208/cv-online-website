'use strict';

// create the controller and inject Angular's $scope
// set for Route Controller
cvApp.controller('HomeController', function($scope) {
		$scope.myInterval = 3000;
		$scope.slides = [
			{ image: '/resources/images/Hombre-mirando-un-papel-frente-a-su-computadora.jpg' },
			{ image: '/resources/images/how-to-make-your-resume-stand-out-tbjtuskp.jpg'}
		];
});