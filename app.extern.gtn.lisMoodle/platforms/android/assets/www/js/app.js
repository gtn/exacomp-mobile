var app = {
	debugDevice : false,
	doDebuging : "false",
	debugLevel : 2,
	cordovaAvailable : false,
	currentPageId : null,
	init : function() {
	},
	debug : function(text, level) {
		// alert("Level:" + level + "DoDebuging" + this.doDebuging);
		if (level && this.doDebuging == "true") {
			if (level >= app.debugLevel) {
				alert("xDebug:\n" + text);
			}
		} else if (app.doDebuging == "true")
			alert("Debug: " + text)
	},
	log : function() {
		;
	},
	onPrompt : function() {
	},
	notify : function(title, text) {
		if (app.cordovaAvailable) {
			nativeNotification.notify(text, null, title, "Okay");
		} else {
			alert(text);
		}
	},
	notifyForward : function(title, text, forwardPage) {
		;
	},
	confirm : function(title, text, sucsessPage, unsucsessPage) {
		;
	},
	debugAreaCode : function() {
		var htmlCode = '';
		htmlCode += '<div id="divDebugCheckbox" data-role="fieldcontain">';
		htmlCode += '<fieldset class="debugGroup" data-role="controlgroup">';
		htmlCode += '<legend>Debug Area:</legend>';
		htmlCode += '<input type="button" name="btnRefresh" id="btnRefresh" class="custom" value="Refresh Page"/>';
		htmlCode += '<input type="checkbox" name="cbxToggleDebug" id="cbxToggleDebug" class="custom" />';
		htmlCode += '<label for="cbxToggleDebug">Toggle Debug</label>';
		htmlCode += '</fieldset>';
		htmlCode += '</div>';
		htmlCode += '';
		return htmlCode;
	},
	appendDebugArea : function(pageId) {
		if (!($("#" + pageId + " #divDebug").length > 0))
			$("#" + pageId).append('<div id="divDebug">&nbsp;</div>');
		$("#" + pageId + " #divDebug").empty();
		var htmlCode = app.debugAreaCode();
		$("#" + pageId + " #divDebug").append(htmlCode);
		app.initDebugAreaEvents(pageId);
		$("#" + pageId + " #divDebug .debugGroup").trigger('create');

	},
	initDebugAreaEvents : function(pageId) {
		// alert(Object.prototype.toString.call(app.doDebuging).replace(/^\[object
		// (.+)\]$/, "$1").toLowerCase() + " Val: ;" + app.doDebuging + ";");
		if (app.doDebuging == "true") {
			$("#" + pageId + " #cbxToggleDebug").prop('checked', true);
		} else {
			$("#" + pageId + " #cbxToggleDebug").prop('checked', false);
		}
		$("#" + pageId + " #cbxToggleDebug").change(function() {
			window.localStorage.setItem('data-app-debug', $("#" + pageId + " #cbxToggleDebug").prop('checked'));
			settings.initSettings();
		});
		$("#" + pageId + " #btnRefresh").on("click", function() {
			location.reload();
		});
	}
};

/* on cordova initialisation */
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	app.debug("onDeviceReady", 3);
	app.cordovaAvailable = true;

}

/* on jquery mobile initialisation */
$(document).bind("mobileinit", function() {
	settings.initSettings();
	app.debug("mobileinit", 2);
	// http://demos.jquerymobile.com/1.2.0/docs/api/globalconfig.html
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.page.prototype.options.domCache = false;

	$.mobile.loader.prototype.options.text = "loading";
	$.mobile.loader.prototype.options.textVisible = false;
	$.mobile.loader.prototype.options.theme = "a";
	$.mobile.loader.prototype.options.html = "";
	// $.mobile.ajaxLinksEnabled = false;
});

/* on pagebeforecreate */
$(document).on('pagebeforecreate', function(event) {
	app.debug("pagebeforecreate: each page", 2);
});

$(document).on('pagebeforechange', function(event, data) {
	app.debug("pagebeforechange: each page", 2);

	// alert(data.toPage.toString());
	// $("#" + app.currentPageId).append('<div id="overlay">&nbsp;</div>');
});
$(document).on('pageshow', function(event) {
	app.debug("pageshow: each page");
	var pageId = $.mobile.activePage.attr('id');
	app.currentPageId = pageId;
	if (app.debugDevice && pageId) {
		app.appendDebugArea(pageId);
	}
	// $("#" + app.currentPageId + " #overlay").remove();
});

function handleOpenURL(url) {
	window.localStorage.setItem('data-app-ios-data', 'true');
	window.localStorage.setItem('data-app-ios-url', url);
	$(location).attr('href', "portfolioNewItem.html");
}