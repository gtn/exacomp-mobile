$(document).on('pagebeforecreate', '#grid', function(event) {
	app.debug("pagebeforecreate: grid");
	gtnMoodle.init("grid", "grid");
	grid.loadSubjects();
	grid.loadTopics(grid.subjectId);
	grid.defineEvents();
	initIds();
	// $("#grid").page()
});

var grid = {
	subjectId : null,
	loadSubjects : function() {
		$("#grid .app-subjects").empty();
		var courseid = window.localStorage.getItem('data-app-courseid');
		var data = "&courseid=" + courseid;
		var xml = gtnMoodle.getMoodleXml("block_exacomp_get_subjects", gtnMoodle.tokenExacomp, data);
		$(xml).find('MULTIPLE>SINGLE').each(function() {
			app.debug("MULTIPLE>SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("MULTIPLE>SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});
			if (!grid.subjectId) {
				app.debug("set subjectID: " + values['subjectid']);
				grid.subjectId = values['subjectid'];
			}
			$("#grid .app-subjects").append('<option class="app-subject" data-app-subjectid="' + values['subjectid'] + '" value="' + values['subjectid'] + '">' + values['title'] + '</option>');
		});
	},
	loadTopics : function(subjectId) {
		app.debug("grid.loadTopics(" + subjectId + ")");
		$("#grid .app-gridarea").empty();
		data = "&subjectid=" + subjectId;
		xml = gtnMoodle.getMoodleXml("block_exacomp_get_topics", gtnMoodle.tokenExacomp, data);
		$(xml).find('MULTIPLE>SINGLE').each(function() {
			app.debug("MULTIPLE>SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("MULTIPLE>SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});
			app.debug("Append area");
			var append = '<div class="clear">&nbsp;</div>';
			append += '<fieldset data-role="controlgroup" class="exalis_comp_komprastercheck">';
			append += '<input name="checkbox-1b" id="checkbox-1b" checked="" type="checkbox">';
			append += '<label for="checkbox-1b">&nbsp;</label>';
			append += '</fieldset>';

			append += '<div data-role="collapsible" data-content-theme="false" class="kompetenzraster_pushright">';
			append += '<h4>' + values['title'] + '</h4>';
			append += '<ul data-role="listview" class="app-subtopic-' + values['topicid'] + '">';
			append += grid.loadSubtopics(subjectId, values['topicid']);
			append += '</ul>';
			append += '</div>';
			$("#grid .app-gridarea").append(append);
		});
	},
	loadSubtopics : function(courseId, topicId) {
		app.debug("grid.loadSubtopics(" + courseId + ", " + topicId + ")");
		var append = '';
		app.debug("Empty: #grid .app-subtopic-" + topicId + "");
		// $("#grid app-subtopic-" + topicId + "").empty();
		data = "&courseid=" + courseId + "&topicid=" + topicId;
		xml = gtnMoodle.getMoodleXml("block_exacomp_get_subtopics", gtnMoodle.tokenExacomp, data);
		$(xml).find('MULTIPLE>SINGLE').each(function() {
			app.debug("MULTIPLE>SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("MULTIPLE>SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});

			append += '<li>';
			append += '<a href="listcompetencies.html" data-app-subtopicid="' + values['subtopicid'] + '" data-dom-cache="false">' + values['title'] + '</a>';
			append += '</li>';
			// $("#grid app-subtopic-" + topicId + "").append(append);
		});
		return append;
	},
	defineEvents : function() {
		app.debug("grid.defineEvents()", 2);
		$("#grid .app-subjects").on("change", function(event, ui) {
			page.changeId("data-app-subjectid", $(this).val());
			$("#grid .app-gridarea").hide();
			grid.loadTopics(window.localStorage.getItem("data-app-subjectid"));
			$("#grid .app-gridarea").trigger('create');
			$("#grid .app-gridarea").show();
		});
	}
};