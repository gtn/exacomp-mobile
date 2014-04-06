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
		app.debug("listcompetencies.loadCompetencies(" + courseId + ","
				+ subtopicId + ")");
		$("#listcompetencies .app-content").empty();

		// headline
		data = "&topicid=" + subtopicId;
		xml = gtnMoodle.getMoodleXml("block_exacomp_get_topic_by_id",
				gtnMoodle.tokenExacomp, data);
		$(xml).find('SINGLE').each(
				function() {
					app.debug("MULTIPLE>SINGLE", 1);
					var values = new Array();
					$(this).find('KEY').each(function() {
						app.debug("MULTIPLE>SINGLE>KEY", 1);
						var name = $(this).attr('name');
						values[name] = $(this).text();
					});
					$("#listcompetencies .app-content").append(
							'<p>' + values['title'] + '</p>');
				});

		// content
		data = "&courseid=" + courseId + "&subtopicid=" + subtopicId;
		xml = gtnMoodle.getMoodleXml("block_exacomp_get_competencies",
				gtnMoodle.tokenExacomp, data);
		$(xml)
				.find('MULTIPLE>SINGLE')
				.each(
						function() {
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
								teachercomp = 'lehrereinschaetzung';
							if (parseInt(values['studentcomp']))
								studentcomp = 'checked="checked"';

							var append = '';

							append += '<fieldset data-role="controlgroup exalis_comp_teilbereich kompetenzraster_pushright">';
							append += '<ul data-role="listview" data-inset="true" data-divider-theme="a" data-split-icon="carat-r">';
							append += '<li><a href="#" style="padding-top: 0px;padding-bottom: 0px;padding-right: 42px;padding-left: 0px;" class="'
									+ teachercomp + '">';
							append += '<label style="border-top-width: 0px;margin-top: 0px;border-bottom-width: 0px;margin-bottom: 0px;border-left-width: 0px;border-right-width: 0px;" data-corners="false">';
							append += '<fieldset data-role="controlgroup" >';
							append += '<input id="1" name="1" type="checkbox" class="app-studentcomp"  data-app-descriptorid="'
									+ values['descriptorid']
									+ '"  '
									+ studentcomp + '/> ';
							append += '' + values['title'] + '';
							append += '</fieldset>';
							append += '</label>';
							append += '</a><a data-ajax="false"  data-app-descriptorid="'
									+ values['descriptorid']
									+ '"  href="competence.html" ></a>';
							append += '</li>';
							append += '</ul>';
							append += '</fieldset>';

							$("#listcompetencies .app-content").append(append);
						});
	},
	setCompetenceStudentcomp : function(courseid, descriptorid, value) {
		app.debug("listcompetencies.setCompetenceStudentcomp(" + courseid
				+ ", " + descriptorid + ", " + value + ")", 2);
		var success = null;
		data = "&courseid=" + courseid + "&descriptorid=" + descriptorid
				+ "&value=" + value;
		xml = gtnMoodle.getMoodleXml("block_exacomp_set_competence",
				gtnMoodle.tokenExacomp, data);
		$(xml).find('SINGLE').each(
				function() {
					app.debug("SINGLE", 1);
					var values = new Array();
					$(this).find('KEY').each(function() {
						app.debug("SINGLE>KEY", 1);
						var name = $(this).attr('name');
						values[name] = $(this).text();
					});
					app.debug("Success setting studentcomp: "
							+ values['success'], 2);
					app.notify(L.s("notify_selfevaluation_title"), L
							.s("notify_selfevaluation_text"));
				});
	},
	defineEvents : function() {
		app.debug("listcompetencies.defineEvents()", 2);
		$("#listcompetencies .app-studentcomp").change(
				function() {
					app.debug('Cbx changed to: ' + $(this).prop("checked"), 1);
					var courseid = window.localStorage
							.getItem('data-app-courseid');
					var descriptorid = $(this).attr('data-app-descriptorid');
					var value = null;
					if ($(this).prop("checked"))
						value = 1;
					else
						value = 0;
					listcompetencies.setCompetenceStudentcomp(courseid,
							descriptorid, value);
				});
	}
};