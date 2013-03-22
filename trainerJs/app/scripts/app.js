'use strict';


//angular.module('trainerJs.config', []).value('trainerJsConfig', {});
angular.module('utilsModule', []);

angular.module('videoPlayerModule', ['utilsModule']);

angular.module('trainerJsApp', ['videoPlayerModule', 'userServices', 'trainerServices'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/select', {
        templateUrl: 'views/select.html',
        controller: 'SelectCtrl'
      })
      .when('/training', {
        templateUrl: 'views/training.html',
        controller: 'TrainingCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]).config([ '$httpProvider', function($httpProvider) {
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
  } ]);
