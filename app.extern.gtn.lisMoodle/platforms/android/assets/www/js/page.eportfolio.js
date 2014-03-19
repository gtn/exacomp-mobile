$(document).on('pagebeforecreate', '#eportfolio', function(event) {
	app.debug("pagebeforecreate: eportfolio");
	gtnMoodle.init("eportfolio", "eportfolio");
	page.initPage("eportfolio");
});