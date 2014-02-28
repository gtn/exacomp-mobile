function initIds() {
	app.debug("pageinit: save ids");
	$("a").off("click");
	$("a").on("click", function() {
		app.debug("a.click");
		window.localStorage.setItem('data-app-courseid', $(this).attr('data-app-courseid'));
	});
}

$(document).on('pagebeforeshow', '#start', function(event) {
	app.debug("pagebeforeshow: start");
	gtnMoodle.init("start", "start");
	initIds();
});

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
		$("#competencies .app-competencies").append('<li><a href="grid.html" data-app-courseid="' + values['courseid'] + '">' + values['fullname'] + '</a></li>');

	});
	$("#competencies .app-competencies").listview("refresh");
	initIds();
});

$(document).on('pagebeforecreate', '#eportfolio', function(event) {
	app.debug("pagebeforecreate: eportfolio");
	gtnMoodle.init("eportfolio", "eportfolio");
	initIds();
});
$(document).on('pagebeforecreate', '#grid', function(event) {
	app.debug("pagebeforecreate: grid");
	gtnMoodle.init("grid", "grid");
	$("#grid .app-subjects").empty();
	var subjectid = null;
	var courseid = window.localStorage.getItem('data-app-courseid');
	var data = "&courseid=" + courseid;
	var xml = gtnMoodle.getMoodleXml("block_exacomp_get_subjects", gtnMoodle.tokenExacomp, data);
	$(xml).find('MULTIPLE>SINGLE').each(function() {
		app.debug("MULTIPLE>SINGLE");
		var values = new Array();
		$(this).find('KEY').each(function() {
			app.debug("MULTIPLE>SINGLE>KEY");
			var name = $(this).attr('name');
			values[name] = $(this).text();
		});
		if (!subjectid)
			subjectid = values['subjectid'];
		$("#grid .app-subjects").append('<option data-app-subjectid="' + values['subjectid'] + '" value="' + values['subjectid'] + '">' + values['title'] + '</option>');
	});

	$("#grid .app-gridarea").empty();
	data = "&subjectid=" + subjectid;
	xml = gtnMoodle.getMoodleXml("block_exacomp_get_topics", gtnMoodle.tokenExacomp, data);
	$(xml).find('MULTIPLE>SINGLE').each(function() {
		app.debug("MULTIPLE>SINGLE");
		var values = new Array();
		$(this).find('KEY').each(function() {
			app.debug("MULTIPLE>SINGLE>KEY");
			var name = $(this).attr('name');
			values[name] = $(this).text();
		});
		var append = '<div class="clear">&nbsp;</div>';
		append += '<fieldset data-role="controlgroup" class="exalis_comp_komprastercheck">';
		append += '<input name="checkbox-1b" id="checkbox-1b" checked="" type="checkbox">';
		append += '<label for="checkbox-1b">&nbsp;</label>';
		append += '</fieldset>';

		append += '<div data-role="collapsible" data-content-theme="false" class="kompetenzraster_pushright">';
		append += '<h4>'+values['title']+'</h4>';
		append += '<ul data-role="listview">';
		append += '<li>';
		append += '<a href="teilbereich.php">Teilbereich 1</a>';
		append += '</li>';
		append += '<li>';
		append += '<a href="teilbereich.php">Teilbereich 2</a>';
		append += '</li>';
		append += '<li>';
		append += '<a href="teilbereich.php">Teilbereich 3</a>';
		append += '</li>';
		append += '<li>';
		append += '<a href="teilbereich.php">Teilbereich 4</a>';
		append += '</li>';
		append += '<li>';
		append += '<a href="teilbereich.php">Teilbereich 5</a>';
		append += '</li>';
		append += '</ul>';
		append += '</div>';
		$("#grid .app-gridarea").append(append);
	});
	initIds();
	// $("#grid").page()
});