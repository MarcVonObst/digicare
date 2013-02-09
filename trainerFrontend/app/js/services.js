'use strict';

/* Services */

/**
 * user related stuff
 */
angular.module('userServices', [], function($provide) {
	$provide.factory('auth', [ '$http', function() {
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
	} ]);

});

angular
		.module('trainerServices',
				[],
				function($provide) {
					$provide.factory('trainer', [ '$http', '$log', 'auth', function($http, $log, auth) {
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
							}

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

							// gets the last training id from the server and calls the given function with it
							var loadLastTrainingIdAndCall = function(callback) {
								$http.get("http://my.office.hikuku.de/api/v1/users/" + userId + "/trainings?last").success(function(lastTrainingId, status) { // do with last traininig id
											callback(lastTrainingId);
										}).error(function(data, status) {
									// TODO do something
									});
							};// loadLastTrainingIdAndCall

							var onTrainingCreationStatusCreatedCall = function(trainingId, callback) {
								$http.get("http://my.office.hikuku.de/api/v1/users/" + userId + "/trainings/" + trainingId + "/status", {}, {
									headers : {
										'Content-Type' : 'application/json; charset=UTF-8'
									}
								}).success(function(trainingStatusJson, status) {
									if (status === 201) {
										doThisFunction(trainingStatusJson);
									} else if (status == 200) { // loop that keeps calling the api until it succeeds
											_.delay(doWithLastTrainingId, 1000, [ doThisFunction ]);
										}
									})// success
										.error(function(data, status) { // TODO do something
												}); // error
							};// onTrainingCreationStatusCreatedCall
							trainerService.getLastTrainingUri = function(acceptFormat) {
								return "http://my.office.hikuku.de/api/v1/users/" + userId + "/trainings?last&" + "acceptFormat=" + acceptFormat;
							};
							// public function that does something with the training
							trainerService.doWithTraining = function(showTraining) { // get the id of the last training and call the status resource

								$http( {
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

							var TRAINING_POLL_TIME_MS = 4000;

							trainerService.testCall = function(param) {
								$http.get(param);
							};

							return trainerService;
						} ]); // $provide.factory('trainer'...

				$provide
						.factory(
								'trainerMock',
								[
										'$log',
										'auth',
										function($log, auth) {
											var trainerService = [];
											trainerService.createTraining = function(trainingParameters) {
												$log.info("CreateTraining called");
											};

											trainerService.doWithTraining = function(showJson, showMp3) { // get the id of the last training and call the status resource
												$log.info("doWithTraining called");
												showJson( {
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
												showMp3("http://love-my-oldies.freehomepage.com/music/Michael%20Jackson/01%20-%20Michael%20Jackson%20-%20Hold%20My%20hand%20(duet%20with%20akon)%20(produced%20by%20akon%20and%20giorgio%20tuinfort).mp3");
											};// $provide.factory('trainerMock'...
											return trainerService;
										} ]);
			});// TrainerService

