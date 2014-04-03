$(document).on('pagebeforecreate', '#portfolioItems', function(event) {
	app.debug("pagebeforecreate: portfolioItems", 3);
	gtnMoodle.init("portfolioItems", L.s("page_eportfolioItems"));
	portfolioItems.loadPortfolioItems(0, 0);
	page.initPage("portfolioItems");
	portfolioItems.defineEvents();
});

var portfolioItems = {
	loadPortfolioItems : function(id, lastId) {
		app.debug("portfolioItems.loadPortfolioItems(" + id + ", " + lastId + ")");
		$("#portfolioItems .exalis_eport_raster").empty();
		if (id != 0) {
			var append = '';
			append += '<div class="excomdos_tile">';
			append += '<div class="excomdos_tilehead">';
			append += '<span class="excomdos_tileinfo"> Category </span>';
			append += '</div>';
			append += '<div class="excomdos_tileimage">';
			append += '<img src="../img/folder_tile.png" />';
			append += '</div>';
			append += '<div class="exomdos_tiletitle">';
			append += '<a href="portfolioItems.html" class="app-category-change" data-app-portfolioid="' + lastId + '" >..</a>';
			append += '</div>';
			append += '<div class="excomdos_tileedit">';
			append += '<a href="portfolioEditItem.html" data-app-portfolioid="' + lastId + '" class="ui-btn ui-icon-edit ui-btn-icon-notext ui-corner-all ui-btn-inline">edit</a>';
			append += '<a href="#" data-app-portfolioid="' + lastId + '"  class="ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all ui-btn-inline">delete</a>';
			append += '</div>';
			append += '</div>';
			$("#portfolioItems .exalis_eport_raster").append(append);
		}

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
				var append = '';
				append += '<div class="excomdos_tile">';
				append += '<div class="excomdos_tilehead">';
				append += '<span class="excomdos_tileinfo"> '+L.s("portfolio_type_note")+' </span>';
				append += '</div>';
				append += '<div class="excomdos_tileimage">';
				append += '<img src="../img/note_tile.png" />';
				append += '</div>';
				append += '<div class="exomdos_tiletitle">';
				append += '<a data-dom-cache="false" href="portfolioItem.html" data-app-portfoliotype="note" data-app-portfolioid="' + values['id'] + '">' + values['name'] + '</a>';
				append += '</div>';
				append += '<div class="excomdos_tileedit">';
				append += '<a data-dom-cache="false" href="portfolioEditItem.html" data-app-portfoliotype="note"  data-app-portfolioid="' + values['id'] + '" class="ui-btn ui-icon-edit ui-btn-icon-notext ui-corner-all ui-btn-inline">edit</a>';
				append += '<a data-dom-cache="false" href="#" data-app-portfoliotype="note"  data-app-portfolioid="' + values['id'] + '" class="app-delete-item ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all ui-btn-inline">delete</a>';
				append += '</div>';
				append += '</div>';
				$("#portfolioItems .exalis_eport_raster").append(append);
			} else if (values['type'].trim() == "file") {
				var append = '';
				append += '<div class="excomdos_tile">';
				append += '<div class="excomdos_tilehead">';
				append += '<span class="excomdos_tileinfo"> '+L.s("portfolio_type_file")+' </span>';
				append += '</div>';
				append += '<div class="excomdos_tileimage">';
				append += '<img src="../img/file_tile.png" />';
				append += '</div>';
				append += '<div class="exomdos_tiletitle">';
				append += '<a data-dom-cache="false" href="portfolioItem.html" data-app-portfoliotype="file" data-app-portfolioid="' + values['id'] + '">' + values['name'] + '</a>';
				append += '</div>';
				append += '<div class="excomdos_tileedit">';
				append += '<a data-dom-cache="false" href="portfolioEditItem.html" data-app-portfoliotype="file"  data-app-portfolioid="' + values['id'] + '" class="ui-btn ui-icon-edit ui-btn-icon-notext ui-corner-all ui-btn-inline">edit</a>';
				append += '<a data-dom-cache="false" href="#" data-app-portfoliotype="file"  data-app-portfolioid="' + values['id'] + '" class="app-delete-item ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all ui-btn-inline">delete</a>';
				append += '</div>';
				append += '</div>';
				$("#portfolioItems .exalis_eport_raster").append(append);
			} else if (values['type'].trim() == "link") {
				var append = '';
				append += '<div class="excomdos_tile">';
				append += '<div class="excomdos_tilehead">';
				append += '<span class="excomdos_tileinfo"> '+L.s("portfolio_type_link")+' </span>';
				append += '</div>';
				append += '<div class="excomdos_tileimage">';
				append += '<img src="../img/logo.jpg" />';
				append += '</div>';
				append += '<div class="exomdos_tiletitle">';
				append += '<a data-dom-cache="false" href="portfolioItem.html" data-app-portfoliotype="link"  data-app-portfolioid="' + values['id'] + '">' + values['name'] + '</a>';
				append += '</div>';
				append += '<div class="excomdos_tileedit">';
				append += '<a data-dom-cache="false" href="portfolioEditItem.html" data-app-portfoliotype="link" data-app-portfolioid="' + values['id'] + '" class="ui-btn ui-icon-edit ui-btn-icon-notext ui-corner-all ui-btn-inline">edit</a> ';
				append += '<a data-dom-cache="false" href="#" data-app-portfoliotype="link" data-app-portfolioid="' + values['id'] + '"  class="app-delete-item ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all ui-btn-inline">delete</a>';
				append += '</div>';
				append += '</div>';
				$("#portfolioItems .exalis_eport_raster").append(append);
			} else if (values['type'].trim() == "category") {
				var append = '';
				append += '<div class="excomdos_tile">';
				append += '<div class="excomdos_tilehead">';
				append += '<span class="excomdos_tileinfo"> '+L.s("portfolio_type_category")+' </span>';
				append += '</div>';
				append += '<div class="excomdos_tileimage">';
				append += '<img src="../img/folder_tile.png" />';
				append += '</div>';
				append += '<div class="exomdos_tiletitle">';
				append += '<a data-dom-cache="false" href="portfolioItems.html" data-app-portfoliotype="category"  class="app-category-change" data-app-portfolioid="' + values['id'] + '" data-app-portfolioid-last="' + lastId + '">' + values['name'] + '</a>';
				append += '</div>';
				append += '<div class="excomdos_tileedit">';
				append += '<a data-dom-cache="false" href="portfolioEditItem.html" data-app-portfoliotype="category"  data-app-portfolioid="' + values['id'] + '" class="ui-btn ui-icon-edit ui-btn-icon-notext ui-corner-all ui-btn-inline">edit</a>';
				append += '<a data-dom-cache="false" href="#" data-app-portfoliotype="category"  data-app-portfolioid="' + values['id'] + '"  class="app-delete-item ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all ui-btn-inline">delete</a>';
				append += '</div>';
				append += '</div>';
				$("#portfolioItems .exalis_eport_raster").append(append);
			}
		});
		var append = '';
		append += '<p class="centered margin-top">';
		append += '<a data-ajax="false" data-app-portfolioid="' + id + '" data-app-portfoliotype="category" href="portfolioNewItem.html" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-icon-left ui-icon-plus ui-mini">'+L.s("portfolio_new_category")+'</a> ';
		append += '<a data-ajax="false" data-app-portfolioid="' + id + '" data-app-portfoliotype="note" href="portfolioNewItem.html" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-icon-left ui-icon-plus ui-mini">'+L.s("portfolio_new_note")+'</a> ';
		append += '<a data-ajax="false" data-app-portfolioid="' + id + '" data-app-portfoliotype="link" href="portfolioNewItem.html" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-icon-left ui-icon-plus ui-mini">'+L.s("portfolio_new_link")+'</a> ';
		append += '<a data-ajax="false" data-app-portfolioid="' + id + '" data-app-portfoliotype="file" href="portfolioNewItem.html" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-icon-left ui-icon-plus ui-mini">'+L.s("portfolio_new_file")+'</a>';
		append += '</p>';
		$("#portfolioItems .app-buttons").empty();
		$("#portfolioItems .app-buttons").append(append);
	},
	deleteItem : function(id) {
		app.debug('portfolioItems.deleteItem(' + id + ')', 2);
		var success = null;
		data = "&id=" + id;
		xml = gtnMoodle.getMoodleXml("block_exaport_delete_item", gtnMoodle.tokenExaport, data);
		$(xml).find('SINGLE').each(function() {
			app.debug("SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});
			app.debug("Success update portfolioitem: " + values['success'], 2);
			app.notify("Item", "Erfolgreich gel�scht.");
			success = true;
		});
		return success;
	},
	defineEvents : function() {
		app.debug("portfolioItems.defineEvents()", 2);
		$('#portfolioItems .app-category-change').on("click", function(e) {
			app.debug("#portfolioItems .app-category-change: click", 2);
			portfolioItems.loadPortfolioItems(window.localStorage.getItem('data-app-portfolioid'), window.localStorage.getItem('data-app-portfolioid-last'));
			initIds();
			portfolioItems.defineEvents();
		});

		$('#portfolioItems .app-delete-item').on("click", function(e) {
			var id = window.localStorage.getItem('data-app-portfolioid');
			portfolioItems.deleteItem(id);
			location.reload();
		});
	}
};
