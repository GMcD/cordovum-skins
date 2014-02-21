define(['home'], function(Home) {

	return describe('Backbone Home :: ', function() {

		beforeEach(function () {
			$('body').html('<div id="stage">Eeek!</div>');
		});

		describe('View :: ', function() {
			it('is Responsive Mobile!', function(){
				var view = new Home.View({ el: $('div#stage')});
				var content = $('div#stage').text();
				expect(content).toContain('Responsive Mobile!');
			});
		});		
	});
});
