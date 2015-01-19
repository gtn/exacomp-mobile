var nativeInappbrowser = {
	browser : null,
	open : function(url, target, options) {
		if (typeof window.open != "undefined") {
			nativeInappbrowser.browser = window.open(url, target, options);
		}
	}
};