$(document).on('pagebeforecreate', '#portfolioItem', function(event) {
	app.debug("pagebeforecreate: portfolioItem", 3);
	gtnMoodle.init("portfolioItem", "portfolioItem");
	initIds();
});

var portfolioEditItem = {
	loadPortfolioItem : function() {
	},
	defineEvents : function() {
	}
};
