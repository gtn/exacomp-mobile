var nativeNotification = {
	notify : function(message, callback, title, buttonName) {
		if (typeof navigator.notification != "undefined") {
			navigator.notification.alert(message, callback, title, buttonName);
		} else {
			alert(language.s("cordova_plugin_error") + message);
		}
	}
};