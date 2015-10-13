//create a module cvApp
var cvApp = angular.module('cvApp', ['ngRoute', 'ui.bootstrap']);

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