$(document).on('pagebeforecreate', '#portfolioViews', function(event) {
	app.debug("pagebeforecreate: portfolioViews", 3);
	gtnMoodle.init("portfolioViews", "portfolioViews");
	initIds();
});

var portfolioViews = {
	loadportfolioViews : function() {
	},
	defineEvents : function() {
	}
};
