'use strict';

describe('Directive: videoPlayer', function () {
  beforeEach(module('trainerJsApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<video-player></video-player>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the videoPlayer directive');
  }));
});
