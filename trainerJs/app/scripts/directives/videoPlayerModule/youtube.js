'use strict';

angular.module('videoPlayerModule')
  .factory('youtube', [
                    '$window',
           			'$http',
        			'browserUtils',
        			function($window, $http, browserUtils) {
                    	function getPlayerInstanceId(element) {
    						return element.attr('id') + "_iframeContent";
                    	}

						/**
						 * Initializes the individual player.
						 * @param element
						 * @param videoId
						 * @returns
						 */
						function initVideoPlayer(element, videoId) {
							var playerIframe = element.children('iframe');
							playerIframe.attr('id', getPlayerInstanceId(element));

							var platformSpecificParams = "controls=0&autoplay=1&";
//							alert(browserUtils.getUserAgent());
							if (browserUtils.isMobileBrowser()) {
//								alert("mOBILE BROWSER");
								platformSpecificParams = "controls=1&autoplay=0&";
							}
//							else {
//								alert("NON MOBILE BROWSER");
//							}

							if (element.data('initialVideo')===null) {
								element.data('initialVideo', {"yt": "QxT9lqCYIZ0"});
							}
							var ytIframeMarkup = "<iframe id='"
								+ getPlayerInstanceId(element)
								+ "' type='text/html' width='480' height='270'"
								+ "src='http://www.youtube.com/embed/"
								+ element.data('initialVideo')
								+ "?enablejsapi=1&"
								+ platformSpecificParams
								+ "rel=0'"
								+ "frameborder='0'></iframe>";
							element.html(ytIframeMarkup);


							if (element.data('player') === undefined) {
								element.data('isPlayerReady', false);
								var oPlayer = new $window.YT.Player(
									getPlayerInstanceId(element),
									{
										videoId : videoId,
										events : {
											'onReady' : function onPlayerReady(event) {
												console.log("Child iframe ID" + element.children("iframe").attr("id"));
												element.data('isPlayerReady', true);
												event.target.playVideo();
											},
											'onStateChange' : function onStateChange(event) {
												if (event.data === 0) {
													// Ended
													element.data('player').playVideo();
												}
												if (event.data === 5) {
													// Video
													// Cued
													element.data('player').playVideo();
												}
											}
										}
									});
								element.data('player', oPlayer);
							}
						}

						function playVideoInElement(element,
							videoId) {
							if (element.data('isPlayerReady'))  {
								element.data('player').cueVideoById(videoId);
								element.data('player').playVideo();
							}
							else {
								//The player is not yet ready. Waiting
							}
						}

						//The returned object is what we expose as a service:
        				return {
        					setInitialVideo : function(element,
        						initialVideoData) {
        						element.data('initialVideo',
        							new String(initialVideoData.yt));
        					},
        					playVideo : function(element, videoData) {
        						var playerInstanceId = getPlayerInstanceId(element);
        						console.log("Intended iframe ID: " + playerInstanceId);

        						// TODO: Should this be window.YT ??
        						if ((typeof ($window.YT) != 'undefined')
        							&& (typeof ($window.YT.Player) != 'undefined')) {
        							playVideoInElement(element,	videoData.yt);
        						} else {
        							// We initialize the markup otherwise
        							// the youtube api complains of a cross
        							// domain access and nothing works.
        							console.log("player id" + playerInstanceId);

        							var oldHandler =$window.onYouTubeIframeAPIReady;
        							$window.onYouTubeIframeAPIReady = function() {
        								initVideoPlayer(element, videoData.yt);
        								// chain calls from all other video tags
        								if (oldHandler) {
        									oldHandler();
        								}
        							}
        							if (!oldHandler) {
        								// this was the first call to the youtube api, initialize it
        								$http.jsonp('http://www.youtube.com/iframe_api');
        							}
        						}
        					}
        				};
        			}]);
