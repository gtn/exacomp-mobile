// window.localStorage.getItem('');
var page = {
	initPage : function(pageId) {
		app.debug("page.initPage(" + pageId + ")");
		page.initStorageEvents();
		page.initSidePanels(pageId);
	},
	initStorageEvents : function() {
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
			if ($(this).attr('data-app-portfolioviewid')) {
				app.debug("cahnge: data-app-portfolioviewid", 2);
				page.changeId('data-app-portfolioviewid', $(this).attr('data-app-portfolioviewid'));
			}
			if ($(this).attr('data-app-assign')) {
				app.debug("cahnge: data-app-assign", 2);
				page.changeId('data-app-assign', $(this).attr('data-app-assign'));
			}
		});
	},
	changeId : function(subject, value) {
		app.debug("page.changeId(" + subject + " to: " + value + ")", 2);
		window.localStorage.setItem(subject, value);
	},
	initSidePanels : function(pageId) {
		app.debug("page.initSidePanels(" + pageId + ")", 2);
		var append = '';
		append += '<div data-role="panel" data-display="overlay" id="left-panel" data-theme="c" class="exalis-panel">';
		append += '<a data-ajax="false" href="#" data-rel="back" class="ui-btn ui-btn-exalis ui-corner-all exalis_menue_button ui-icon-grid ui-btn-icon-left">Zurück</a>';
		append += '<a data-ajax="false" href="competencies.html" class="ui-btn ui-btn-exalis ui-corner-all exalis_menue_button ui-icon-grid ui-btn-icon-left">Competencies</a>';
		append += '<a data-ajax="false" href="eportfolio.html" class="ui-btn ui-btn-exalis ui-corner-all exalis_menue_button ui-icon-portfolio ui-btn-icon-left" data-dom-cache="false">ePortfolio</a>';
		append += '<a data-ajax="false" href="portfolioItems.html" class="ui-btn ui-btn-exalis ui-corner-all exalis_menue_button ui-icon-portfolio ui-btn-icon-left" data-dom-cache="false">ePortfolio items</a>';
		append += '<a data-ajax="false" href="portfolioViews.html" class="ui-btn ui-btn-exalis ui-corner-all exalis_menue_button ui-icon-portfolio ui-btn-icon-left" data-dom-cache="false">ePortfolio views</a>';
		append += '<a data-ajax="false" href="settings.html" class="ui-btn ui-btn-exalis ui-corner-all exalis_menue_button ui-icon-gear ui-btn-icon-left">Einstellungen</a>';
		append += '<a data-ajax="false" href="login.html" class="ui-btn ui-btn-exalis ui-corner-all exalis_menue_button ui-icon-gear ui-btn-icon-left">Logout</a>';
		append += '<a href="#" data-rel="close" data-role="button" data-mini="true" data-inline="true" data-icon="delete" data-iconpos="right">Menu schließen</a>';
		append += '</div><!-- /panel -->';
		append += '<div data-role="panel" data-display="overlay" id="right-panel" data-position="right" data-theme="c">';
		append += '<p></p>';
		append += '<a href="#" data-rel="close" data-role="button" data-mini="true" data-inline="true" data-icon="delete" data-iconpos="right">Close</a>';
		append += '</div><!-- /panel -->';
		append += '';
		if (!($("#" + pageId + " #right-panel").length > 0)) {
			app.debug("Append slide Panel", 2);
			$('#' + pageId).append(append);
		}
		/*
		 * Swipe events $(document).on("swipeleft swiperight", "#" + pageId,
		 * function(e) { if ($.mobile.activePage.jqmData("panel") !== "open") {
		 * if (e.type === "swipeleft") { $("#right-panel").panel("open"); } else
		 * if (e.type === "swiperight") { $("#left-panel").panel("open"); } }
		 * });
		 */
		$("#" + pageId + " #btnBack").off('click');
		$("#" + pageId + " #btnBack").on('click', function(e) {
			app.debug("#" + pageId + " #btnBack: click", 2);
			e.preventDefault();
			$("#" + pageId + " #left-panel").panel("open");
		});

	}
};
