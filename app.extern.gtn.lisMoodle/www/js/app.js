var app = {
	doDebuging : true,
	debug : function(text) {
		if (this.doDebuging)
			alert("Debug: " + text)
	}
};