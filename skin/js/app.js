	/* App */
	define(['jquery','underscore','backbone','modernizr','fastclick','utils','reach','leaflet','fingerprint'], function(){
		/* Loads the require modules and away */
		require(['jquery','underscore','backbone','modernizr','fastclick','utils','reach','leaflet','fingerprint'], 
		function($, _, Backbone, Modernizr, FastClick, Utils, Reach, L /* $.fingerprint */){

		/*
		 * Store a version of Backbone.sync to call from the modified version with the Authorization header.
		 * Huawei Level 19.
		 * {"headers":{"Authorization":"Basic Z2FyeTp0cmliYWwkMTIz","X-DeviceId":"00000000-4628-1170-2663-7cf0410a28ef"},
		 * "timeout":2345,"parse":true,"data":{"imei":"00000000-4628-1170-2663-7cf0410a28ef"}}
		*/
		var backboneSync = Backbone.sync;
		Backbone.sync = function (method, model, options) {
			options.headers = app.auth;
			options.headers['X-DeviceId'] = deviceId;
			if (method === "read"){
				options.data = options.data ? _.clone(options.data) : {};
				// options.data = _.extend({ imei : deviceId }, options.data);
			}
			console.log(JSON.stringify(options));
			return backboneSync(method, model, options);
		};

		/*
		 * Device Waiting
		 */
		app = {
			// One Minute for Testing 
			CACHE_REFRESH : 60 * 1000,
			options : {
				platform : 'chrome'
			},
			initialize: function() {
				this.bindEvents();
				/* Take off is in Native Code */
				if (typeof TestFlight !== "undefined"){
					app.testFlight = new TestFlight();
				}
			},
			bindEvents: function() {
				document.addEventListener('deviceready', app.preferencesAvailable, false);
    			document.addEventListener("showkeyboard", function(){ console.log("Keyboard is Up");}, false);
    			document.addEventListener("hidekeyboard", function(){ console.log("Keyboard is Down");}, false);

				app.options = Utils.getOptions(app.options);
				if (app.options.ios){
					console.log("Loading Cordova for iOS!");
					require(['cordova'], function(){
						console.log("Loaded iOS Cordova...");
					});
				} else if (app.options.android){
					console.log("Loading Cordova for Android!");
					require(['cordova'], function(){
						console.log("Loaded Android Cordova...");
					});
				} else {
					console.log("Firing preferencesAvailable Ready on : " + navigator.userAgent);
					app.preferencesAvailable();
				}
			},
			/*
			 * Last Position stored on mobile, and deviceId from native
			 * Sets Two Globals - deviceId and baseUrl
			 */
			preferencesAvailable : function(){
				console.log("Getting Application Preferences...");
				/* Global Nonsense for Now */
				baseUrl = 'https://www.pfapps.co.uk/';
				if (app.options.chrome){
					/* Set Device Id from Browser Finger Print */
					deviceId = $.fingerprint();
					app.preferences = { reachable : "1" };
					console.log("Device Browser Fingerprint : " + deviceId);
					app.onDeviceReady();
				} else {
					require(['preferences'], function(Preferences){
						Preferences.load(function(prefs){
							if (typeof prefs === 'string'){ // for iOS
								prefs = JSON.parse(prefs);
							}
							app.preferences = prefs;
							if (app.preferences.reachable){
								$('div#offline').hide();
							}
							console.log(JSON.stringify(prefs));
							deviceId = prefs.deviceId;
							// Device Signature
							console.log("Device " + app.options.platform + " signature : " + deviceId);
							// crack on...
							app.onDeviceReady();
						});
					});
				}
			},
			/* 
			 * App and Cordova Loaded - Check we are online
			 */
			onDeviceReady: function() {        
				/* After everything loaded from preferences, add platform styles */
				Utils.platformCss(app.options);
				/* Now load the Router */
				require(['router'], function(Router){
					console.log("Loaded App Router...");
					app.router = new Router.Router();
					/* Monitor Network State */
					document.addEventListener("offline", app.onOffline, false);
					document.addEventListener("online", app.onOnline, false);
					if (app.preferences.reachable && Reach.online()){
						if (typeof app.testFlight !== "undefined"){
							app.testFlight.passCheckpoint(function(m){
								console.log('Checkpoint : Airborne...');
							}, function(e){
								console.log('Checkpoint : Crash Landed!');
							}, 'Airborne');
						}
						app.onOnline();
					} else {
						app.onOffline();
					}
				});
			},
			/* 
			 * App and Cordova Loaded and Online - Start App Router
			 */
			onOnline: function() {
				console.log("Online : " + Reach.type());
				$('div#offline').hide();
				app.router.navigate('login', {trigger: true});
			},
			/* 
			 * App and Cordova Loaded and Offline - Notify User
			 */
			onOffline: function() {
				console.log("Offline : " + Reach.type());
				$('div#offline').show();
				app.router.navigate('offline', {trigger: true});
			},
		};

		/* 
		 * Document Loaded - Start App 
		 */
		$(document).ready(function(){

			var backimg = Utils.getBackground();			
			$('img#tag-background').attr('src', backimg);

			FastClick.attach(document.body);

			$(document).ajaxStart(function(){
				$('span.spinner').show();
				/* Prevent Endless Spinning */
				setTimeout(function(){
					$('span.spinner').hide();
				}, 10000);
			});
			$(document).ajaxStop(function(){
				$('span.spinner').hide();
			});

			$(document).delegate('#stage','touchmove',function(e){
				e.preventDefault();
			}).delegate('.scroll','touchmove',function(e){
				e.stopPropagation();
			});

			/* $(document).on('touchmove', false);
				$('html,body').on('touchmove', function(e){
				var id = selector(e.target);
				console.log("Touched : " + id );
				e.preventDefault();
			}); */

			app.initialize();
		});

		return app;

	});
});
