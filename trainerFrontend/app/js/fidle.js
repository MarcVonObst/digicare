var myApp = angular.module('myApp', []);

myApp.config(function($routeProvider) {
	$routeProvider.when('/page1', {
		controller : Ctrl1,
		templateUrl : 'page1.html'
	}).when('/page2', {
		controller : Ctrl2,
		templateUrl : 'page2.html'
	}).otherwise( {
		redirectTo : '/page1'
	});
});

function MyController($scope) {
	$scope.doSomethingAndChangeRoute = function() {
		// perform some action here...
		// $route.current = ??
		// 
	}
}

function Ctrl1() {
}

function Ctrl2($scope, $location) {
	$scope.doSomethingAndChangeRoute = function() {
		alert('You\'re about to go back to page 1...');
		$location.path('/page1');
	}

}