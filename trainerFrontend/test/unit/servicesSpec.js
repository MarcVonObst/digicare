'use strict';

/* jasmine specs for services go here */

describe('userModule test', function() {
	var auth;

	beforeEach(module('userServices'));
	beforeEach(function() {
		inject(function($injector) {
			auth = $injector.get('auth');
		});
	});

	it('should return user', function() {
		var user = auth.getUser();

		expect(user.id).toBe("52038");
	});
});

describe('trainerModule test', function() {
	var httpMock, trainer, auth, getResult, postResult;

	beforeEach(module('trainerServices'));
	beforeEach(module('userServices'));

	beforeEach(function() {
		getResult = {
			success : jasmine.createSpy().andReturn(getResult),
			error : jasmine.createSpy().andReturn(getResult)
		};
		postResult = {
			success : jasmine.createSpy().andReturn(getResult),
			error : jasmine.createSpy().andReturn(getResult)
		};
		httpMock = {
			get : jasmine.createSpy().andReturn(getResult),
			post : jasmine.createSpy().andReturn(postResult)
		};

		module(function($provide) {
			$provide.value('$http', httpMock);
		});

		inject(function($injector) {
			trainer = $injector.get('trainer');
			auth = $injector.get('auth');
		});
	});

	it('should call get', function() {
		trainer.testCall('one');

		expect(httpMock.get).toHaveBeenCalledWith('one');
	});

	it('should call post', function() {
		trainer.createTraining();
		expect(httpMock.post);
		postResult.success;
	});

});
