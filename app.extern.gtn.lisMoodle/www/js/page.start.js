$(document).on('pagebeforeshow', '#start', function(event) {
	app.debug("pagebeforeshow: start");
	gtnMoodle.init("start", "start");
	initIds();
});
