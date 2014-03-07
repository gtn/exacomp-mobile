$(document).bind("mobileinit", function() {
	app.debug("mobileinit", 2);
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.page.prototype.options.domCache = false;
	settings.initSettings();
});

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	;// alert("device ready");
}

$(document).on('pagebeforecreate', function() {
	app.debug("pagebeforecreate: each page");
});

var app = {
	doDebuging : false,
	debugLevel : 1,
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
	}
};
