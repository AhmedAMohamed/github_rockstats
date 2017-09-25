// first parameter is th name of the app,
// second parameter is the list of dependecies
var app = angular.module('myApp',["ngRoute",'ngFileUpload']);

 app.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
    $routeProvider
     .when("/", {
         templateUrl : "/pages/home.html",
         controller : "homeController",
     }).when("/list", {
       templateUrl : "/pages/viewList.html",
       controller : "listController"
     }).otherwise({
        redirectTo: '/error'
     });
     $locationProvider.html5Mode(true);
 }]);
////////////////////////****************************   HOME Controller
app.controller('homeController', homeController);
//dependency injection
homeController.$inject=['$scope', '$http', '$window','$location'];
function homeController($scope, $http, $window, $location){
	$scope.searchData = {};
    $scope.searchData.user_name = "";
	$scope.resetForm = function(form) {
    	      	angular.copy({},form);
    	      	$scope.created = false;
        	}
	$scope.search = function(){
		var searchObject = {
	 		'search_name': $scope.searchData.user_name
		};
		$http({
			method: 'get',
			url:'/list/',
			headers: {
			    'Content-Type': 'application/json',
			    'search_name' : $scope.searchData.user_name
			}
		})
		.then(function(response) {
			if(response.data.valid){
                $window.sessionStorage.setItem("users", JSON.stringify(response.data.result));
				$location.path('/list');
			}
			else
			{
				console.log("ERROR");
				$scope.resetForm($scope.searchData); 
			}
	    });
	}
}

//////////////////////////*************************** LIST USERS Controller
app.controller('listController', listController);
//dependency injection
listController.$inject=['$scope', '$http', '$window', '$location'];
function listController($scope, $http, $window, $location){
	$scope.users = [];

	$scope.getUsers = function(){
	    var res=JSON.parse($window.sessionStorage.getItem("users"));
	    res = res.map(function(user) {
	        if (user.bio == null || typeof user.bio == 'undefined') {
	            user.bio = "No data to view";
	        }
	        return user;
	    })
        $scope.users = res;

	}
}