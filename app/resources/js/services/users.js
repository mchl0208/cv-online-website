cvApp.factory('users', ['$http', function($http, $scope) { 
	// var method = '/user/create';
	// var Furl = $scope.API_url + method;

	// $http({
 //        url: Furl,
 //        method: "POST",
 //        data: {fb_token : token, is_admin : '1'},
 //        headers: {'Content-Type': 'application/json'}
 //    }).then(function(response) {
 //        $scope.logInAPI(response.data.fb_token);
 //    });


	var virtualScope = angular.element(document.getElementById('UserControllerId')).scope();

    var req = {
	 method: 'GET',
	 url: 'http://api.cvonline.aliensoft.net/user/list',
	 headers: {'Content-Type': 'application/json', "X-Session-Id": virtualScope.user},
	}

  return $http(req) 
            .success(function(data) { 
              return data; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}]);