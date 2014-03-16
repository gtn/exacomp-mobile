//itemToView
$(document).on('pagebeforecreate', '#itemToView', function(event) {
	app.debug("pagebeforecreate: itemToView", 3);
	gtnMoodle.init("itemToView", L.s('page_portfolio_item_to_view'));
	itemToView.loadItemToView();
	initIds();
	itemToView.defineEvents();
});

var itemToView = {
	categoryStack : new Array(),
	loadItemToView : function() {
		app.debug("itemToView.loadItemToView()");
		$("#itemToView .app-listview").empty();
		var append = '';
		// main category
		append += '<div data-role="collapsible">';
		append += '<h3>' + L.s('portfolio_main_category') + '</h3>';
		append += itemToView.getCategory(0);
		append += '';
		append += '</div>';
		// other categories
		while (current = itemToView.categoryStack.pop()) {
			append += '<div data-role="collapsible">';
			append += '<h3>' + current.split(',')[1] + '</h3>';
			append += itemToView.getCategory(current.split(',')[0]);
			append += '';
			append += '</div>';
		}
		$("#itemToView .app-listview").append(append);
	},
	getCategory : function(id) {
		var append = '';
		append += '<ul data-role="listview">';
		data = "&level=" + id;
		xml = gtnMoodle.getMoodleXml("block_exaport_get_items", gtnMoodle.tokenExaport, data);
		$(xml).find('MULTIPLE>SINGLE').each(function() {
			app.debug("MULTIPLE>SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("MULTIPLE>SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});
			if (values['type'].trim() == "note") {
				append += '<li >';
				append += '<a class="app-item" href="#" data-app-portfolioid="' + values['id'] + '">' + L.s('portfolio_type_note') + ': ' + values['name'] + '</a>';
				append += '';
				append += '</li>';

			} else if (values['type'].trim() == "file") {
				append += '<li >';
				append += '<a class="app-item" href="#" data-app-portfolioid="' + values['id'] + '">' + L.s('portfolio_type_file') + ': ' + values['name'] + '</a>';
				append += '';
				append += '</li>';

			} else if (values['type'].trim() == "link") {
				append += '<li >';
				append += '<a class="app-item" href="#" data-app-portfolioid="' + values['id'] + '">' + L.s('portfolio_type_link') + ': ' + values['name'] + '</a>';
				append += '';
				append += '</li>';

			} else if (values['type'].trim() == "category") {
				itemToView.categoryStack.push(values['id'] + ',' + values['name']);
			}
		});
		append += '</ul>';
		return append;
	},
	addItemToView : function(viewId, itemId) {
		app.debug("itemToView.addItemToView(" + viewId + ", " + itemId + ")", 2);
		var success = null;
		data = "&viewid=" + viewId + "&itemid=" + itemId;
		xml = gtnMoodle.getMoodleXml("block_exaport_add_view_item", gtnMoodle.tokenExaport, data);
		$(xml).find('SINGLE').each(function() {
			app.debug("SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});
			app.debug("Success add view: " + values['success'], 2);
			success = true;
		});
		return success;
	},
	defineEvents : function() {
		$("#itemToView .app-item").on("click", function() {
			app.debug("on click: add to view", 2);
			var viewId = window.localStorage.getItem('data-app-portfolioviewid');
			var itemId = window.localStorage.getItem('data-app-portfolioid');
			if (itemToView.addItemToView(viewId, itemId)) {
				app.notify(L.s('portfolio_portfolio'), L.s('portfolio_item_to_view_success'));
				history.back()
			} else
				app.notify(L.s('portfolio_portfolio'), L.s('portfolio_item_to_view_error'));
		});
	}
};
