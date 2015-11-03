/// <reference path="components/views/headers/View_Profile.html" />
/// <reference path="components/views/headers/View_Profile.html" />
//create a module cvApp
var cvApp = angular.module('cvApp', ['ngRoute', 'ui.bootstrap', 'ui.codemirror','ngFileUpload']);

//Now Configure  our  routing
cvApp.config(function($routeProvider, $locationProvider) {
	$routeProvider
	/** set route for the index page and it load uirouter.html
	*in ng-view and activate HomeController
	**/
	.when('/', {
		controller: 'UserController',
	})
	.when('/user/list', {
        templateUrl: '/components/views/partials/userList.html'
    })
    .when('/user/profile', {
        templateUrl: '/components/views/body/body.html'
    })
    .when('/template/add', {
        templateUrl: '/components/views/partials/addTemplate.html'
    })
	// if not match with any route config then send to home page
	.otherwise({
		redirectTo: '/'
	});

	$locationProvider.html5Mode({
		enabled: true,
	    requireBase: false
	});
});

cvApp.factory('accessFac',function(){
    var obj = {}
    this.isLoggedIn = false;
    obj.isLogged = function(){
        this.isLoggedIn = false;           //returns the users permission level 
    }
    return obj;
});

//code added by Frank JAvier 
//Creando directica
cvApp.directive('usrDir', function () {
    return {
        restrict: 'E',
        templateUrl: '/View_Profile.html'
    };
});

//-------------------------

