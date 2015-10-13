'use strict';

// create the controller and inject Angular's $scope
// set for Route Controller
cvApp.controller('UserController', function($scope, $http, $modal, users) {
	$scope.API_url = 'http://api.cvonline.aliensoft.net';
	$scope.user = {};
 	$scope.user.isLogged = false;
 	$scope.registeredUsers = [];

 	$scope.myInterval = 3000;
	
	$scope.slides = [
		{ image: '/resources/images/Hombre-mirando-un-papel-frente-a-su-computadora.jpg' },
		{ image: '/resources/images/how-to-make-your-resume-stand-out-tbjtuskp.jpg'}
	];

 	$scope.template = {
		"headerHome": "/components/views/headers/header-home.html",
		"partSlider": "/components/views/partials/part-slider.html",
		"header" : "/components/views/headers/header.html",
		"sidebar" : "/components/views/partials/side-bar.html"
	}

	users.success(function(data) { 
	    $scope.registeredUsers = data; 
	});

	window.fbAsyncInit = function() {
		FB.init({
			appId      : '547949358692521',
			cookie     : true,  // enable cookies to allow the server to access 
			                    // the session
			xfbml      : true,  // parse social plugins on this page
			version    : 'v2.4' // use version 2.2
		});

		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				$scope.logInAPI(response.authResponse.accessToken);
		    }
		});
	};

	$scope.logInAPI = function(token){
		//Simple POST request example (passing data) :
		var method = '/user/login';
		var Furl = $scope.API_url + method;

		$http({
            url: Furl,
            method: "POST",
            data: {fb_token: token},
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
        	    $scope.user = response.data;
 				$scope.user.isLogged = true;
	        }, 
	        function(response) { // optional
	        	if (response.data.message == "No user registered with that Facebook ID"){
	        		RegisterInAPI(token)
	        	}
	        }
	    );
	};

	$scope.logOutInAPI = function(session_id){
		var method = '/user/logout';
		var Furl = $scope.API_url + method;

		$http({
            url: Furl,
            method: "POST",
            data: {"X-Session-Id": $scope.user.session_id},
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            //$scope.fbLogOut();
            $scope.user = {};
 			$scope.user.isLogged = false;
	    });
	};

	function RegisterInAPI(token){
		var method = '/user/create';
		var Furl = $scope.API_url + method;

		$http({
            url: Furl,
            method: "POST",
            data: {fb_token : token, is_admin : '1'},
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            $scope.logInAPI(response.data.fb_token);
	    });
	};

	function DeleteAccount(){
		var method = '/user/delete';
		var Furl = $scope.API_url + method;

		$http({
            url: Furl,
            method: "DELETE",
            data: {},
            headers: {'Content-Type': 'application/json', "X-Session-Id": $scope.user.session_id}
        }).then(function(response) {
            $scope.fbLogOut();
	    });
	};


	$scope.fbLogOut = function () {
		FB.logout(function(response) {
 			logOutInAPI();
		});
		window.location.reload(false); 
	};

	$scope.openDeleteAccount = function (size) {

	    var modalInstance = $modal.open({
	      animation: false,
	      templateUrl: 'myModalContent.html',
	      controller: 'ModalInstanceCtrl',
	      size: size
	    });

	    modalInstance.result.then(function (confirm) {
	      if (confirm == true)
	      {
	      	DeleteAccount();
	      }
	    }, function () {
	      //$log.info('Modal dismissed at: ' + new Date());
	    });
	};


});

	function checkFBloginStatus()
	{
		var virtualScope = angular.element(document.getElementById('UserControllerId')).scope();

		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				virtualScope.logInAPI(response.authResponse.accessToken);
		    }
		    else{
		    	FB.login(function(response) {
					virtualScope.logInAPI(response.authResponse.accessToken);
				});
		    }
		});
	}

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