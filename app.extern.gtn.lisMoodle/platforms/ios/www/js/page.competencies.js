$(document).on('pagebeforeshow', '#competencies', function(event) {
	app.debug("pagebeforeshow: competencies");
	gtnMoodle.init("competencies", "competencies");
	$("#competencies .app-competencies").empty();
	var xml = gtnMoodle.getMoodleXml("block_exacomp_get_courses", gtnMoodle.tokenExacomp);

	$(xml).find('MULTIPLE>SINGLE').each(function() {
		var values = new Array();
		$(this).find('KEY').each(function() {
			var name = $(this).attr('name');
			values[name] = $(this).text();
		});
		$("#competencies .app-competencies").append('<li><a href="grid.html" data-app-courseid="' + values['courseid'] + '" data-dom-cache="false">' + values['fullname'] + '</a></li>');

	});
	$("#competencies .app-competencies").listview("refresh");
	initIds();
});