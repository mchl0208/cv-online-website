'use strict';

// create the controller and inject Angular's $scope
// set for Route Controller
cvApp.controller('UserController', function($scope, $http, $modal) {
	//$scope.API_url = 'http://api.cvonline.aliensoft.net';
	$scope.API_url = 'http://cvonline.aliensoft.net';
	$scope.user = {};
	$scope.user.isLogged = false;
	$scope.isViewProfile = true;
 	$scope.registeredUsers = [];
	//Code added Frank Javier
	$scope.userImage = "";
	$scope.templateArray = [];
    $scope.myTemplate = $scope.templateArray[2];
	//-----------------------
	
 	$scope.myInterval = 3000;
	
	$scope.slides = [
		{ image: '/resources/images/Hombre-mirando-un-papel-frente-a-su-computadora.jpg' },
		{ image: '/resources/images/how-to-make-your-resume-stand-out-tbjtuskp.jpg'}
	];

 	$scope.template = {
		"headerHome": "/components/views/headers/header-home.html",
		"partSlider": "/components/views/partials/part-slider.html",
		"header" : "/components/views/headers/header.html",
		"sidebar": "/components/views/partials/side-bar.html",
		"viewProfile": "/components/views/headers/View_Profile.html", //code added by Frank Javier 
		"body": "/components/views/body/body.html" //code added by Frank Javier 
	}

	function getRegisteredUsers () {
		$.ajax({
		  method: 'GET',
		 url: $scope.API_url + '/user/list',
		 headers: {'Content-Type': 'application/json', "X-Session-Id": $scope.user.session_id},
		 success: function(data) { 
	            $scope.registeredUsers = (data.users);
	            $scope.$apply();
	        	console.log($scope.registeredUsers);
	        },
	    error: function(data) { 
	            return data;
	        }
		});
	}

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
	
	//code added by Frank JAvier 
	$http.get($scope.API_url + '/template/list')
	.success(function (response, status) {
		$scope.templateArray = response.templates;
		/*
		for (var i = 0; i < $scope.templateArray.length; i++){
			console.log($scope.templateArray[i]);
		}
		*/
	})
	.error(function () {
		console.log('dio un error: ' + response);
	});
	
	$scope.changeStatus = function(Template){
		//console.log(Template);
		var method = '/template/' + Template.temp.id.toString() + (Template.temp.is_disabled == true ? '/enable': '/disable');
		var Furl = $scope.API_url + method;
		
		$http({
            url: Furl,
            method: "POST",
            data: {},
            headers: {'Content-Type': 'application/json', 'X-Session-Id': $scope.user.session_id}
        }).success(function(response) {
        	    alert('Información guardada correctamente.');
				Template.temp.is_disabled = !Template.temp.is_disabled;
				//$scope.$apply();
	        }
	    ).error(function(myError){
			
			alert("Ha ocurrido un error, por favor verificar.");
		});
	}
/*	
	$scope.enable = function(idNumber, idControl){
		var method = '/template/' + idNumber.toString() + '/enable';
		var Furl = $scope.API_url + method;

		callDisableEnable(Furl, $scope.user.session_id, idControl);
	}
	
	$scope.disable = function(idNumber, idControl){
		var method = '/template/' + idNumber.toString() + '/disable';
		var Furl = $scope.API_url + method;

		callDisableEnable(Furl, $scope.user.session_id, idControl);
	}
	

	function callDisableEnable(urlPath, session, idControl){
	alert(idControl);
		$http({
            url: urlPath,
            method: "POST",
            data: {},
            headers: {'Content-Type': 'application/json', 'X-Session-Id': session}
        }).success(function(response) {
        	    alert('Información guardada correctamente.');
	        }
	    ).error(function(myError){
			
			alert("Ha ocurrido un error, por favor verificar.");
		});
	}
*/	
	$scope.preview = function(myHtml, css)
	{
		var html = "<html> <head> ";
		var bootstrapcss = "<link rel='stylesheet' href='/resources/bootstrap/css/bootstrap.min.css' />";
        html += bootstrapcss + '<style>' + css + '</style>';
		html += "</head> <body> " + myHtml + " </body> </html>" 

		$('#preview-iframe').contents().find('body').html(html);

	}
	
	$scope.edit = function(){
		window.location.href = '/template/edit/' + this.myTemplate.id;
		//alert('/template/edit/' + this.myTemplate.id);
	}
	//-------------------------------------

	$scope.changeRol = function(user){

		var modalInstance = $modal.open({
	      animation: false,
	      templateUrl: 'RolUser.html',
	      controller: 'ModalInstanceCtrl',
	      //size: size
	    });

	    modalInstance.result.then(function (confirm) {
	      if (confirm == true)
	      {
	      	var method = '/user/' + user.fb_id + '/edit';
			var Furl = $scope.API_url + method;

			$http({
	            url: Furl,
	            method: "PUT",
	            data: {is_admin : user.is_admin ? 1 : 0},
	            headers: {"X-Session-Id": $scope.user.session_id}
	        }).then(function(response) {
		        	
		        }, 
		        function(response) { // optional
		        }
		    );
	      }
	    }, function () {
	      //$log.info('Modal dismissed at: ' + new Date());
	    });
		// //Simple POST request example (passing data) :
		
	}

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
				//code added by Frank Javier
				$scope.userImage = $scope.user.user_data.profile_picture_url; 
				$scope.userImage = (!$scope.userImage) ? '/resources/dist/img/user2-160x160.jpg' : $scope.API_url + '/' + $scope.userImage;
				//--------------------------
 				console.log($scope.user);
 				getRegisteredUsers();
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

    //code added by Frank Javier
	$scope.viewProfile = function () {
	    //Codigo temporal
        /*
	    $scope.user.fb_id = "23498dkfjh234";
	    $scope.user.email = "some@email.com";
	    $scope.user.name = "Juan";
	    $scope.user.lastname = "Perez";
	    $scope.user.telephone = "809";
	    $scope.user.webpage = "cv";
	    $scope.user.updated_at = "2015";
	    $scope.user.created_at = "2015";
	    $scope.user.is_admin = 1;
        */
        //Codigo Temporal

	    $scope.isViewProfile = true;
	}

	$scope.closeViewProfile = function () {
	    $scope.isViewProfile = false;
	};
    //End code added
	
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