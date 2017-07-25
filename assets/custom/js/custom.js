// initialise ng-app
var foodiesApp = angular.module('foodiesApp',['ngRoute']);

// creating the urls
foodiesApp.config(function ($routeProvider){
        $routeProvider.when('/', {
            templateUrl : 'pages/login.html',
        });
        $routeProvider.when('/home', {
            templateUrl : 'pages/restaurants.html',
        });
});

// service which contains restaurants details
foodiesApp.service('restaurantsService', function() {
	this.restaurants = [
		{
			name: 'Rajat',
			postion: 'Fullstack Developer',
			sex: 'male',
			age: 23,
			favouriteDish: {
				name: 'Bean Salad',
				url: 'http://noblepig.com/images/2016/06/Avocado-and-Three-Bean-Salad-is-perfect-for-a-summertime-barbecue-side-dish.JPG'
			}
		},
		{
			name: 'Ankur',
			postion: 'Backend Developer',
			sex: 'male',
			age: 24
		},
		{
			name: 'Jitesh',
			postion: 'Java Developer',
			sex: 'male',
			age: 26
		},
		{
			name: 'Varun',
			postion: 'Co-founder',
			sex: 'male',
			age: 28
		}
	]
});


// login controller section
foodiesApp.controller('loginController',function($scope,$location){
    // this function will direct the user to home page (restaurant.html) 
    $scope.goToHome = function(user){
        if(user.email != undefined && user.password != undefined)
            $location.url('home');
    }
});

// restaurants controller section
foodiesApp.controller('restaurantsController',function($scope){
    console.log("restaurants");
});

