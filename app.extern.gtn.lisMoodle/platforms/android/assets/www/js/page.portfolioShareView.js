//portfolioShareView
$(document).on('pagebeforecreate', '#portfolioShareView', function(event) {
	app.debug("pagebeforecreate: portfolioShareView", 3);
	gtnMoodle.init("portfolioShareView", "portfolioShareView");
	portfolioShareView.loadPortfolioShareView();
	page.initPage("portfolioShareView");
	portfolioShareView.defineEvents();
});

var portfolioShareView = {
	loadPortfolioShareView : function() {
		app.debug("portfolioShareView.loadPortfolioShareView()");
		var users = portfolioShareView.getSharedUsers(window.localStorage.getItem('data-app-portfolioviewid'));
		$("#portfolioShareView .app-list").empty();
		data = "";
		xml = gtnMoodle.getMoodleXml("block_exaport_view_get_available_users ", gtnMoodle.tokenExaport, data);
		$(xml).find('MULTIPLE>SINGLE').each(function() {
			app.debug("MULTIPLE>SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("MULTIPLE>SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});
			// do it
			var checked = '';
			if (users[values['id']])
				var checked = 'checked="checked"';
			var append = '';
			/*
			 * append += '<a href="#" class="app-share ' + checked + '"
			 * data-app-userid="' + values['id'] + '">'; append += ''; append +=
			 * values['lastname'] + ' ' + values['firstname']; append += '';
			 * append += '</a>'; append += ''; append += ''; append += '';
			 * append += ''; append += '</li>';
			 */

			append += '<li><a href="#" data-app-userid="' + values['id'] + '" style="padding-top: 0px;padding-bottom: 0px;padding-right: 42px;padding-left: 0px;">';
			append += '<label style="border-top-width: 0px;margin-top: 0px;border-bottom-width: 0px;margin-bottom: 0px;border-left-width: 0px;border-right-width: 0px;" data-corners="false">';
			append += '<fieldset data-role="controlgroup" >';
			append += '<input class="app-share" id="2" name="2" type="checkbox" value="true" ' + checked + ' />     ';
			append += values['lastname'] + ' ' + values['firstname'];
			append += '</fieldset>';
			append += '</label>';
			append += '</a><a href="#" ></a>';
			append += ' </li>';

			$("#portfolioShareView .app-list").append(append);
		});
		var append = '';
		append += '<a href="#" class="app-shareall ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-icon-left ui-icon-plus ui-mini">View für alle Benutzer freigeben</a>';
		append += '<a href="#" class="app-cancleshare ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-icon-left ui-icon-plus ui-mini">Alle Freigaben zurückziehen</a>';
		append += '';
		append += '';
		append += '';
		append += '';
		$("#portfolioShareView .actions").empty();
		$("#portfolioShareView .actions").append(append);
	},

	getSharedUsers : function(viewid) {
		var users = [];
		data = "&viewid=" + viewid;
		xml = gtnMoodle.getMoodleXml("block_exaport_get_users_by_view", gtnMoodle.tokenExaport, data);
		$(xml).find('RESPONSE>MULTIPLE>SINGLE').each(function() {
			var values = new Array();
			$(this).find('>KEY').each(function() {
				app.debug("SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});
			users[values['userid']] = true;
		});
		return users;
	},

	grantUser : function(viewid, userid, val) {
		app.debug('portfolioShareView.grantUser(' + viewid + ', ' + userid + ', ' + val + ')', 2);
		var success = null;
		data = "&viewid=" + viewid + "&userid=" + userid + "&val=" + val;
		xml = gtnMoodle.getMoodleXml("block_exaport_view_grant_internal_access", gtnMoodle.tokenExaport, data);
		$(xml).find('SINGLE').each(function() {
			app.debug("SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});
			app.debug("Success update portfolioitem: " + values['success'], 2);
			success = true;
		});
		return success;
	},
	grantAll : function(id, val) {
		app.debug('portfolioShareView.grantAll(' + id + ', ' + val + ')', 2);
		var success = null;
		data = "&id=" + id + "&val=" + val;
		xml = gtnMoodle.getMoodleXml("block_exaport_view_grant_internal_access_all", gtnMoodle.tokenExaport, data);
		$(xml).find('SINGLE').each(function() {
			app.debug("SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});
			app.debug("Success update portfolioitem: " + values['success'], 2);
			success = true;
		});
		return success;
	},
	defineEvents : function() {
		$("#portfolioShareView .app-share").change(function(e) {

			e.preventDefault();
			var viewid = window.localStorage.getItem('data-app-portfolioviewid');
			var userid = window.localStorage.getItem('data-app-userid').trim();

			var val = null;
			if ($(this).prop("checked")) {
				val = 1;
				portfolioShareView.grantUser(viewid, userid, val);
				app.notify("Item", "Erfolgreich freigegeben.");
			} else {
				val = 0;
				portfolioShareView.grantUser(viewid, userid, val);
				app.notify("Item", "Freigabe zurückgezogen.");
			}

		});
		$("#portfolioShareView .app-shareall").on("click", function(e) {
			e.preventDefault();
			var id = window.localStorage.getItem('data-app-portfolioviewid');
			var val = 1;
			if (portfolioShareView.grantAll(id, val)) {
				app.notify("Item", "Erfolgreich für alle freigegeben.");
				$(location).attr('href', 'portfolioShareView.html');
			}
		});
		$("#portfolioShareView .app-cancleshare").on("click", function(e) {
			e.preventDefault();
			var id = window.localStorage.getItem('data-app-portfolioviewid');
			var val = 0;
			if (portfolioShareView.grantAll(id, val)) {
				app.notify("Item", "View ist nicht mehr Freigegeben.");
				$(location).attr('href', 'portfolioShareView.html');
			}
		});
	}
};