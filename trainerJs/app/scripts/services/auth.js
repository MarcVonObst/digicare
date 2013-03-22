'use strict';

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

angular.module('userServices', [], function($provide) {
	$provide.factory('auth', userServiceMock);
});
