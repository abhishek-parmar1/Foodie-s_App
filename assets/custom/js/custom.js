// initialise ng-app
var foodiesApp = angular.module('foodiesApp',['ngRoute']);

// creating the urls
foodiesApp.config(function ($routeProvider){
        // html  url
        $routeProvider.when('/', {
            templateUrl : 'pages/login.html',
        });
        // home page url
        $routeProvider.when('/home', {
            templateUrl : 'pages/home.html',
        });
        // restaurant  page url (dynamic url)
        $routeProvider.when('/restaurant/:restaurantIndex', {
            templateUrl : 'pages/restaurant.html',
        });
});

// service which contains restaurants details
foodiesApp.service('restaurantsService', function() {
	this.restaurants = [
		{
			restaurantName : 'Barbeque Nation',
            restaurantArea : 'Cannaught Place',
			restaurantLocation : '2nd Floor, Munshilal Building, Block N, Outer Circle, Connaught                         Place, New Delhi',
			cuisines : 'North Indian, Chinese',
			costForTwo : 1600,
            hours : '12 Noon to 3 PM, 6:30 PM to 11 PM (Mon-Sun)',
            image : 'source1.jpg',
            rating : 4.1,
			famousDish: {
				name: 'Bean Salad',
				url: 'http://noblepig.com/images/2016/06/Avocado-and-Three-Bean-Salad-is-perfect-for-a-summertime-barbecue-side-dish.JPG'
			}
		},
        {
			restaurantName : 'Too Indian',
            restaurantArea : 'Rajouri Garden',
			restaurantLocation : 'A 39, Vishal Enclave, Rajouri Garden, New Delhi',
			cuisines : 'Modern Indian',
			costForTwo : 1200,
            hours : '12 Noon to 1 AM (Mon-Sun)',
            featuredIn : 'Newly opened, Live music, Arabian nights',
            image : 'source2.jpg',
            rating : 4.4,
			famousDish: {
				name: 'Bean Salad',
				url: 'http://noblepig.com/images/2016/06/Avocado-and-Three-Bean-Salad-is-perfect-for-a-summertime-barbecue-side-dish.JPG'
			}
		},
        {
			restaurantName : 'Bukhara - ITC Maurya',
            restaurantArea : 'ITC Maurya, Chanakyapuri',
			restaurantLocation : 'ITC Maurya, Chanakyapuri, New Delhi',
			cuisines : 'North Indian',
			costForTwo : 6500,
            hours : '12:30 PM to 2:45 PM, 7 PM to 11:45 PM (Mon-Sun)',
            featuredIn : 'Legendary outlets, Trending this week',
            image : 'source3.jpg',
            rating : 4.2,
			famousDish: {
				name: 'Bean Salad',
				url: 'http://noblepig.com/images/2016/06/Avocado-and-Three-Bean-Salad-is-perfect-for-a-summertime-barbecue-side-dish.JPG'
			}
		},
        {
			restaurantName : 'Diggin',
            restaurantArea : 'Anand Lok',
			restaurantLocation : 'Anand Lok Shopping Centre, Opposite Gargi College, Anand Lok, New                       Delhi',
			cuisines : 'Italian, Continental, Cafe',
			costForTwo : 1400,
            hours : '18:30 AM to 11 PM (Mon-Sun)',
            featuredIn : 'Pizza time',
            image : 'source4.jpg',
            rating : 4.3,
			famousDish: {
				name: 'Bean Salad',
				url: 'http://noblepig.com/images/2016/06/Avocado-and-Three-Bean-Salad-is-perfect-for-a-summertime-barbecue-side-dish.JPG'
			}
		},
        {
			restaurantName : 'The G.T. Road',
            restaurantArea : 'Cannaught Place',
			restaurantLocation : 'M 39, Outer Circle, Connaught Place, New Delhi',
			cuisines : 'North Indian, Afghani, Mughlai',
			costForTwo : 1500,
            hours : '12 Noon to 3:30 PM, 7 PM to 12 Midnight (Mon-Sun)',
            featuredIn : 'Great buffets, Trending this week',
            image : 'source5.jpg',
            rating : 4.5
			//famousDish: {
				//name: 'Bean Salad',
				//url: 'http://noblepig.com/images/2016/06/Avocado-and-Three-Bean-Salad-is-perfect-for-a-summertime-barbecue-side-dish.JPG'
			//}
		}
	];
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
foodiesApp.controller('homeController',function($scope,restaurantsService){
    // take array of objects from service to show details
    $scope.restaurants = restaurantsService.restaurants;
});

// restaurants controller section
foodiesApp.controller('restaurantController',function($scope,restaurantsService,$routeParams){
    
    // take array of objects from service to get restaurant details
    var restaurants = restaurantsService.restaurants;
    // take object of current restaurant
    $scope.restaurant = restaurants[$routeParams.restaurantIndex];
    // flag variable to show famous dish section
    $scope.famousDishFlag = false;
    // toggle flag variable to show famous dish section
    $scope.showFamousDish = function(){
        if($scope.famousDishFlag == false)
            $scope.famousDishFlag = true;
        else
            $scope.famousDishFlag = false;
    }
    $scope.getIngredients = function(famousDishUrl)
    {
        console.log(famousDishUrl);
    }
});


