var app = {
	doDebuging : false,
	debug : function(text) {
		if (this.doDebuging)
			alert("Debug: " + text)
	}
};