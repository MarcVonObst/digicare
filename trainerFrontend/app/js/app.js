'use strict';

/* App Module */

var trainerApp = angular.module('trainerApp', [ 'ui.bootstrap', 'trainerFilters', 'trainerServices', "trainingComponents", "userServices" ]).config([ '$routeProvider', function($routeProvider) {
	$routeProvider
	// .when('/login', {
	// templateUrl : 'partials/login.html',
	// controller : LoginCtrl
	// })
	.when('/select', {
		templateUrl : 'partials/select.html',
		controller : 'SelectCtrl'
	}).when('/training', {
		templateUrl : 'partials/training.html',
		controller : 'TrainingCtrl'
	})
	// when('/feedback', {
	// templateUrl : 'partials/feedback.html',
	// controller : 'FeedbackCtrl'
	// })
	.otherwise({
		redirectTo : '/training'
	});
} ]).config([ '$httpProvider', function($httpProvider) {
	delete $httpProvider.defaults.headers.common["X-Requested-With"];
} ]);
