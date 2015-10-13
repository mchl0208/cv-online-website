/// <reference path="components/views/headers/View_Profile.html" />
/// <reference path="components/views/headers/View_Profile.html" />
//create a module cvApp
var cvApp = angular.module('cvApp', ['ngRoute']);

//Now Configure  our  routing
cvApp.config(function($routeProvider, $locationProvider) {
	$routeProvider
	/** set route for the index page and it load uirouter.html
	*in ng-view and activate HomeController
	**/
	.when('/', {
		controller: 'UserController',
		// resolve:{
	 //        "check":function(accessFac,$location){   //function to be resolved, accessFac and $location Injected
	 //            console.log("is log" + accessFac.isLogged());
	 //            if(accessFac.isLogged()){    //check if the user has permission -- This happens before the page loads
	 //                $location.path('/home');   
	 //            }
	 //        }
	 //    }
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
        templateUrl: 'View_Profile.html'
    };
});

//--------------------------