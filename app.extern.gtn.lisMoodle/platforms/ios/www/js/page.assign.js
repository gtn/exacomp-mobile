$(document).on('pagebeforecreate', '#assign', function(event) {
	app.debug("pagebeforecreate: assign", 3);
	gtnMoodle.init("assign", "assign");
	var contentid = window.localStorage.getItem('data-app-contentid');
	assign.loadAssign(contentid);
	assign.defineEvents();
	initIds();
});
var assign = {
	loadAssign : function(contentid) {
		app.debug("assign.loadAssign(" + contentid + ")", 2);
		$("#assign .app-content").empty();
		data = "&assignid=" + contentid;
		xml = gtnMoodle.getMoodleXml("block_exacomp_get_assign_information", gtnMoodle.tokenExacomp, data);
		$(xml).find('SINGLE').each(function() {
			app.debug("SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});
			var append = "";
			append += '<h1>' + values['title'] + '</h1>';
			append += '<h2>Aufgabe</h2>';
			append += values['intro'];
			append += '<h2>Status</h2>';
			append += '<p>' + values['submissionstatus'] + '</p>';
			append += '<h2>Abgabedatum</h2>';
			append += '<p>' + date('F j, Y, g:i a', values['deadline']) + '</p>';

			if (parseInt(values['onlinetextenabled'])) {
				append += '<div data-role="fieldcontain">';
				append += '<label for="txtText">Abgabetext</label>';
				append += '<textarea cols="40" rows="8" name="txtText" id="txtText">' + values['onlinetext'] + '</textarea>';
			}
			if (parseInt(values['fileenabled'])) {
				append += '<h2>Datei</h2>';
				append += '<p id="pFilename">' + values['filename'] + '</p>';
				append += '<p>' + values['file'] + '</p>';
				append += '<input id="btnSelectFromSavedPhotoAlbum" type="button" value="Foto aus Album">';
				append += '<input id="btnTakePhoto" type="button" value="Foto aufnehmen">';
				append += '<input id="btnSelectFromPhotoLibrary" type="button" value="Foto aus Bibliothek">';
			}
			if (parseInt(values['submissionenabled'])) {
				append += '<input id="btnUpload" type="button" value="Upload Photo">';
				append += '<input id="btnSubmit" type="button" value="Abgeben">';
			}
			$("#assign").append(append);
		});
	},
	saveAssign : function(assignid, onlinetext, filename) {
		app.debug("assign.saveAssign(" + assignid + ", " + onlinetext + ", " + filename + ")", 2);
		var success = null;
		data = "&assignid=" + assignid + "&onlinetext=" + onlinetext + "&filename=" + filename;
		xml = gtnMoodle.getMoodleXml("block_exacomp_update_assign_submission", gtnMoodle.tokenExacomp, data);
		$(xml).find('SINGLE').each(function() {
			app.debug("SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});
			app.debug("Success udate assign: " + values['success'], 2);
			app.notify("Aufgabe", "Die Aufgabe wurde erfolgreich geändert.");
		});
	},
	uploadPhoto : function() {
		nativeUpload.uploadPhoto(window.localStorage.getItem('data-app-imageurl'));
	},
	defineEvents : function() {
		app.debug("assign.defineEvents()", 2);
		$('#assign #btnTakePhoto').on('click', function() {
			app.debug("on btn click: upload", 2)
			nativeCamera.takePhoto();
		});
		$('#assign #btnSelectFromSavedPhotoAlbum').on('click', function() {
			app.debug("on btn click: selectFromSavedPhotoAlbum", 2)
			nativeCamera.selectFromSavedPhotoAlbum();
		});
		$('#assign #btnSelectFromPhotoLibrary').on('click', function() {
			app.debug("on btn click: selectFromPhotoLibrary", 2)
			nativeCamera.selectFromPhotoLibrary();
		});
		$('#assign #btnSubmit').on('click', function() {
			var filename = $('#assign #pFilename').text();
			var onlinetext = $('#assign #txtText').val();
			var assignid = window.localStorage.getItem('data-app-contentid');
			assign.saveAssign(assignid, onlinetext, filename);
		});

		$('#assign #btnUpload').on('click', function() {
			assign.uploadPhoto();
			$('#assign #pFilename').text(window.localStorage.getItem('data-app-photofilename'));
		});
	}
};