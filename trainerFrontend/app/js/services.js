'use strict';

/**
 * angular modules with services are defined here.
 * 
 * 
 */

/*
 * user related stuff
 */
/**
 * a user service, that immediately logs the user in
 */
var userServiceMock = [ '$http', function() {
	var authService = [];
	var user = {
		id : "52038"
	};

	/**
	 * get the currently logged in user
	 */
	authService.getUser = function() {
		return user;
	};
	authService.getUserId = function() {
		return user.id;
	};

	return authService;
} ];

/**
 * a user service that logs into liferay
 */
var userServiceLiferay = [ function() {
	return [];
} ];

/*
 * trainer services
 */

/**
 * the real trainer that calls the backend for trainings
 */
var trainerServiceReal = [ '$http', '$log', 'auth', function($http, $log, auth) {
	var trainerService = [];
	var userId = auth.getUserId();
	trainerService.testCall = function(param) {
		$http.get(param);
		auth.getUser();
	};
	var waitingForTrainingCreation = false;

	// transforms json data to form parameters
	var transformJsonToFormParams = function(data) {
		return $.param(data);
	};

	trainerService.createTraining = function(trainingParameters) {
		if (!waitingForTrainingCreation) {
			waitingForTrainingCreation = true;
			$http.post("http://my.office.hikuku.de/api/v1/users/" + userId + "/trainings", trainingParameters, {
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				transformRequest : transformJsonToFormParams
			}).success(function(data, status) {
				trainerService.status = status;
				waitingForTrainingCreation = false;
			}).error(function(data, status) {
				// throw exception / event
				waitingForTrainingCreation = false; // TODO do something
			});
		}
	}; // createTraining()

	trainerService.getLastTrainingUri = function(acceptFormat) {
		return "http://my.office.hikuku.de/api/v1/users/" + userId + "/trainings?last&" + "acceptFormat=" + acceptFormat;
	};
	// public function that does something with the training
	trainerService.doWithTraining = function(showTraining) { // get the id of the last training and call the status resource

		$http({
			method : 'GET',
			url : trainerService.getLastTrainingUri("json"),
			headers : {
				'Accept' : 'application/json'
			}
		}).success(function(response, status) {
			if (status == 200) {
				showTraining(response);
			}
		})// success
		.error(function(data, status) { //
			$log.error("Could not find id for last TrainingSession. data:" + data + "\nstatus: " + status);
		});// error
	};// doWithTraining

	trainerService.testCall = function(param) {
		$http.get(param);
	};

	return trainerService;
} ]; // trainerServiceReal

var trainerServiceMock = [ '$log', 'auth', function($log, auth) {
	var trainerService = [];
	trainerService.createTraining = function(trainingParameters) {
		$log.info("CreateTraining called");
	};

	trainerService.doWithTraining = function(showTraining) { // get the id of the last training and call the status resource
		$log.info("doWithTraining called");
		showTraining({
			"sections" : [ {
				"name" : "Warmup",
				"exercises" : [ {
					"uniqueName" : "schulterb",
					"name" : "schulterblick",
					"startTime" : "2:0",
					"videoUrl" : "https://www.youtube.com/watch?feature=player_embedded&v=WrGfuwZijyo"
				}, {
					"uniqueName" : "anfersen",
					"name" : "Anfersen mit arm schwingen",
					"startTime" : "3:23",
					"videoUrl" : "https://www.youtube.com/watch?feature=player_embedded&v=TLkVMtzZRkw"
				}, {
					"uniqueName" : "hopper",
					"name" : "der Hopper",
					"startTime" : "5:0",
					"videoUrl" : "https://www.youtube.com/watch?feature=player_embedded&v=-k5BQK5uyq8"
				} ]
			}, {
				"name" : "Workout",
				"exercises" : [ {
					"uniqueName" : "beinschwingen",
					"name" : "beinschwingen im Kniestand",
					"startTime" : "6:0",
					"videoUrl" : "https://www.youtube.com/watch?feature=player_embedded&v=M-GQFgqmz-U"
				}, {
					"uniqueName" : "seitlBruecke",
					"name" : "grosse seitliche brücke",
					"startTime" : "8:0",
					"videoUrl" : "https://www.youtube.com/watch?feature=player_embedded&v=kzn6gLmhg1w"
				}, {
					"uniqueName" : "Beckenliftzweibeinighochgelagert",
					"name" : "Zweibeiniger Beckenlift mit Stuhl",
					"startTime" : "13:0",
					"videoUrl" : "https://www.youtube.com/watch?feature=player_embedded&v=dZL_yBfT0jE"
				} ]
			}, {
				"name" : "Cooldown",
				"exercises" : [ {
					"uniqueName" : "RumpfvorbeugeAufStuhl",
					"name" : "Run in Place",
					"startTime" : "14:30",
					"videoUrl" : "https://www.youtube.com/watch?feature=player_embedded&v=smw4YUsFx_E"
				}, {
					"uniqueName" : "beinbeugeninseitlage",
					"name" : "beinbeugen in Seitlage",
					"startTime" : "17:0",
					"videoUrl" : "https://www.youtube.com/watch?feature=player_embedded&v=pXiC6iy2ekk"
				} ]
			} ]
		});
	};
	trainerService.getLastTrainingUri = function(acceptFormat) {
		if (acceptFormat === "mp3") {
			return "http://195.122.253.112/public/mp3/Beatles/05%20Help!/The%20Beatles%20-%20Help!%20-%2001%20Help!.mp3";
		} else {
			$log.info("getLastTrainingUri called for " + acceptFormat);
			return "localhost";
		}
	};
	return trainerService;
} ]; // trainerserviceMock

angular.module('userServices', [], function($provide) {
	$provide.factory('auth', userServiceMock);
});

angular.module('trainerServices', [], function($provide) {
	$provide.factory('trainer', trainerServiceMock);
});