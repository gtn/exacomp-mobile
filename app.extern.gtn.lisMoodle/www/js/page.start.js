$(document).on('pagebeforeshow', '#start', function(event) {
	app.debug("pagebeforeshow: start");
	gtnMoodle.init("start", language.s('page_app_start'));
	initIds();
});
