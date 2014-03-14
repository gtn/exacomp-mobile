var nativeNotification = {
	notify : function(message, callback, title, buttonName) {
		navigator.notification.alert(message, callback, title, buttonName);
	}
};