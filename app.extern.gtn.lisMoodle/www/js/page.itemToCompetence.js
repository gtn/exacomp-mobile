$(document).on('pagebeforecreate', '#itemToCompetence', function(event) {
	app.debug("itemToCompetence: itemToCompetence", 3);
	gtnMoodle.init("itemToCompetence", "itemToCompetence");
	itemToCompetence.loaditemToCompetence();
	page.initPage("itemToCompetence");
	itemToCompetence.defineEvents();
});

var itemToCompetence = {
	itemId : null,
	competenceId : null,
	loaditemToCompetence : function() {
		app.debug("itemToCompetence.loadItemToCompetence()", 2);
		var type = window.localStorage.getItem('data-app-assign');
		var append = '';
		if (type.trim() == "item-selected") {
			itemToCompetence.itemId = window.localStorage.getItem('data-app-portfolioid');
			app.debug("item-selected: " + itemToCompetence.itemId, 2);
			append += '<h3>Selected Portfolio Item</h3>';
			append += '<p class="app-itemid"> ' + itemToCompetence.itemId.trim() + '</p>';
			append += '<h3>Selected Competence</h3>';
			append += '<p class="app-competenceid">not selected</p>';
			append += '<a class="app-assign ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-icon-left ui-icon-plus ui-mini ui-disabled" data-app-contentid="' + itemToCompetence.competenceId + '" data-app-portfolioid="' + itemToCompetence.itemId + '" data-role="button" href="xxx.html">Zuordnen</a>';
			append += '<h3>Select Competence<h3>';
			data = "";
			xml = gtnMoodle.getMoodleXml("block_exaport_list_competencies", gtnMoodle.tokenExaport, data);
			$(xml).find('RESPONSE>MULTIPLE>SINGLE').each(function() {
				app.debug("SINGLE", 1);
				var values = new Array();
				$(this).find('>KEY').each(function() {
					app.debug("SINGLE>KEY", 1);
					var name = $(this).attr('name');
					values[name] = $(this).text();
				});
				append += '<div class="app-collapse ui-mini" data-role="collapsible" data-mini="true">';
				append += '<h3>' + values['name'] + '<h3>';

				$(this).find('>KEY[name=topics]>MULTIPLE>SINGLE').each(function() {
					$(this).find('>KEY').each(function() {
						app.debug("SINGLE>KEY", 1);
						var name = $(this).attr('name');
						values[name] = $(this).text();
					});
					append += '<p>' + values['name'] + '<p>';
					append += '<div class="app-collapse ui-mini" data-role="collapsible" data-mini="true">';
					append += '<h3>expand<h3>';
					append += '<ul data-role="listview" class="ui-mini" data-mini="true">';
					$(this).find(">KEY[name=descriptors]>MULTIPLE>SINGLE").each(function() {
						$(this).find('>KEY').each(function() {
							app.debug("SINGLE>KEY", 1);
							var name = $(this).attr('name');
							values[name] = $(this).text();
						});

						append += '<li>';
						append += '<a data-app-contentid="' + values['id'] + '" class="app-select-competence ui-mini" href="#" data-role="button" data-mini="true">';
						append += values['name'];
						append += '';
						append += '</a>';
						append += '';
						append += '';
						append += '<li>';

					});
					append += '</ul>';
					append += '</div>';
				});

				append += '';
				append += '';
				append += '';
				append += '';
				append += '';
				append += '';
				append += '';
				append += '</div>';
			});

			append += '';
			append += '';
			append += '';
			append += '';
			append += '';
			append += '';
			append += '';
			append += '';
			append += '';
			append += '';
			append += '';
			append += '';
			append += '';
			append += '';
			append += '';

		}
		$("#itemToCompetence .app-content").empty();
		$("#itemToCompetence .app-content").append(append);
	},
	setItemToCompetence : function(itemid, descriptorid) {
		var success = null;
		data = "&itemid=" + itemid + "&descriptorid=" + descriptorid + "&val=1";
		xml = gtnMoodle.getMoodleXml("block_exaport_set_item_competence", gtnMoodle.tokenExaport, data);
		$(xml).find('SINGLE').each(function() {
			app.debug("SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});
			app.debug("Success add portfolioitem: " + values['success'], 2);
			success = true;
		});
		return success;
	},
	defineEvents : function() {
		$("#itemToCompetence .app-select-competence").on("click", function(e) {
			app.debug("#itemToCompetence .app-select-competence: click", 2);
			e.preventDefault();
			$("#itemToCompetence .app-competenceid").text(window.localStorage.getItem('data-app-contentid'));
			itemToCompetence.competenceId = window.localStorage.getItem('data-app-contentid');
			$('#itemToCompetence .app-collapse').each(function() {
				$(this).collapsible("option", "collapsed", true);
			});
			$("#itemToCompetence .app-assign").attr('data-app-contentid', itemToCompetence.competenceId.trim());
			$("#itemToCompetence .app-assign").attr('data-app-portfolioid', itemToCompetence.itemId.trim());
			$("#itemToCompetence .app-assign").removeClass('ui-disabled');
		});

		$("#itemToCompetence .app-assign").on("click", function(e) {
			e.preventDefault();
			app.debug("#itemToCompetence #assign: click", 2);
			var itemid = parseInt(itemToCompetence.itemId);
			var descriptorid = parseInt(itemToCompetence.competenceId);
			if (itemToCompetence.setItemToCompetence(itemid, descriptorid)) {
				app.notify("", "Erfolgreich hinzugefügt");
				$(location).attr('href', 'eportfolio.html');
			} else {
				app.notify("", "nicht erfolgreich");
			}
		});
	}
};
