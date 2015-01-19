$(document).on('pagebeforecreate', '#portfolioView', function(event) {
	app.debug("portfolioView: portfolioView", 3);
	gtnMoodle.init("portfolioView", L.s("page_portfolio_view"));
	portfolioView.loadPortfolioView();
	page.initPage("portfolioView");
	portfolioView.defineEvents();
});

var portfolioView = {
	loadPortfolioView : function() {
		app.debug("portfolioView.loadPortfolioView()");

		data = "&id=" + window.localStorage.getItem('data-app-portfolioviewid');
		xml = gtnMoodle.getMoodleXml("block_exaport_get_view", gtnMoodle.tokenExaport, data);
		$(xml).find('RESPONSE>SINGLE').each(function() {
			app.debug("RESPONSE>SINGLE", 1);
			var values = new Array();
			// view data (name, id, description)
			$(this).find('>KEY').each(function() {
				app.debug("SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});
			var append = '<h2>' + values['name'] + '</h2>';
			append += '<p>' + values['description'] + '</p>';
			append += '';
			append += '';
			append += '';
			append += '';
			append += '';
			append += '';
			append += '';
			$("#portfolioView .ui-content").prepend(append);
			$("#portfolioView .app-listview").empty();
			$(xml).find('RESPONSE>SINGLE>KEY[name=items]>MULTIPLE>SINGLE').each(function() {
				$(this).find('KEY').each(function() {
					app.debug("SINGLE>KEY", 1);
					var name = $(this).attr('name');
					values[name] = $(this).text();
				});
				var append = '';
				append += '<li>';
				append += '<a href="portfolioItem.html" data-app-portfolioid="' + values['id'] + '"> <img src="../img/album-bb.jpg">';
				append += '<h2>' + values['name'] + '</h2>';
				append += '<p>For example, if a block of HTML markup (say a login form) was loaded in through Ajax, trigger the create event to automatically transform all the widgets it contains (inputs and buttons in this case) into the enhanced versions.</p></a>';
				append += '<a class="app-delete-item-from-view" data-app-portfolioid="' + values['id'] + '" href="#">delete</a>';
				append += '';
				append += '';
				append += '</li>';
				$("#portfolioView .app-listview").append(append);
			});
		});
		$("#portfolioView .actions").empty();
		var append = '';
		append += '<p class="centered margin-top">';
		//append += '<a href="#" class="app-external-link ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-icon-left ui-icon-action ui-mini">Externen Link anzeigen</a>';
		// append += '<a href="item_uploaded.php" class="ui-shadow ui-btn
		// ui-corner-all ui-btn-inline ui-btn-icon-left ui-icon-check
		// ui-mini">Speichern</a>';
		append += '<a href="itemToView.html" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-icon-left ui-icon-plus ui-mini">Item hinzufügen</a>';
		append += '<a href="portfolioShareView.html" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-icon-left ui-icon-plus ui-mini">View Freigeben</a>';
		append += '</p>';
		$("#portfolioView .actions").append(append);
	},
	deleteItem : function(viewid, itemid) {
		app.debug('portfolioView.deleteItem(' + viewid + ', ' + itemid + ')', 2);
		var success = null;
		data = "&viewid=" + viewid + "&itemid=" + itemid;
		xml = gtnMoodle.getMoodleXml("block_exaport_delete_view_item", gtnMoodle.tokenExaport, data);
		$(xml).find('SINGLE').each(function() {
			app.debug("SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});
			app.debug("Success update view: " + values['success'], 2);
			success = true;
		});
		return success;
	},
	defineEvents : function() {
		app.debug("defineEvents", 2);
		$("#portfolioView .app-delete-item-from-view").on("click", function() {
			var viewid = window.localStorage.getItem('data-app-portfolioviewid');
			var itemid = window.localStorage.getItem('data-app-portfolioid');
			if (portfolioView.deleteItem(viewid, itemid)) {
				app.notify("Item", "Item aus View entfernt.");
				app.notify(L.s("notify_portfolio_view_delete_title"), L.s("notify_portfolio_view_delete_text"));
				location.reload();
			}
		});
		$("#portfolioView .app-external-link").on("click", function() {
			alert("noch nicht implementiert");
		});
	}
};
