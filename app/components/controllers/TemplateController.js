'use strict';

// create the controller and inject Angular's $scope
// set for Route Controller
cvApp.controller('TemplateController', ['$scope','Upload', function ($scope, Upload) {

	$scope.htmlControl = "";
	$scope.previewControl = "";
	$scope.model = {};
	$scope.model.css = "";
	$scope.model.html = "";
	$scope.model["X-Session-Id"] = "62106fe2-2aeb-40d6-b71d-2bd0778a816f";
    $scope.selectedFile = [];
    $scope.uploadProgress = 0;
    $scope.model.preview_image



	$scope.preview = function()
	{
		var html = "<html> <head> ";

		$scope.previewControl = $scope.htmlControl;
		var iframeDoc = document.getElementById('preview-iframe').contentWindow.document;

		var bootstrapcss = "<link rel='stylesheet' href='/resources/bootstrap/css/bootstrap.min.css' />";
        html += bootstrapcss + '<style>' + $scope.model.css + '</style>';
		html += "</head> <body> " + $scope.model.html + " </body> </html>" 

		$('#preview-iframe').contents().find('body').html(html);

	}

	$scope.uploadFile = function () {
        var file = $scope.selectedFile;
        console.log(file);
        $scope.upload = Upload.upload({
            url: 'http://api.cvonline.aliensoft.net/template/create',
            method: 'POST',
            "Content-Type": 'multipart/form-data', 
            data: $scope.model/*angular.toJson($scope.model)*/,
        }).progress(function (evt) {
            $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total, 10);
        }).success(function (data) {
            //do something
        });
    };

    $scope.onFileSelect = function ($files) {
    	console.log("File: " + $files);
        $scope.uploadProgress = 0;
        $scope.selectedFile = $files;
        $scope.model.preview_image = $files;
    };



	// process the form
	$scope.processForm = function() {
		$http({
	        method  : 'POST',
	        url     : 'http://api.cvonline.aliensoft.net/template/create',
	        data    : $.param($scope.formData),  // pass in data as strings
	        headers : { 'Content-Type': 'multipart/form-data' }  // set the headers so angular passing info as form data (not request payload)
	    })
	        .success(function(data) {
	            console.log(data);
	            if (!data.success) {
	            	// if not successful, bind errors to error variables
	                $scope.errorName = data.errors.name;
	                $scope.errorSuperhero = data.errors.superheroAlias;
	            } else {
	            	// if successful, bind success message to message
	                $scope.message = data.message;
                                $scope.errorName = '';
	                $scope.errorSuperhero = '';
	            }
	        });
	};
	
}]);

cvApp.directive('progressBar', [
        function () {
            return {
                link: function ($scope, el, attrs) {
                    $scope.$watch(attrs.progressBar, function (newValue) {
                        el.css('width', newValue.toString() + '%');
                    });
                }
            };
        }
    ]);