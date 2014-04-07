$(document).on('pagebeforecreate', '#portfolioViews', function(event) {
	app.debug("pagebeforecreate: portfolioViews", 3);
	gtnMoodle.init("portfolioViews", L.s("page_portfolio_views"));
	portfolioViews.loadportfolioViews();

	page.initPage("portfolioViews");
	portfolioViews.defineEvents();
});

var portfolioViews = {
	loadportfolioViews : function() {
		app.debug("portfolioViews.loadportfolioViews()");
		$("#portfolioViews .app-view").empty();
		data = "";
		xml = gtnMoodle.getMoodleXml("block_exaport_get_views", gtnMoodle.tokenExaport, data);
		$(xml).find('MULTIPLE>SINGLE').each(function() {
			app.debug("MULTIPLE>SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("MULTIPLE>SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});

			var append = '<li>';
			append += '<a  href="portfolioView.html" data-app-portfolioviewid="' + values['id'] + '">';
			append += '<h2>' + values['name'] + '</h2>';
			append += '<p>' + values['description'] + '</p>';
			append += '<p class="ui-li-aside"></p>';
			append += '<a class="app-del-view" data-icon="delete" href="#" data-app-portfolioviewid="' + values['id'] + '" ></a></li>';

			$("#portfolioViews .app-view").append(append);
		});
		$("#portfolioViews .app-buttons").empty();
		var append = '';
		append += '<p class="centered margin-top">';
		append += '<a href="portfolioNewView.html" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-icon-left ui-icon-plus ui-mini">' + L.s("portfolio_new_view") + '</a>';
		append += '</p>';
		append += '';
		append += '';
		append += '';
		append += '';
		$("#portfolioViews .app-buttons").append(append);
	},
	defineEvents : function() {
		$("#portfolioViews .app-del-view").on("click", function() {
			app.debug("delete view", 2)
		});
	}
};
