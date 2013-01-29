'use strict';

/* Directives */
var directivesModule = angular.module('trainingComponents', []);

/**
 * jquery accordion
 */
/*
 * directivesModule.directive('accordion', function factory() { return { priority : 0, restrict : 'E', transclude : true, replace : true, scope : {}, template : '<div class="accordion" ng-transclude></div>',
 * link : function(scope, iElement, iAttr) { iElement.accordion( { header : "h3.accordionTitle", heightStyle : "content" }); } }; });
 * 
 * directivesModule .directive( 'accordionTab', function() { return { priority : 1, restrict : 'E', replace : true, transclude : true, scope : { title : '@' }, template : '<div><h3 class="accordionTitle"><a
 * href="#">{{title}}</a></h3>' + '<div ng-transclude></div></div>' }; });
 */