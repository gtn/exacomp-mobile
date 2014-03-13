function initIds() {
	app.debug("pageinit: save ids", 2);
	$("a").off("click");
	$("a").on("click", function() {
		app.debug("a.click: set ids", 2);
		if ($(this).attr('data-app-courseid')) {
			app.debug("cahnge: data-app-courseid", 2);
			page.changeId('data-app-courseid', $(this).attr('data-app-courseid'));
		}
		if ($(this).attr('data-app-subjectid')) {
			app.debug("cahnge: data-app-subjectid", 2);
			page.changeId('data-app-subjectid', $(this).attr('data-app-subjectid'));
		}
		if ($(this).attr('data-app-subtopicid')) {
			app.debug("cahnge: data-app-subtopicid", 2);
			page.changeId('data-app-subtopicid', $(this).attr('data-app-subtopicid'));
		}
		if ($(this).attr('data-app-descriptorid')) {
			app.debug("cahnge: data-app-descriptorid", 2);
			page.changeId('data-app-descriptorid', $(this).attr('data-app-descriptorid'));
		}
		if ($(this).attr('data-app-contentid')) {
			app.debug("cahnge: data-app-contentid", 2);
			page.changeId('data-app-contentid', $(this).attr('data-app-contentid'));
		}
		if ($(this).attr('data-app-portfolioid')) {
			app.debug("cahnge: data-app-portfolioid", 2);
			page.changeId('data-app-portfolioid', $(this).attr('data-app-portfolioid'));
		}
		if ($(this).attr('data-app-portfolioid-last')) {
			app.debug("cahnge: data-app-portfolioid-last", 2);
			page.changeId('data-app-portfolioid-last', $(this).attr('data-app-portfolioid-last'));
		}
		if ($(this).attr('data-app-portfoliotype')) {
			app.debug("cahnge: data-app-portfoliotype", 2);
			page.changeId('data-app-portfoliotype', $(this).attr('data-app-portfoliotype'));
		}
	});
}

var page = {
	changeId : function(subject, value) {
		app.debug("page.changeId(" + subject + " to: " + value + ")", 2);
		window.localStorage.setItem(subject, value);
	}
};
