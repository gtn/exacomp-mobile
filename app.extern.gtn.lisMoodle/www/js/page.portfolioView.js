$(document).on('pagebeforecreate', '#portfolioView', function(event) {
	app.debug("portfolioView: portfolioView", 3);
	gtnMoodle.init("portfolioView", "portfolioView");
	portfolioView.loadPortfolioView();
	initIds();
	portfolioView.defineEvents();
});

var portfolioView = {
	loadPortfolioView : function() {
		app.debug("portfolioView.loadPortfolioView()");
		// $("#portfolioView .app-listview").empty();
		data = "&id=" + window.localStorage.getItem('data-app-portfolioviewid');
		xml = gtnMoodle.getMoodleXml("block_exaport_get_view", gtnMoodle.tokenExaport, data);
		$(xml).find('MULTIPLE>SINGLE').each(function() {
			app.debug("MULTIPLE>SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("MULTIPLE>SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});

			var append = '';
			append += '';
			append += '';
			append += '';
			append += '';
			append += '';
			append += '';
			append += '';
			append += '';

			$("#portfolioView .app-listview").append(append);
		});
		$("#portfolioView .actions").empty();
		var append = '';
		append += '<p class="centered margin-top">';
		append += '<a href="#popupExternerLink" data-rel="popup" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-icon-left ui-icon-action ui-mini">Externen Link anzeigen</a>';
		append += '<a href="item_uploaded.php" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-icon-left ui-icon-check ui-mini">Speichern</a>';
		append += '<a href="view.php" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-icon-left ui-icon-plus ui-mini">Item hinzufügen</a>';
		append += '</p>';
		$("#portfolioView .actions").append(append);
	},
	defineEvents : function() {
	}
};
