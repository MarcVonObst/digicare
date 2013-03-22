'use strict';

describe('Controller: SelectCtrl', function () {

  // load the controller's module
  beforeEach(module('trainerJsApp'));

  var SelectCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = {};
    SelectCtrl = $controller('SelectCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
