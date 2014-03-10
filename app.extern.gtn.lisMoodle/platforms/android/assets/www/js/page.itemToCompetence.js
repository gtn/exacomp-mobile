$(document).on('pagebeforecreate', '#itemToCompetence', function(event) {
	app.debug("itemToCompetence: itemToCompetence", 3);
	gtnMoodle.init("itemToCompetence", "itemToCompetence");
	initIds();
});

var itemToCompetence = {
	loaditemToCompetence : function() {
	},
	defineEvents : function() {
	}
};
