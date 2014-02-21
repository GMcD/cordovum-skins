define(['jquery'], function($){
    
	var utils = {
	    /*
	     * Utility to add parameters from query string to defaults passed in
	     */
	    getOptions : function(defaults){
	        var prmstr = window.location.search.substr(1);
	        var prmarr = prmstr.split ("&");

	        /* Collect any variation from URL */
	        for ( var i = 0; i < prmarr.length; i++) {
	            var tmparr = prmarr[i].split("=");
	            defaults[tmparr[0]] = decodeURIComponent(tmparr[1]);
	        }
            defaults[defaults.platform] = true;
	        return defaults;
	    },
	    /*
	     * Background Imgae
	     */
	    getBackground : function(){
			var iphone4img = 'img/ios/splash/Default@2x~iphone.png';
	    	var iphone5img = 'img/ios/splash/Default-568h@2x~iphone.png';
			var bg = iphone4img;
			if ($(window).height() > 480){
				bg = iphone5img;
			}
			return bg;
	    },
	    /*
	     * Take HTMLElement and return jQuery style selector for it
	     */
	    selector : function(d) { 
	    	var s = d.localName; 
	    	if (d.id.length) { s += '#' + d.id; } 
	    	if (d.className.length) { s += '.' + d.className; } 
	    	return s; 
	    },
	    /*
	     * Parse Backbone Model Response failures
	     */
	    failure : function(xhr, status, msg){
			var text = xhr.responseText && xhr.responseText.length ? xhr.responseText : xhr.statusText;
			var msge = msg && msg.message;
			var stat = status && status.toUpperCase();
			var message = '';
			if (stat && stat.length > 0) message += stat + ':';
			if (text && text.length > 0) message += '\n\t' + text;
			if (msge && msge.length > 0) message += '\n\t' + msge;
			console.log(message);
			return message;
	    },
	    /*
	     * Get Unix Date Time stamp, for give time, or now
	     */
	    unix : function(when){
	    	if (arguments.length === 0) {
	    		when = new Date();
	    	}
	    	return Math.round(when / 1000);
	    },
	    /*
	     * Simple check if is valid email - not much stricter than a@b.c
	     */
	    isEmail : function(address){
	    	var email_check = /^[^@]+@[^@]+\.[^@]+$/i;
            return email_check.test(address);
	    },
	    /*
	     * Pad a with b zeros - add to 100000000000000000 and trim accordingly
	     */
	    pad :function(a,b){
	        return(1e15+a+"").slice(-b);
	    },
	    /*
	     * Basename of file
	     */
	    basename : function (path, suffix) {
	        var b = path.replace(/^.*[\/\\]/g, '');
	        if (typeof suffix === 'string' && b.substr(b.length - suffix.length) === suffix) {
	            b = b.substr(0, b.length - suffix.length);
	        }
	        return b;
	    },
	    /*
	     * Foldername of file
	     */
	    foldername : function(path, suffix) {
	        var end = path.indexOf(utils.basename(path, suffix));
	        return path.substr(0, end);
	    },
	    /*
	     * Apply Device Specific CSS - Could be done within Cordova build system?
	     */
	    platformCss : function(platform){

	    	$('div#stage').addClass(app.options.platform);
	    	if (platform.android){
	    		console.log('No Javascript Styling for Android..');
	    	}
	    	if (platform.ios){
	    		console.log('No Javascript Styling for iOS..');
	    	}
	    }
	};

	return utils;

});
      

