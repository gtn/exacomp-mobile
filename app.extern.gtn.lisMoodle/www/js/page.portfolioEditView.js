$(document).on('pagebeforecreate', '#portfolioEditView', function(event) {
	app.debug("pagebeforecreate: portfolioEditView", 3);
	gtnMoodle.init("portfolioEditView", "portfolioEditView");
	page.initPage("portfolioEditView");
});

var portfolioEditView = {
	loadPortfolioEditView : function() {
	},
	defineEvents : function() {
	}
};
