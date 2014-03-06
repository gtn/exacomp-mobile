var gtnMoodle = {
	token : null,
	tokenExacomp : null,
	tokenExaport : null,
	tokenPage : "login/token.php",
	moodleUrl : "http://gtn02.gtn-solutions.com/moodle26/",
	webServiceUrl : "/webservice/rest/server.php",

	init : function(pageId, pagename) {
		app.debug("init(" + pageId + ", " + pagename + ")", 2);
		this.setToken();
		this.checkToken();
		this.writeHeader(pageId, pagename);
	},

	setToken : function() {
		this.token = window.localStorage.getItem("token");
		this.tokenExacomp = window.localStorage.getItem("tokenExacomp");
		this.tokenExaport = window.localStorage.getItem("tokenExaport");
	},

	checkToken : function() {
		if (this.token == null) {
			app.debug("token == null: token ");
			$(location).attr('href', 'login.html');
		} else if (this.tokenExacomp == null) {
			app.debug("token == null: tokenExacomp ");
			$(location).attr('href', 'login.html');
		} else if (this.tokenExaport == null) {
			app.debug("token == null: tokenExaport ");
			$(location).attr('href', 'login.html');
		}
	},

	writeHeader : function(pageId, pagename) {
		app.debug("pagename(" + pageId + ", " + pagename + ")");
		$("#" + pageId + " .app-pagename").html(pagename);
	},

	getToken : function(username, password) {
		app.debug("gtnMoodle.getToken(" + username + ", " + password + ")");
		var json;
		var data;
		var url = this.moodleUrl + this.tokenPage;

		// moodle_mobile_app
		data = "username=" + username + "&password=" + password + "&service=moodle_mobile_app";
		json = wsc.getJson(url, data);
		if (json.error) {
			app.debug("Token error: " + json.error);
			this.token = null;
		} else {
			this.token = json.token;
		}

		// exaportservices
		data = "username=" + username + "&password=" + password + "&service=exaportservices";
		json = wsc.getJson(url, data);
		if (json.error) {
			app.debug("Token error: " + json.error);
			this.tokenExaport = null;
			// this.tokenExaport = "7b13b05e668b1118711d42b5a898a616";
		} else {
			this.tokenExaport = json.token;
		}

		// exacompservices
		data = "username=" + username + "&password=" + password + "&service=exacompservices";
		json = wsc.getJson(url, data);
		if (json.error) {
			app.debug("Token error: " + json.error);
			this.tokenExacomp = null;
			// this.tokenExacomp = "4aafa2c09ae274e7d2c1a6f2b968872e";
		} else {
			this.tokenExacomp = json.token;
		}

		app.debug("Moodle token: " + gtnMoodle.token + "\nExaport token: " + gtnMoodle.tokenExaport + "\nExacomp token: " + gtnMoodle.tokenExacomp, 2);

	},
	getMoodleXml : function(wsfuction, token, data) {
		app.debug("getMoodleXml(" + wsfuction + ", " + token + ", " + data + ")", 2);
		if (!data) {
			data = "";
		}
		var xml = wsc.getXml(this.moodleUrl + this.webServiceUrl, "&wstoken=" + token + "&wsfunction=" + wsfuction + data);
		app.debug("xml: " + new XMLSerializer().serializeToString(xml), 2);
		return xml;
	},
	getMoodleJson : function(wsfuction, token, data) {
		app.debug("getMoodleJson(" + wsfuction + ", " + token + ", " + data + ")");
		var xml = this.getMoodleXml(wsfuction, token, data);
		var x2js = new X2JS();
		var json = x2js.xml2json(xml);
		app.debug("json: " + JSON.stringify(json));
		return json;
	}
};