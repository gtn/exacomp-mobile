$(document).on('pagebeforecreate', '#settings', function(event) {
	app.debug("pagebeforecreate: settings", 1);
	gtnMoodle.initNoTokenCheck("settings", "settings");
	settings.initSettings();
	settings.loadEvents();
	settings.fillSettings();
	settings.saveSettings();
	page.initPage("settings");
	//window.localStorage.clear();
});

var settings = {
	initSettings : function() {
		// check if local storage isn't null
		app.debug("settings.initSettings()", 1);

		// gtnMoodle
		if (window.localStorage.getItem('data-app-tokenurl'))
			gtnMoodle.tokenPage = window.localStorage.getItem('data-app-tokenurl');
		if (window.localStorage.getItem('data-app-serverurl'))
			gtnMoodle.moodleUrl = window.localStorage.getItem('data-app-serverurl');
		if (window.localStorage.getItem('data-app-webserviceurl'))
			gtnMoodle.webServiceUrl = window.localStorage.getItem('data-app-webserviceurl');

		// app
		if (window.localStorage.getItem('data-app-debug'))
			app.doDebuging = window.localStorage.getItem('data-app-debug');
		if (window.localStorage.getItem('data-app-debuglevel'))
			app.debugLevel = window.localStorage.getItem('data-app-debuglevel');

		// web service client
		if (window.localStorage.getItem('data-app-timeout'))
			wsc.timeout = window.localStorage.getItem('data-app-timeout');
		if (window.localStorage.getItem('data-app-method'))
			wsc.method = window.localStorage.getItem('data-app-method');
	},
	fillSettings : function() {
		app.debug("settings.loadSettings()");
		if (gtnMoodle.moodleUrl) {
			$("#settings #frmSettings #txtServer").val(gtnMoodle.moodleUrl);
		} else {
			$("#settings #frmSettings #txtServer").val(window.localStorage.getItem('data-app-serverurl'));
		}

		if (gtnMoodle.webServiceUrl) {
			$("#settings #frmSettings #txtWebService").val(gtnMoodle.webServiceUrl);
		} else {
			$("#settings #frmSettings #txtWebService").val(window.localStorage.getItem('data-app-webserviceurl'));
		}

		if (gtnMoodle.tokenPage) {
			$("#settings #frmSettings #txtToken").val(gtnMoodle.tokenPage);
		} else {
			$("#settings #frmSettings #txtToken").val(window.localStorage.getItem('data-app-tokenurl'));
		}

		if (app.doDebuging == "true") {
			$("#settings #frmSettings #cbxDebug").prop('checked', true);
		} else {
			$("#settings #frmSettings #cbxDebug").prop('checked', false);
		}

		if (app.debugLevel) {
			$("#settings #frmSettings #txtDebug").val(app.debugLevel);
		} else {
			$("#settings #frmSettings #txtDebug").val(window.localStorage.getItem('data-app-debuglevel'));
		}

		if (wsc.timeout) {
			$("#settings #frmSettings #txtTimeout").val(wsc.timeout);
		} else {
			$("#settings #frmSettings #txtTimeout").val(window.localStorage.getItem('data-app-timeout'));
		}

		if (wsc.method) {
			$("#settings #frmSettings #txtMethod").val(wsc.method);
		} else {
			$("#settings #frmSettings #txtMethod").val(window.localStorage.getItem('data-app-method'));
		}

	},
	loadEvents : function() {
		app.debug("settings.loadEvents()");
		$("#frmSettings").on("submit", function(e) {
			e.preventDefault();
			if (settings.saveSettings())
				app.notify(language.s('common_settings'), language.s('common_settings_saved_success'));
			settings.initSettings();
		});
	},
	saveSettings : function() {
		app.debug("settings.saveSettings()");
		window.localStorage.setItem('data-app-serverurl', $("#settings #frmSettings #txtServer").val());
		window.localStorage.setItem('data-app-webserviceurl', $("#settings #frmSettings #txtWebService").val());
		window.localStorage.setItem('data-app-tokenurl', $("#settings #frmSettings #txtToken").val());
		window.localStorage.setItem('data-app-debug', $("#settings #frmSettings #cbxDebug").prop('checked'));
		window.localStorage.setItem('data-app-debuglevel', $("#settings #frmSettings #txtDebug").val());
		window.localStorage.setItem('data-app-timeout', $("#settings #frmSettings #txtTimeout").val());
		window.localStorage.setItem('data-app-method', $("#settings #frmSettings #txtMethod").val());
		return true;
	}
};