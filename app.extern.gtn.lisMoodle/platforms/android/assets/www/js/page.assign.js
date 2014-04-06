$(document).on('pagebeforecreate', '#assign', function(event) {
	app.debug("pagebeforecreate: assign", 3);
	gtnMoodle.init("assign", L.s("page_assign"));
	var contentid = window.localStorage.getItem('data-app-contentid');
	assign.loadAssign(contentid);

	page.initPage("assign");
	assign.defineEvents();
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
			// append += '<h1>' + values['title'] + '</h1>';
			append += '<h2>Aufgabe</h2>';
			append += '<p>' + values['intro'] + '</p>';
			append += '<p><b>Status: </b>' + values['submissionstatus'] + '</p>';
			// append += '<h2>Abgabedatum</h2>';
			append += '<p>Abgabedatum: ' + date('F j, Y, g:i a', values['deadline']) + '</p>';

			if (parseInt(values['onlinetextenabled'])) {
				append += '<div data-role="fieldcontain">';
				append += '<label for="txtText">Abgabetext</label>';
				append += '<textarea cols="40" rows="8" name="txtText" id="txtText">' + values['onlinetext'] + '</textarea>';
			}
			if (parseInt(values['fileenabled'])) {
				append += '<p><b>Datei:</b></p>';
				append += '<p id="pFilename">' + values['filename'] + '</p>';
				append += '<p>' + values['file'] + '</p>';
				append += '<a class="ui-btn ui-btn-exalis ui-corner-all exalis_menue_button ui-icon-action ui-btn-icon-left" id="btnSelectFromSavedPhotoAlbum" >Foto aus Album</a>';
				append += '<a class="ui-btn ui-btn-exalis ui-corner-all exalis_menue_button ui-icon-camera ui-btn-icon-left" id="btnTakePhoto" type="button" >Foto aufnehmen</a>';
				append += '<a class="ui-btn ui-btn-exalis ui-corner-all exalis_menue_button ui-icon-action ui-btn-icon-left" id="btnSelectFromPhotoLibrary" >Foto aus Bibliothek</a>';
			}
			if (parseInt(values['submissionenabled'])) {
				append += '<a class="ui-btn ui-btn-exalis ui-corner-all exalis_menue_button ui-icon-check ui-btn-icon-left" id="btnUpload" type="button" value="Upload Photo">Upload Photo</a>';
				append += '<a class="ui-btn ui-btn-exalis ui-corner-all exalis_menue_button ui-icon-check ui-btn-icon-left" id="btnSubmit" type="button" value="Abgeben">Abgeben</a>';
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
			app.notify(L.s("notify_assign_title"), L.s("notify_assign_text"));

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