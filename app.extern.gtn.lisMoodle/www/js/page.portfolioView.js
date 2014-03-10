$(document).on('pagebeforecreate', '#portfolioView', function(event) {
	app.debug("portfolioView: portfolioView", 3);
	gtnMoodle.init("portfolioView", "portfolioView");
	initIds();
});

var portfolioView = {
	loadPortfolioView : function() {
	},
	defineEvents : function() {
	}
};
