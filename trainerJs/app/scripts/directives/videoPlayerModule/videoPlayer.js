'use strict';

angular.module('videoPlayerModule')
  .directive(
			"videoPlayer",
			function($log, youtube) {
				return {
					restrict : "E",
					link : function postLink(scope, element, attrs) {
						// We are clovering the scope... maybe the scope
						// should only
						// expose the playVideo(...) method
						// What's the angular best practice for this ??
						scope.player = null;
						$log.info("Rendering test yt-player with angular");
						var initialVideoData = null;
						if (typeof (attrs.initialVideoData) !== 'undefined'
							&& attrs.initialVideoData !== null) {
							initialVideoData = angular.fromJson(attrs.initialVideoData);
						}
						youtube.setInitialVideo(element, initialVideoData);
							// scope.$watch("videoId", function(value) {
							// videoId = value;
							// youtube.playVideo(element, videoId);
							// });
						youtube.playVideo(element, initialVideoData);
						scope.playVideo = function(videoData) {
							youtube.playVideo(element, angular.fromJson(videoData));
						};
					}
				};
			});
