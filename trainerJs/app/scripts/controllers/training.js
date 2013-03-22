'use strict';

angular.module('trainerJsApp').controller('TrainingCtrl', [ '$scope', '$routeParams', '$log', 'trainer', function($scope, $routeParams, $log, trainer) {
	// $scope.getAllExercises = function() {
	// return {
	// "sections" : [ {
	// "name" : "Warmup",
	// "exercises" : []
	// }, {
	// "name" : "Workout",
	// "exercises" : []
	// }, {
	// "name" : "Cooldown",
	// "exercises" : []
	// } ]
	// };
	// };
	// if (!trainer.hasTraining()) {
	// $location.path("/select");
	// } else {

	// show loading message

	$scope.trainingMp3Url = trainer.getLastTrainingUri('mp3');

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
		// $http.get(training.mp3Uri)
		// player.setMp3(training.mp3Uri);
		soundManager.setup({
			url : 'lib/soundmanager/swf/',
			flashVersion : 9, // optional: shiny features (default = 8)
			useFlashBlock : false, // optionally, enable when you're ready to dive in
			/**
			 * read up on HTML5 audio support, if you're feeling adventurous. iPad/iPhone and devices without flash installed will always attempt to use it.
			 */
			onready : function() {
				// Ready to use; soundManager.createSound() etc. can now be called.
			}
		});

	});
} ]);
