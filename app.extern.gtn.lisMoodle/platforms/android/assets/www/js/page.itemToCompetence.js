$(document).on('pagebeforecreate', '#itemToCompetence', function(event) {
	app.debug("itemToCompetence: itemToCompetence", 3);
	gtnMoodle.init("itemToCompetence", L.s("portfolio_competence_selection"));
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
			var assigned = itemToCompetence.getAssignedArray(itemToCompetence.itemId);
			app.debug("item-selected: " + itemToCompetence.itemId, 2);
			/*
			 * append += '<h3>Selected Portfolio Item</h3>'; append += '<p class="app-itemid"> ' +
			 * itemToCompetence.itemId.trim() + '</p>'; append += '<h3>Selected
			 * Competence</h3>'; append += '<p class="app-competenceid">not
			 * selected</p>'; append += '<a class="app-assign ui-shadow
			 * ui-btn ui-corner-all ui-btn-inline ui-btn-icon-left ui-icon-plus
			 * ui-mini ui-disabled" data-app-contentid="' +
			 * itemToCompetence.competenceId + '" data-app-portfolioid="' +
			 * itemToCompetence.itemId + '" data-role="button"
			 * href="xxx.html">Zuordnen</a>'; append += '<h3>Select
			 * Competence<h3>';
			 */
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
					append += '<h3>aufklappen<h3>';
					append += '<ul data-role="listview" class="ui-mini" data-mini="true">';
					$(this).find(">KEY[name=descriptors]>MULTIPLE>SINGLE").each(function() {
						$(this).find('>KEY').each(function() {
							app.debug("SINGLE>KEY", 1);
							var name = $(this).attr('name');
							values[name] = $(this).text();
						});

						var checked = '';
						if (assigned[values['id']])
							var checked = 'checked="checked"';

						append += '<li>';

						append += '<a class="" href="#" style="padding-top: 0px;padding-bottom: 0px;padding-right: 42px;padding-left: 0px;" data-app-contentid="' + values['id'] + '">';
						append += '<label style="border-top-width: 0px;margin-top: 0px;border-bottom-width: 0px;margin-bottom: 0px;border-left-width: 0px;border-right-width: 0px;" data-corners="false">';
						append += '<fieldset data-role="controlgroup" >';
						append += '<input class="app-select-competence" id="2" name="2" type="checkbox" ' + checked + ' />';
						append += values['name'];
						append += '</fieldset>';
						append += '</label>';
						append += '</a><a href="#" rel="external"></a>';

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
	getAssignedArray : function(itemid) {
		var assigned = []
		data = "&itemid=" + itemid;
		xml = gtnMoodle.getMoodleXml("block_exaport_get_competencies_by_item", gtnMoodle.tokenExaport, data);
		$(xml).find('RESPONSE>MULTIPLE>SINGLE').each(function() {
			var values = new Array();
			$(this).find('>KEY').each(function() {
				app.debug("SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});
			assigned[values['competenceid']] = true;
		});
		return assigned;
	},
	setItemToCompetence : function(itemid, descriptorid, val) {
		var success = null;
		data = "&itemid=" + itemid + "&descriptorid=" + descriptorid + "&val=" + val;
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

		$("#itemToCompetence .app-select-competence").change(function() {
			app.debug('Cbx changed to: ' + $(this).prop("checked"), 1);
			itemToCompetence.competenceId = window.localStorage.getItem('data-app-contentid');

			var itemid = parseInt(itemToCompetence.itemId);
			var descriptorid = parseInt(itemToCompetence.competenceId);

			var val = null;
			if ($(this).prop("checked")) {
				val = 1;
				if (itemToCompetence.setItemToCompetence(itemid, descriptorid, val)) {
					app.notify("", L.s("notify_portfolio_set_competence_text"));

				} else {
					app.notify("", L.s("notify_portfolio_competence_failure"));
				}
			} else {
				val = 0;
				if (itemToCompetence.setItemToCompetence(itemid, descriptorid, val)) {
					app.notify("", L.s("notify_portfolio_unset_competence_text"));
				} else {
					app.notify("", L.s("notify_portfoliocompetence_failure"));
				}
			}
		});
	}
};
