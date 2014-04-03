$(document).on('pagebeforecreate', '#listcompetencies', function(event) {
	app.debug("pagebeforecreate: listcompetencies", 3);
	gtnMoodle.init("listcompetencies", L.s("page_listcompetencies"));
	var courseId = window.localStorage.getItem('data-app-courseid');
	var subtopicId = window.localStorage.getItem('data-app-subtopicid');
	listcompetencies.loadCompetencies(courseId, subtopicId);
	listcompetencies.defineEvents();
	page.initPage("listcompetencies");
});

var listcompetencies = {
	loadCompetencies : function(courseId, subtopicId) {
		app.debug("listcompetencies.loadCompetencies(" + courseId + "," + subtopicId + ")");
		$("#listcompetencies .app-content").empty();
		data = "&courseid=" + courseId + "&subtopicid=" + subtopicId;
		xml = gtnMoodle.getMoodleXml("block_exacomp_get_competencies", gtnMoodle.tokenExacomp, data);
		$(xml).find('MULTIPLE>SINGLE').each(function() {
			app.debug("MULTIPLE>SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("MULTIPLE>SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});

			var teachercomp = "";
			var studentcomp = "";
			if (parseInt(values['teachercomp']))
				teachercomp = 'checked="checked"';
			if (parseInt(values['studentcomp']))
				studentcomp = 'checked="checked"';

			var append = '<div class="clear">&nbsp;</div>';
			append += '<fieldset data-role="controlgroup exalis_comp_teilbereich">';
			append += '<ul data-role="listview" data-inset="true" data-divider-theme="a">';
			append += '<li data-role="list-divider">';
			append += '<a data-ajax="false" href="competence.html" class="ui-btn ui-btn-icon-right ui-icon-carat-r exalis_heading" data-app-descriptorid="' + values['descriptorid'] + '" data-dom-cache="false">' + values['title'] + '</a>';
			append += '</li>';
			append += '<li>';
			append += '<input class="app-studentcomp" name="checkbox-1a" id="checkbox-1a" data-app-descriptorid="' + values['descriptorid'] + '" type="checkbox" ' + studentcomp + '>';
			append += '<label for="checkbox-1a">Selbsteinschaetzung Teilbereich</label>';
			append += '</li>';
			append += '<li>';
			append += '<input name="checkbox-2a" id="checkbox-2a" disabled="disabled" type="checkbox"  ' + teachercomp + '>';
			append += '<label for="checkbox-2a">Lehrer Einschaetzung</label>';
			append += '</li>';
			append += '</ul>';
			append += '</fieldset>';
			$("#listcompetencies .app-content").append(append);
		});
	},
	setCompetenceStudentcomp : function(courseid, descriptorid, value) {
		app.debug("listcompetencies.setCompetenceStudentcomp(" + courseid + ", " + descriptorid + ", " + value + ")", 2);
		var success = null;
		data = "&courseid=" + courseid + "&descriptorid=" + descriptorid + "&value=" + value;
		xml = gtnMoodle.getMoodleXml("block_exacomp_set_competence", gtnMoodle.tokenExacomp, data);
		$(xml).find('SINGLE').each(function() {
			app.debug("SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});
			app.debug("Success setting studentcomp: " + values['success'], 2);
			app.notify("Selbsteinschaetzung", "Selbsteinschaetzung wurde erfolgreich ge�ndert.");
		});
	},
	defineEvents : function() {
		app.debug("listcompetencies.defineEvents()", 2);
		$("#listcompetencies .app-studentcomp").change(function() {
			app.debug('Cbx changed to: ' + $(this).prop("checked"), 1);
			var courseid = window.localStorage.getItem('data-app-courseid');
			var descriptorid = $(this).attr('data-app-descriptorid');
			var value = null;
			if ($(this).prop("checked"))
				value = 1;
			else
				value = 0;
			listcompetencies.setCompetenceStudentcomp(courseid, descriptorid, value);
		});
	}
};