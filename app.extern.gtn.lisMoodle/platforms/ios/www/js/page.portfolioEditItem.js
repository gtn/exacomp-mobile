$(document).on('pagebeforecreate', '#portfolioEditItem', function(event) {
	app.debug("pagebeforecreate: portfolioEditItem", 3);
	gtnMoodle.init("portfolioEditItem", "portfolioEditItem");
	initIds();
});

var portfolioEditItem = {
	loadPortfolioEditItem : function() {
	},
	defineEvents : function() {
	}
};
