'use strict';

angular.module('trainerJsApp')
	.controller('SelectCtrl', [ '$scope', '$location', '$http', 'trainer', function($scope, $location, $http, trainer) {
	// $scope.phones = Trainer.query();
	$scope.training = 'Super Training';
	$scope.createTraining = function() {
		// TODO disable buttons, and show loading message (maybe in an overlay)
		trainer.createTraining({
			'trainingLengthMinutes' : '20'
		});
		$location.path('/training');
	};
} ]);


