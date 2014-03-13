/* on jquery mobile initialisation */
$(document).bind("mobileinit", function() {
	app.debug("mobileinit", 2);
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.page.prototype.options.domCache = false;
	settings.initSettings();
	app.cordovaAvailable = true;
});

/* on cordova initialisation */
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	;// alert("device ready");
}

/* on pagebeforecreate */
$(document).on('pagebeforecreate', function(event) {
	app.debug("pagebeforecreate: each page", 1);
});
$(document).on('pageshow', function(event) {
	app.debug("pageshow: each page");
	var pageId = $.mobile.activePage.attr('id');
	if (app.debugDevice && pageId) {
		app.appendDebugArea(pageId);
	}
});
var app = {
	debugDevice : false,
	doDebuging : "false",
	debugLevel : 2,
	cordovaAvailable : false,
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
	notify : function(title, text) {
		prompt(title, text);
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
			$("#" + pageId).append('<div id="divDebug">$nbsp;</div>');
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
