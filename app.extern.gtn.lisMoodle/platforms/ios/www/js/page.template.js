$(document).on('pagebeforecreate', '#portfolioItems', function(event) {
	app.debug("pagebeforecreate: portfolioItems", 3);
	gtnMoodle.init("portfolioItems", "portfolioItems");
	initIds();
});

var portfolioItems = {
	loadPortfolioItems : function() {
		app.debug("competence.loadCompetence(" + courseId + "," + descriptorId + ")");
		$("#portfolioItems .exalis_eport_raster").empty();
		data = "&level=0";
		xml = gtnMoodle.getMoodleXml("block_exaport_get_items", gtnMoodle.tokenExaport, data);
		$(xml).find('MULTIPLE>SINGLE').each(function() {
			app.debug("MULTIPLE>SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("MULTIPLE>SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});
			if (values['type'] == "note") {
			} else if (values['type'] == "file") {
			} else if (values['type'] == "link") {
			} else if (values['type'] == "category") {
			}
		});
	},
	defineEvents : function() {
	}
};
