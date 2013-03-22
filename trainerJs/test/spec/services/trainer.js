'use strict';

describe('Service: trainer', function () {

  // load the service's module
  beforeEach(module('trainerJsApp'));

  // instantiate service
  var trainer;
  beforeEach(inject(function (_trainer_) {
    trainer = _trainer_;
  }));

  it('should do something', function () {
    expect(!!trainer).toBe(true);
  });

});
