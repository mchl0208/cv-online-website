'use strict';

// create the controller and inject Angular's $scope
// set for Route Controller
cvApp.controller('UserController', function($scope, $http) {
	$scope.API_url = 'http://api.cvonline.aliensoft.net';

	$scope.user = {};
 	$scope.user.isLogged = false;
 	$scope.user.fbAuth = null;

 	$scope.template = {
		"headerHome": "components/views/headers/header-home.html",
		"partSlider": "components/views/partials/part-slider.html",
		"header" : "components/views/headers/header.html"
	}

	window.fbAsyncInit = function() {
		FB.init({
			appId      : '547949358692521',
			cookie     : true,  // enable cookies to allow the server to access 
			                    // the session
			xfbml      : true,  // parse social plugins on this page
			version    : 'v2.4' // use version 2.2
		});

		// Now that we've initialized the JavaScript SDK, we call 
		// FB.getLoginStatus().  This function gets the state of the
		// person visiting this page and can return one of three states to
		// the callback you provide.  They can be:
		//
		// 1. Logged into your app ('connected')
		// 2. Logged into Facebook, but not your app ('not_authorized')
		// 3. Not logged into Facebook and can't tell if they are logged into
		//    your app or not.
		//
		// These three cases are handled in the callback function.

		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				logInAPI(response.authResponse.accessToken);
				//if (status)
 					//RegisterInAPI(response.authResponse);
 				//else
 					//$scope.user.isLogged = false;
		    } 
		});
	};

	function logInAPI(token){
		//Simple POST request example (passing data) :
		var method = '/user/login';
		var Furl = $scope.API_url + method;

		$http({
            url: Furl,
            method: "POST",
            data: {fb_token: token},
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            	console.log(response.data);
	        }, 
	        function(response) { // optional
	            // failed
	        }
	    );
		return true;
	}

	function RegisterInAPI(authResponse){
		var method = '/user/create';
		var Furl = $scope.API_url + method;

		$http({
            url: Furl,
            method: "POST",
            data: {fb_token : token, is_admin : '0'},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(response) {
            return response;
	    });
	};
});

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  // function testAPI() {
  //   console.log('Welcome!  Fetching your information.... ');
  //   FB.api('/me', function(response) {
  //     //console.log(response);
  //     //console.log('Successful login for: ' + response.name);
  //     //document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
  //   });
  // }