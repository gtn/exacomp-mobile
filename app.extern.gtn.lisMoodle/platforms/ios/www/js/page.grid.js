$(document).on('pagebeforecreate', '#grid', function(event) {
	app.debug("pagebeforecreate: grid");
	gtnMoodle.init("grid", L.s("page_grid"));
	grid.loadSubjects();
	grid.loadTopics(grid.subjectId, window.localStorage.getItem('data-app-courseid'));
	grid.defineEvents();
	page.initPage("grid");
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
				app.debug("set subjectID: " + values['subjectid'], 1);
				grid.subjectId = values['subjectid'];
			}
			$("#grid .app-subjects").append('<option class="app-subject" data-app-subjectid="' + values['subjectid'] + '" value="' + values['subjectid'] + '">' + values['title'] + '</option>');
		});
	},
	loadTopics : function(subjectId, courseId) {
		app.debug("grid.loadTopics(" + subjectId + ")", 2);
		$("#grid .app-gridarea").empty();
		data = "&subjectid=" + subjectId + "&courseid=" + courseId;
		xml = gtnMoodle.getMoodleXml("block_exacomp_get_topics", gtnMoodle.tokenExacomp, data);
		$(xml).find('MULTIPLE>SINGLE').each(function() {
			app.debug("MULTIPLE>SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("MULTIPLE>SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});

			var append = '';
			/*
			 * append += '<fieldset data-role="controlgroup"
			 * class="exalis_comp_komprastercheck">'; append += '<input
			 * name="checkbox-1b" id="checkbox-1b" type="checkbox">'; append += '<label
			 * for="checkbox-1b">&nbsp;</label>'; append += '</fieldset>';
			 * 
			 * append += '<div data-role="collapsible"
			 * data-content-theme="false" class="kompetenzraster_pushright">';
			 * append += '<h4>' + values['title'] + '</h4>'; append += '<ul data-role="listview" class="app-subtopic-' + values['topicid'] + '">';
			 * append += grid.loadSubtopics(courseId, values['topicid']); append += '</ul>';
			 * append += '</div>';
			 * 
			 */

			append += '<div class="clear">&nbsp;</div>';
			append += '<div data-role="collapsible" data-content-theme="false" class="kompetenzraster_pushright">';
			append += '<h4>' + values['title'] + '</h4>';
			append += '<ul data-role="listview" data-split-icon="carat-r" data-split-theme="a" class="app-subtopic-' + values['topicid'] + '"> ';
			append += grid.loadSubtopics(courseId, values['topicid']);
			append += '</ul>';
			append += '</div>';

			$("#grid .app-gridarea").append(append);
		});
	},
	loadSubtopics : function(courseId, topicId) {
		app.debug("grid.loadSubtopics(" + courseId + ", " + topicId + ")", 2);
		var append = '';
		app.debug("Empty: #grid .app-subtopic-" + topicId + "", 1);
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
			var studentcomp = "";
			var teachercomp = "";
			if (parseInt(values['studentcomp']))
				studentcomp = ' checked="checked"';
			if (parseInt(values['teachercomp']))
				teachercomp = 'lehrereinschaetzung';

			append += '<li><a href="#" style="padding-top: 0px;padding-bottom: 0px;padding-right: 42px;padding-left: 0px;" class="' + teachercomp + '">';
			append += '<label style="border-top-width: 0px;margin-top: 0px;border-bottom-width: 0px;margin-bottom: 0px;border-left-width: 0px;border-right-width: 0px;" data-corners="false">';
			append += '<fieldset data-role="controlgroup" >';
			append += '<input id="2" name="2" class="app-studentcomp" type="checkbox" name="checkbox-' + values['subtopicid'] + '" id="checkbox-' + values['subtopicid'] + '" type="checkbox" ' + studentcomp + ' data-app-subtopicid="' + values['subtopicid'] + '" data-app-topicid="' + topicId + '"/>';
			append += '' + values['title'] + '';
			append += '</fieldset>';
			append += '</label>';
			append += '</a><a href="listcompetencies.html" data-app-topicid="' + topicId + '" data-app-subtopicid="' + values['subtopicid'] + '" data-ajax="false"></a>';
			append += '</li>';

			// $("#grid app-subtopic-" + topicId + "").append(append);
		});
		return append;
	},
	setCompetenceStudentcomp : function(courseid, topicid, subtopicid, value) {
		app.debug("grid.setCompetenceStudentcomp(" + courseid + ", " + topicid + ", " + subtopicid + ", " + value + ")", 2);
		var success = null;
		data = "&courseid=" + courseid + "&topicid=" + topicid + "&subtopicid=" + subtopicid + "&value=" + value;
		xml = gtnMoodle.getMoodleXml("block_exacomp_set_subtopic", gtnMoodle.tokenExacomp, data);
		$(xml).find('SINGLE').each(function() {
			app.debug("SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});
			app.debug("Success setting studentcomp: " + values['success'], 2);
			app.notify("Selbsteinschaetzung", "Selbsteinschaetzung wurde erfolgreich geändert.");
		});
	},
	defineEvents : function() {
		app.debug("grid.defineEvents()", 2);
		$("#grid .app-subjects").off("change");
		$("#grid .app-subjects").on("change", function(event, ui) {
			page.changeId("data-app-subjectid", $(this).val());
			$("#grid .app-gridarea").hide();
			grid.loadTopics(window.localStorage.getItem("data-app-subjectid"), window.localStorage.getItem('data-app-courseid'));
			$("#grid .app-gridarea").trigger('create');
			$("#grid .app-gridarea").show();
			grid.defineEvents();
			page.initPage("grid");
		});

		$("#grid .app-studentcomp").change(function() {
			app.debug('Cbx changed to: ' + $(this).prop("checked"), 1);
			var courseid = window.localStorage.getItem('data-app-courseid');
			var topicid = $(this).attr('data-app-topicid');
			var subtopicid = $(this).attr('data-app-subtopicid');
			var value = null;
			if ($(this).prop("checked"))
				value = 1;
			else
				value = 0;
			grid.setCompetenceStudentcomp(courseid, topicid, subtopicid, value);
		});
	}
};