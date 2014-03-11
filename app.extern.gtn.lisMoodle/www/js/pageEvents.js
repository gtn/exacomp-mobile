function initIds() {
	app.debug("pageinit: save ids", 2);
	$("a").off("click");
	$("a").on("click", function() {
		app.debug("a.click: set ids", 2);
		if ($(this).attr('data-app-courseid')) {
			app.debug("cahnge: data-app-courseid");
			window.localStorage.setItem('data-app-courseid', $(this).attr('data-app-courseid'));
		}
		if ($(this).attr('data-app-subjectid')) {
			app.debug("cahnge: data-app-subjectid");
			window.localStorage.setItem('data-app-subjectid', $(this).attr('data-app-subjectid'));
		}
		if ($(this).attr('data-app-subtopicid')) {
			app.debug("cahnge: data-app-subtopicid");
			window.localStorage.setItem('data-app-subtopicid', $(this).attr('data-app-subtopicid'));
		}
		if ($(this).attr('data-app-descriptorid')) {
			app.debug("cahnge: data-app-descriptorid");
			window.localStorage.setItem('data-app-descriptorid', $(this).attr('data-app-descriptorid'));
		}
		if ($(this).attr('data-app-contentid')) {
			app.debug("cahnge: data-app-contentid");
			window.localStorage.setItem('data-app-contentid', $(this).attr('data-app-contentid'));
		}
		if ($(this).attr('data-app-portfolioid')) {
			app.debug("cahnge: data-app-portfolioid");
			window.localStorage.setItem('data-app-portfolioid', $(this).attr('data-app-portfolioid'));
		}
		if ($(this).attr('data-app-portfolioid-last')) {
			app.debug("cahnge: data-app-portfolioid-last");
			window.localStorage.setItem('data-app-portfolioid-last', $(this).attr('data-app-portfolioid-last'));
		}
	});
}

var page = {
	changeId : function(subject, value) {
		app.debug("page.changeId(" + subject + " to: " + value + ")");
		window.localStorage.setItem(subject, value);
	}
};
