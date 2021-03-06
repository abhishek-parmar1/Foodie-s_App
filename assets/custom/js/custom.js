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
            id : 0,
            restaurantName : 'Barbeque Nation',
            restaurantArea : 'Cannaught Place',
			restaurantLocation : '2nd Floor, Munshilal Building, Block N, Outer Circle, Connaught                         Place, New Delhi',
			cuisines : 'North Indian, Chinese',
			costForTwo : 1600,
            hours : '12 Noon to 3 PM, 6:30 PM to 11 PM (Mon-Sun)',
            image : 'source1.jpg',
            rating : 4.1,
			famousDish: {
				name: 'Chicken Barbecue',
				url: 'https://0bba85283010b328c484-f139c7401b3658260f434c192b129add.ssl.cf3.rackcdn.com/bombaymixonline.com/manage/manage_uploads/upload/phpUI7Htn.png'
			}
		},
        {
            id : 1,
			restaurantName : 'Too Western',
            restaurantArea : 'Rajouri Garden',
			restaurantLocation : 'A 39, Vishal Enclave, Rajouri Garden, New Delhi',
			cuisines : 'Modern',
			costForTwo : 1200,
            hours : '12 Noon to 1 AM (Mon-Sun)',
            featuredIn : 'Newly opened, Live music, Arabian nights',
            image : 'source2.jpg',
            rating : 4.4,
			famousDish: {
				name: 'McVeggie Burger',
				url: 'http://nisataifesi.com/wp-content/uploads/2014/11/fast_food_burger-wallpaper-1280x720-1140x400.jpg'
			}
		},
        {
            id : 2,
			restaurantName : 'Bukhara - ITC Maurya',
            restaurantArea : 'ITC Maurya, Chanakyapuri',
			restaurantLocation : 'ITC Maurya, Chanakyapuri, New Delhi',
			cuisines : 'North Indian',
			costForTwo : 6500,
            hours : '12:30 PM to 2:45 PM, 7 PM to 11:45 PM (Mon-Sun)',
            featuredIn : 'Legendary outlets, Trending this week',
            image : 'source3.jpg',
            rating : 4.2
		},
        {
            id : 3,
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
				name: 'Pepperoni Pizza',
				url: 'http://www.achnlouspizzainc.com/img/6239/686.png'
			}
		},
        {
            id : 4,
			restaurantName : 'The G.T. Road',
            restaurantArea : 'Cannaught Place',
			restaurantLocation : 'M 39, Outer Circle, Connaught Place, New Delhi',
			cuisines : 'North Indian, Afghani, Mughlai',
			costForTwo : 1500,
            hours : '12 Noon to 3:30 PM, 7 PM to 12 Midnight (Mon-Sun)',
            featuredIn : 'Great buffets, Trending this week',
            image : 'source5.jpg',
            rating : 4.5,
			famousDish: {
				name: "Fruit Pastery",
				url: 'https://s-media-cache-ak0.pinimg.com/originals/f3/76/f0/f376f0ca8421d9bcdf3e89d57f02d496.jpg'
			}
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
foodiesApp.controller('restaurantController',function($scope,restaurantsService,$routeParams,$http){
    
    // take array of objects from service to get restaurant details
    var restaurants = restaurantsService.restaurants;
    // take object of current restaurant
    for(var i=0; i<restaurants.length; i++)
        if(restaurants[i].id == $routeParams.restaurantIndex)
            {
                $scope.restaurant = restaurants[i];
                break;
            }
    // flag variable to show famous dish section
    $scope.famousDishFlag = false;
    // to store the ingredients name  
    $scope.ingredients = [];
    //initially dish is not non-veg
    $scope.nonVegDish = false;
    //initially dish is not veg
    $scope.vegDish = false;
    //
    var nonVegList = ['chicken','meat','beef','egg','fish',];
    // toggle flag variable to show famous dish section
    $scope.showFamousDish = function(){
        if($scope.famousDishFlag == false)
            $scope.famousDishFlag = true;
        else
            $scope.famousDishFlag = false;
    }
    // function take the image url and request to Clarifai Api and get the details of the food item
    $scope.getIngredients = function(famousDishUrl)
    {
        var data = '{"inputs":[{"data":{"image":{"url":"' + famousDishUrl + '"}}}]}';
		$http({
			'method': 'POST',
			'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
			'headers': {
				'Authorization': 'Key c6a5a929d46145c5925ed5aa041906b9',
				'Content-Type': 'application/json'
			},
			'data': data
		}).then(function (response) {
            //store the response in the ingredients array
			var outputArrayOfIngredients = response.data.outputs[0].data.concepts;
            // store the ingredients name in a array
            for(var i=0; i<outputArrayOfIngredients.length; i++){
                $scope.ingredients.push(outputArrayOfIngredients[i].name);
                if(nonVegList.indexOf(outputArrayOfIngredients[i].name) != -1 && $scope.nonVegDish != true)
                    $scope.nonVegDish = true;
            }
            if(!$scope.nonVegDish)
                $scope.vegDish = true;
            
        }, function (xhr) {
        	console.log(xhr);
        });    
    }    
});


