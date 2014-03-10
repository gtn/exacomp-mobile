$(document).on('pagebeforecreate', '#portfolioEditView', function(event) {
	app.debug("pagebeforecreate: portfolioEditView", 3);
	gtnMoodle.init("portfolioEditView", "portfolioEditView");
	initIds();
});

var portfolioEditView = {
	loadPortfolioEditView : function() {
	},
	defineEvents : function() {
	}
};
