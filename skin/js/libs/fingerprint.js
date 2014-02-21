define([ "jquery", "md5" ], function($, md5) {

  // Calling `jQuery.fingerprint()` will return an MD5 hash, i.e. said fingerprint.

  $.fingerprint = function() {

    // This function, `_raw()`, uses several browser details which are
    // available to JS here to build a string, namely...
    //
    // * the user agent
    // * screen size
    // * color depth
    // * the timezone offset
    // * sessionStorage support
    // * localStorage support
    // * the list of all installed plugins (we're using their names,
    //    descriptions, mime types and file name extensions here)
    function _raw() {
      // That string is the return value.
      return [
        navigator.userAgent,
        [ screen.height, screen.width, screen.colorDepth ].join("x"),
        ( new Date() ).getTimezoneOffset(),
        !!window.sessionStorage,
        !!window.localStorage,
        $.map( navigator.plugins, function(p) {
          return [
            p.name,
            p.description,
            $.map( p, function(mt) {
              return [ mt.type, mt.suffixes ].join("~");
            }).join(",")
          ].join("::");
        }).join(";")
      ].join("###");
    }

    function _md5() {
        var hash = md5( _raw() );
        var uuid = hash.substring(0,8) + '-' + hash.substring(8,12) + '-' + hash.substring(12,16) + '-' + hash.substring(16,20)  + '-' + hash.substring(20,32);
        return uuid;
    }
    return _md5();
  }

});
