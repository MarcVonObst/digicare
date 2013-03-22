'use strict';

describe('Controller: TrainingCtrl', function () {

  // load the controller's module
  beforeEach(module('trainerJsApp'));

  var TrainingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = {};
    TrainingCtrl = $controller('TrainingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
