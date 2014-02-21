require.config({
  baseUrl: '../',
  urlArgs: 'cb=' + Math.random(),
  paths: {
    jasmine         : 'bower/jasmine/lib/jasmine-core/jasmine',
    'jasmine-html'  : 'bower/jasmine/lib/jasmine-core/jasmine-html',
  },
  shim: {
    jasmine: {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    }
  }
});

require(['require.app'], function(){
  require(['jasmine', 'jasmine-html'], function(jasmine){
   
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;
   
    var htmlReporter = new jasmine.HtmlReporter();
   
    jasmineEnv.addReporter(htmlReporter);
   
    jasmineEnv.specFilter = function(spec) {
      return htmlReporter.specFilter(spec);
    };
   
    var specs = [];
   
    specs.push('tests/home');
   
    $(function(){
      require(specs, function(){
        jasmineEnv.execute();
      });
    });
   
  });
});