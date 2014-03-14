$(document).on('pagebeforecreate', '#portfolioView', function(event) {
	app.debug("portfolioView: portfolioView", 3);
	gtnMoodle.init("portfolioView", "portfolioView");
	portfolioView.loadPortfolioView();
	initIds();
	portfolioView.defineEvents();
});

var portfolioView = {
	loadPortfolioView : function() {
		app.debug("portfolioView.loadPortfolioView()");
		$("#portfolioViews .app-listview").empty();
		data = "&id=" + window.localStorage.getItem('data-app-portfolioviewid');
		xml = gtnMoodle.getMoodleXml("block_exaport_get_view", gtnMoodle.tokenExaport, data);
		$(xml).find('MULTIPLE>SINGLE').each(function() {
			app.debug("MULTIPLE>SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("MULTIPLE>SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});

			var append = '';
			append += '';
			append += '';
			append += '';
			append += '';
			append += '';
			append += '';
			append += '';
			append += '';

			$("#portfolioViews .app-listview").append(append);
		});
	},
	defineEvents : function() {
	}
};
