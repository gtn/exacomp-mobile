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
			var append = '<li>';
			append += '<a href="#" class="app-share" data-app-userid="' + values['id'] + '">';
			append += '';
			append += values['lastname'] + ' ' + values['firstname'];
			append += '';
			append += '</a>';
			append += '';
			append += '';
			append += '';
			append += '';
			append += '</li>';
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
			app.notify("Item", "Erfolgreich freigegeben.");
			success = true;
		});
		return success;
	},
	grantAll : function(id, val) {
		app.debug('portfolioShareView.grantUser(' + id + ', ' + val + ')', 2);
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
		$("#portfolioShareView .app-share").on("click", function(e) {
			e.preventDefault();
			var viewid = window.localStorage.getItem('data-app-portfolioviewid');
			var userid = window.localStorage.getItem('data-app-userid').trim();
			var val = 1;
			portfolioShareView.grantUser(viewid, userid, val);
		});
		$("#portfolioShareView .app-shareall").on("click", function(e) {
			e.preventDefault();
			var id = window.localStorage.getItem('data-app-portfolioviewid');
			var val = 1;
			if (portfolioShareView.grantAll(id, val))
				app.notify("Item", "Erfolgreich für alle freigegeben.");
		});
		$("#portfolioShareView .app-cancleshare").on("click", function(e) {
			e.preventDefault();
			var id = window.localStorage.getItem('data-app-portfolioviewid');
			var val = 0;
			if (portfolioShareView.grantAll(id, val))
				app.notify("Item", "View ist nicht mehr Freigegeben.");
		});
	}
};