$(document).on('pagebeforecreate', '#portfolioNewView', function(event) {
	app.debug("pagebeforecreate: portfolioNewView", 3);
	gtnMoodle.init("portfolioNewView", "portfolioNewView");
	portfolioNewView.loadPortfolioNewView();

	initIds();
	portfolioNewView.defineEvents();
});

var portfolioNewView = {
	loadPortfolioNewView : function() {
		app.debug("portfolioNewView.loadPortfolioNewView()");
	},
	addView : function(name, description) {
		app.debug("portfolioNewView.addView(" + name + ", " + description + ")");
		var success = null;
		data = "&name=" + name + "&description=" + description;
		xml = gtnMoodle.getMoodleXml("block_exaport_add_view", gtnMoodle.tokenExaport, data);
		$(xml).find('SINGLE').each(function() {
			app.debug("SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});
			app.debug("Success add view: " + values['success'], 2);
			app.notify("Aufgabe", "View erfolgreich zugefügt.");
		});
		return success;
	},
	defineEvents : function() {
		app.debug("define events", 2);
		$('#portfolioNewView #btnSubmit').on('click', function() {
			var name = $('#portfolioNewView #txtName').val();
			var description = $('#portfolioNewView #txtDescription').val();
			portfolioNewView.addView(name, description);
		});
	}
};
