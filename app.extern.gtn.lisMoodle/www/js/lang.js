var language = {
	currentLang : "deu",
	dictionary : null,
	loadLanguage : function(lang) {
		app.debug("lang.loadLanguage(" + lang + ")", 2);
		var langUri = "../lang/lang." + lang + ".json";
		$.ajax({
			dataType : "json",
			url : langUri,
			async : false,
			success : function(json) {
				app.debug("Langugae successfully loaded", 2);
				app.debug("Language:" + JSON.stringify(json), 1);
				language.dictionary = json;
			},
			error : function() {
				app.debug("Error loading language: " + langUri);
			}
		});
	},
	s : function(id, lang) {
		if (!language.dictionary)
			language.loadLanguage(language.currentLang);
		if (app.doDebuging == "true") {
			return id + ": " + language.dictionary[id];
		} else {
			return language.dictionary[id];
		}
	}
};