'use strict';

describe('Service: browserUtils', function () {

  // load the service's module
  beforeEach(module('trainerJsApp'));

  // instantiate service
  var browserUtils;
  beforeEach(inject(function (_browserUtils_) {
    browserUtils = _browserUtils_;
  }));

  it('should do something', function () {
    expect(!!browserUtils).toBe(true);
  });

});
