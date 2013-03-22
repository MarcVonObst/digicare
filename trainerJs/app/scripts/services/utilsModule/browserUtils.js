'use strict';

angular.module('utilsModule')
  .factory('browserUtils', ['$window', function ($window) {
		return {
			"isMobileBrowser": function () {
				if ($window.navigator.userAgent.match(/Android/i)
						|| $window.navigator.userAgent.match(/webOS/i)
						|| $window.navigator.userAgent.match(/iPhone/i)
						|| $window.navigator.userAgent.match(/iPad/i)
						|| $window.navigator.userAgent.match(/iPod/i)
						|| $window.navigator.userAgent.match(/BlackBerry/i)
						|| $window.navigator.userAgent.match(/Windows Phone/i)) {
					return true;
				} else {
					return false;
				}
			},
			"getUserAgent": function () {
				return $window.navigator.userAgent;
			}
		};
	}]);
