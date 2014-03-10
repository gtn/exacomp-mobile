$(document).on('pagebeforecreate', '#portfolioItems', function(event) {
	app.debug("pagebeforecreate: portfolioItems", 3);
	gtnMoodle.init("portfolioItems", "portfolioItems");
	initIds();
});

var portfolioItems = {
	loadPortfolioItems : function() {
		app.debug("portfolioItems.portfolioItems()");
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
				var append = '';
				append += '<div class="excomdos_tile">';
				append += '<div class="excomdos_tilehead">';
				append += '<span class="excomdos_tileinfo"> Note </span>';
				append += '</div>';
				append += '<div class="excomdos_tileimage">';
				append += '<img src="../img/note_tile.png" />';
				append += '</div>';
				append += '<div class="exomdos_tiletitle">';
				append += '<a href="portfolioItem.html">Publikation und Kommunikation</a>';
				append += '</div>';
				append += '<div class="excomdos_tileedit">';
				append += '<a href="portfolioEditItem.html" class="ui-btn ui-icon-edit ui-btn-icon-notext ui-corner-all ui-btn-inline">edit</a>';
				append += '<a href="#" class="ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all ui-btn-inline">delete</a>';
				append += '</div>';
				append += '</div>';
				$("#portfolioItems .exalis_eport_raster").append(append);
			} else if (values['type'] == "file") {
				var append = '';
				append += '<div class="excomdos_tile">';
				append += '<div class="excomdos_tilehead">';
				append += '<span class="excomdos_tileinfo"> File </span>';
				append += '</div>';
				append += '<div class="excomdos_tileimage">';
				append += '<img src="../img/file_tile.png" />';
				append += '</div>';
				append += '<div class="exomdos_tiletitle">';
				append += '<a href="portfolioItem.html">Publikation und Kommunikation</a>';
				append += '</div>';
				append += '<div class="excomdos_tileedit">';
				append += '<a href="portfolioEditItem.html" class="ui-btn ui-icon-edit ui-btn-icon-notext ui-corner-all ui-btn-inline">edit</a>';
				append += '<a href="#" class="ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all ui-btn-inline">delete</a>';
				append += '</div>';
				append += '</div>';
				$("#portfolioItems .exalis_eport_raster").append(append);
			} else if (values['type'] == "link") {
				var append = '';
				append += '<div class="excomdos_tile">';
				append += '<div class="excomdos_tilehead">';
				append += '<span class="excomdos_tileinfo"> Link </span>';
				append += '</div>';
				append += '<div class="excomdos_tileimage">';
				append += '<img src="../img/logo.jpg" />';
				append += '</div>';
				append += '<div class="exomdos_tiletitle">';
				append += '<a href="portfolioItem.html">Publikation und Kommunikation</a>';
				append += '</div>';
				append += '<div class="excomdos_tileedit">';
				append += '<a href="portfolioEditItem.html" class="ui-btn ui-icon-edit ui-btn-icon-notext ui-corner-all ui-btn-inline">edit</a> ';
				append += '<a href="#" class="ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all ui-btn-inline">delete</a>';
				append += '</div>';
				append += '</div>';
				$("#portfolioItems .exalis_eport_raster").append(append);
			} else if (values['type'] == "category") {
				var append = '';
				append += '<div class="excomdos_tile">';
				append += '<div class="excomdos_tilehead">';
				append += '<span class="excomdos_tileinfo"> Category </span>';
				append += '</div>';
				append += '<div class="excomdos_tileimage">';
				append += '<img src="../img/folder_tile.png" />';
				append += '</div>';
				append += '<div class="exomdos_tiletitle">';
				append += '<a href="portfolioItem.html">Publikation und Kommunikation</a>';
				append += '</div>';
				append += '<div class="excomdos_tileedit">';
				append += '<a href="portfolioEditItem.html" class="ui-btn ui-icon-edit ui-btn-icon-notext ui-corner-all ui-btn-inline">edit</a>';
				append += '<a href="#" class="ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all ui-btn-inline">delete</a>';
				append += '</div>';
				append += '</div>';
				$("#portfolioItems .exalis_eport_raster").append(append);
			}
		});
	},
	defineEvents : function() {
	}
};
