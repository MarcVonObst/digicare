'use strict';

/* Controllers */

function SelectCtrl($scope, $location, $http, trainer) {
	// $scope.phones = Trainer.query();
	$scope.training = 'Super Training';
	$scope.createTraining = function() {
		// TODO disable buttons, and show loading message (maybe in an overlay)
		trainer.createTraining( {
			"trainingLengthMinutes" : "20"
		});
		$location.path('/training');
	};
}

SelectCtrl.$inject = [ '$scope', '$location', '$http', 'trainer' ];

function TrainingCtrl($scope, $routeParams, trainer) {

	// if (!trainer.hasTraining()) {
	// $location.path("/select");
	// } else {

	// show loading message

	trainer.doWithTraining(function(training) {
		$scope.trainingSections = training.sections;
		$scope.getAllExercises = function() {
			var result = _.reduce(training.sections, function(result, section) {
				var newresult = result.concat(section.exercises);
				return newresult;
			}, []);
			return result;
		};
		// hide training loading message
			$http.get(training.mp3Uri)
			player.setMp3(training.mp3Uri);
		});

	// }
}

TrainingCtrl.$inject = [ '$scope', '$routeParams', 'trainer' ];

function AudioPlayerCtrl($scope) {
	soundManager
			.setup( {
				url : 'lib/swf/',
				flashVersion : 9, // optional: shiny features (default = 8)
				useFlashBlock : false, // optionally, enable when you're ready to dive in
				/**
				 * read up on HTML5 audio support, if you're feeling adventurous. iPad/iPhone and devices without flash installed will always attempt to use it.
				 */
				onready : function() {
					var mySound = soundManager
							.createSound( {
								id : 'aSound',
								url : "http://love-my-oldies.freehomepage.com/music/Michael%20Jackson/01%20-%20Michael%20Jackson%20-%20Hold%20My%20hand%20(duet%20with%20akon)%20(produced%20by%20akon%20and%20giorgio%20tuinfort).mp3"
							});
					mySound.play();
				},
				ontimeout : function() {
					// Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
			}
			});
}