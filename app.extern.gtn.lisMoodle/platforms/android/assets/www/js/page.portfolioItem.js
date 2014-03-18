$(document).on('pagebeforecreate', '#portfolioItem', function(event) {
	app.debug("pagebeforecreate: portfolioItem", 3);
	gtnMoodle.init("portfolioItem", "portfolioItem");
	portfolioItem.loadPortfolioItem();
	portfolioItem.defineEvents();
	initIds();
});

var portfolioItem = {
	loadPortfolioItem : function() {
		app.debug("portfolioItem.loadPortfolioItem()", 2);
		$("#portfolioItem .app-content").empty();
		data = "&itemid=" + window.localStorage.getItem('data-app-portfolioid');
		xml = gtnMoodle.getMoodleXml("block_exaport_get_item", gtnMoodle.tokenExaport, data);
		$(xml).find('SINGLE').each(function() {
			app.debug("SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});
			var append = '';
			append += '<h2>' + values['name'] + '</h2>';
			append += '<p>Categorie: ' + values['category'] + '</p>';
			append += '<p>Url: ' + values['url'] + '</p>';
			append += '<p>Intro: ' + values['intro'] + '</p>';
			append += '<p>Filename: ' + values['filename'] + '</p>';
			append += '<p>File: ' + values['file'] + '</p>';
			append += '<p>Is image: ' + values['isimage'] + '</p>';
			if (parseInt(values['isimage'])) {
				append += '<img src="' + values['file'] + '&token=' + gtnMoodle.tokenExaport + '" class="portfolio_item" />';
			}
			append += '';
			$("#portfolioItem .app-content").append(append);
		});
		$("#portfolioItem .app-actions").empty();
		var append = '';
		append += '<a href="itemToCompetence.html" data-app-assign="item-selected" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-icon-left ui-icon-plus ui-mini">Item einer Kompetenz zuordnen</a>';
		$("#portfolioItem .app-actions").append(append);
	},
	defineEvents : function() {
	}
};
