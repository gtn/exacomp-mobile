$(document).on('pagebeforecreate', '#competence', function(event) {
	app.debug("pagebeforecreate: competence");
	gtnMoodle.init("competence", "competence");
	var courseId = window.localStorage.getItem('data-app-courseid');
	var descriptorId = window.localStorage.getItem('data-app-descriptorid');
	competence.loadCompetence(courseId, descriptorId);
	initIds();
});

var competence = {
	loadCompetence : function(courseId, descriptorId) {
		app.debug("competence.loadCompetence(" + courseId + "," + descriptorId + ")");
		$("#competence .app-competence").empty();
		data = "&courseid=" + courseId + "&descriptorid=" + descriptorId;
		xml = gtnMoodle.getMoodleXml("block_exacomp_get_associated_content", gtnMoodle.tokenExacomp, data);
		$(xml).find('MULTIPLE>SINGLE').each(function() {
			app.debug("MULTIPLE>SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("MULTIPLE>SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});
			var append = "";
			if ($.trim(values['type']) == 'exaport') {
				append += '<li>';
				append += '<a class="ui-btn ui-btn-icon-right ui-icon-portfolio" href="' + values['link'] + '" data-app-contentid="' + values['contentid'] + '" data-dom-cache="false">' + values['title'] + '</a>';
				append += '</li>';
			} else if ($.trim(values['type']) == 'assign') {
				append += '<li>';
				append += '<a class="ui-btn ui-btn-icon-right ui-icon-star" href="' + values['link'] + '" data-app-contentid="' + values['contentid'] + '" data-dom-cache="false">' + values['title'] + '</a>';
				append += '</li>';
			} else if ($.trim(values['type']) == 'example') {
				append += '<li>';
				append += '<a class="ui-btn ui-btn-icon-right ui-icon-eye" href="' + values['link'] + '" data-app-contentid="' + values['contentid'] + '" data-dom-cache="false">' + values['title'] + '</a>';
				append += '</li>';
			} else {
				app.debug('Type: ' + values['type']);
			}
			app.debug("Append: " + append);
			$("#competence .app-competence").append(append);
		});
	}
};