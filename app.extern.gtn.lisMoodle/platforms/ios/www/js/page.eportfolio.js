$(document).on('pagebeforecreate', '#eportfolio', function(event) {
	app.debug("pagebeforecreate: eportfolio");
	gtnMoodle.init("eportfolio", L.s("page_portfolio"));
	page.initPage("eportfolio");
});