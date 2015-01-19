var gtnMoodle = {
	token : null,
	tokenExacomp : null,
	tokenExaport : null,
	tokenPage : "login/token.php",
	moodleUrl : "http://gtn02.gtn-solutions.com/moodle26/",
	webServiceUrl : "webservice/rest/server.php",
	uploadUrl : "webservice/upload.php",
	keepAlive : "blocks/exacomp/styles.css",

	init : function(pageId, pagename) {
		app.debug("gtnMoodle.init(" + pageId + ", " + pagename + ")", 2);
		this.setToken();
		if (!this.checkToken()) {
			app.notify("Token error", "Du bist ausgelogged!");
		}
		this.writeHeader(pageId, pagename);
	},
	initNoTokenCheck : function(pageId, pagename) {
		app.debug("gtnMoodle.initNoTokenCheck(" + pageId + ", " + pagename + ")", 2);
		this.writeHeader(pageId, pagename);
	},
	setToken : function() {
		this.token = window.localStorage.getItem("token");
		this.tokenExacomp = window.localStorage.getItem("tokenExacomp");
		this.tokenExaport = window.localStorage.getItem("tokenExaport");
	},

	checkToken : function() {
		app.debug("gtnMoodle.checkToken()", 2);
		app.debug("Moodle token: " + gtnMoodle.token + "\nExaport token: " + gtnMoodle.tokenExaport + "\nExacomp token: " + gtnMoodle.tokenExacomp, 2);
		if (gtnMoodle.token.trim() == "null") {
			app.debug("token == null: token ");
			return false;
		} else if (gtnMoodle.tokenExacomp.trim() == "null") {
			app.debug("token == null: tokenExacomp ");
			return false;
		} else if (gtnMoodle.tokenExaport.trim() == "null") {
			app.debug("token == null: tokenExaport ");
			return false;
		}
		return true;
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
			app.debug("Json: " + JSON.stringify(json), 2);
			app.debug("Token error: " + json.error + "\n" + json.debuginfo.trim().substring(12));
			if (json.debuginfo.trim().substring(12) == "usernamenotfound") {
				app.notify("Login", "Benutzername oder Passwort Falsch");
				return false;
			} else if (json.debuginfo.trim().substring(12) == "servicenotavailable") {
				app.notify("Login", "Web service is not available (it doesn't exist or might be disabled)");
				return false;
			}
			this.token = null;
		} else if (!json) {
			app.notify(L.s("webservice_moodletimeout"), L.s("webservice_noconnection"));
			return false;
		} else {
			this.token = json.token;
		}

		// exaportservices
		data = "username=" + username + "&password=" + password + "&service=exaportservices";
		json = wsc.getJson(url, data);
		if (json.error) {
			app.debug("Json: " + JSON.stringify(json), 2);
			app.debug("Token error: " + json.error + "\n" + json.debuginfo.trim().substring(12));
			if (json.debuginfo.trim().substring(12) == "usernamenotfound") {
				app.notify("Login", "Benutzername oder Passwort Falsch");
				return false;
			} else if (json.debuginfo.trim().substring(12) == "servicenotavailable") {
				app.notify("Login", "Web service is not available (it doesn't exist or might be disabled)");
				return false;
			}
			this.token = null;
			// this.tokenExaport = "7b13b05e668b1118711d42b5a898a616";
		} else if (!json) {
			app.notify(L.s("webservice_moodletimeout"), L.s("webservice_noconnection"));
			return false;
		} else {
			this.tokenExaport = json.token;
		}

		// exacompservices
		data = "username=" + username + "&password=" + password + "&service=exacompservices";
		json = wsc.getJson(url, data);
		if (json.error) {
			app.debug("Json: " + JSON.stringify(json), 2);
			app.debug("Token error: " + json.error + "\n" + json.debuginfo.trim().substring(12));
			if (json.debuginfo.trim().substring(12) == "usernamenotfound") {
				app.notify("Login", "Benutzername oder Passwort Falsch");
				return false;
			} else if (json.debuginfo.trim().substring(12) == "servicenotavailable") {
				app.notify("Login", "Web service is not available (it doesn't exist or might be disabled)");
				return false;
			}
			this.token = null;
			// this.tokenExacomp = "4aafa2c09ae274e7d2c1a6f2b968872e";
		} else if (!json) {
			app.notify(L.s("webservice_moodletimeout"), L.s("webservice_noconnection"));
			return false;
		} else {
			this.tokenExacomp = json.token;
		}
		app.debug("Moodle token: " + gtnMoodle.token + "\nExaport token: " + gtnMoodle.tokenExaport + "\nExacomp token: " + gtnMoodle.tokenExacomp, 2);
		return true;
	},
	checkMoodleConnectivity : function() {
		app.debug("getMoodle.checkMoodleConnectivity()", 2);
		if (wsc.isConnected(gtnMoodle.moodleUrl + gtnMoodle.keepAlive))
			return true;
		else
			return false;

	},
	getMoodleXml : function(wsfuction, token, data) {
		app.debug("getMoodleXml(" + wsfuction + ", " + token + ", " + data + ")", 2);
		if (!data) {
			data = "";
		}
		var xml = wsc.getXml(this.moodleUrl + this.webServiceUrl, "&wstoken=" + token + "&wsfunction=" + wsfuction + data);
		if (xml) {
			app.debug("xml: " + new XMLSerializer().serializeToString(xml), 2);
			return xml;
		} else {
			app.notify(L.s("webservice_moodletimeout"), L.s("webservice_noconnection"));
			//$(location).attr('href', 'start.html');
			return false;
		}
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