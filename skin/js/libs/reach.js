define(['jquery'], function($){
    
    /*
     * Connection Types
     */
    var Connections = {
        'unknown' : 'Unknown Connection Type',
        'ethernet' : 'Ethernet Connection',
        'wifi' : 'WiFi Connection',
        '2g' : 'Cell 2G Connection',
        '3g' : 'Cell 3G Connection',
        '4g' : 'Cell 4G Connection',
        'cellular' : 'Cellular Connection',
        'none' : 'No Network Connection',
        'laptop' : 'Laptop Connection'
    };

	/*
	 * Network Reachability Utility
	 */    
	var reach = {

		online: function(){
			if (app.options.chrome){
				return true;
			} else {
				if ((navigator.network.connection.type).toUpperCase() == "NONE" || 
					(navigator.network.connection.type).toUpperCase() == "UNKNOWN") {
					return false;
				} else {
					return true;
				}   
			}
		},
		/*
		 * Friendly String for Connection Type
		 */
		type: function(){
		    if (navigator.connection)
              return Connections[navigator.connection.type];
            else
              return Connections['laptop'];
		}

	};

	return reach;
});