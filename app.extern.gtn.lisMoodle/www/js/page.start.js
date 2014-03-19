$(document).on('pagebeforecreate', '#start', function(event) {
	app.debug("pagebeforecreate: start");
	gtnMoodle.init("start", language.s('page_app_start'));
	page.initPage("start");
});
