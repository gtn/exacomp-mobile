$(document).on('pagebeforecreate', '#portfolioEditItem', function(event) {
	app.debug("pagebeforecreate: portfolioEditItem", 3);
	gtnMoodle.init("portfolioEditItem", "portfolioEditItem");

	portfolioEditItem.loadPortfolioEditItem();
	portfolioEditItem.defineEvents();
	initIds();
});

var portfolioEditItem = {
	loadPortfolioEditItem : function() {
		app.debug("portfolioEditItem.loadPortfolioEditItem()");
		$("#portfolioEditItem .app-portfolioEditItem").empty();
		data = "&itemid=" + window.localStorage.getItem('data-app-portfolioid');
		xml = gtnMoodle.getMoodleXml("block_exaport_get_item", gtnMoodle.tokenExaport, data);
		$(xml).find('SINGLE').each(function() {
			app.debug("SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});
			var append = '';
			append += '<h2>Type: ' + window.localStorage.getItem('data-app-portfoliotype') + '</h2>';
			if (values['type'].trim() == "note") {
				append += '<label for="text-basic">Name:</label>';
				append += '<input name="text-basic" id="text-basic" value="' + values['name'] + '" type="text">';
				append += '<label for="text-basic">Beschreibung:</label>';
				append += '<input name="text-basic" id="text-basic" value="' + values['intro'] + '" type="text">';
				append += '';
			}
			if (values['type'].trim() == "file") {
				append += '<label for="text-basic">Name:</label>';
				append += '<input name="text-basic" id="text-basic" value="' + values['name'] + '" type="text">';
				append += '<label for="text-basic">Beschreibung:</label>';
				append += '<input name="text-basic" id="text-basic" value="' + values['intro'] + '" type="text">';
				append += '<h2>Datei</h2>';
				append += '<p id="pFilename">' + values['filename'] + '</p>';
				append += '<p>' + values['file'] + '</p>';
				append += '<input id="btnSelectFromSavedPhotoAlbum" type="button" value="Foto aus Album">';
				append += '<input id="btnTakePhoto" type="button" value="Foto aufnehmen">';
				append += '<input id="btnSelectFromPhotoLibrary" type="button" value="Foto aus Bibliothek">';
				append += '<input id="btnUpload" type="button" value="Upload Photo">';
			}
			if (values['type'].trim() == "link") {
				append += '<label for="text-basic">Name:</label>';
				append += '<input name="text-basic" id="text-basic" value="' + values['name'] + '" type="text">';
				append += '<label for="text-basic">Beschreibung:</label>';
				append += '<input name="text-basic" id="text-basic" value="' + values['intro'] + '" type="text">';
				append += '<label for="text-basic">Link:</label>';
				append += '<input name="text-basic" id="text-basic" value="' + values['url'] + '" type="text">';
			}
			if (values['type'].trim() == "category") {
				append += '<label for="text-basic">Name:</label>';
				append += '<input name="text-basic" id="text-basic" value="' + values['name'] + '" type="text">';
			}

			append += '';
			append += '';
			append += '';
			append += '';
			append += '';
			append += '';
			append += '<input id="btnSubmit" type="button" value="Update item">';
			$("#portfolioEditItem .app-portfolioEditItem").append(append);
		});
	},
	uploadPhoto : function() {
		nativeUpload.uploadPhoto(window.localStorage.getItem('data-app-imageurl'));
	},
	updateItem : function() {
		;
	},
	defineEvents : function() {
		$('#portfolioEditItem #btnTakePhoto').on('click', function() {
			app.debug("on btn click: upload", 2)
			nativeCamera.takePhoto();
		});
		$('#portfolioEditItem #btnSelectFromSavedPhotoAlbum').on('click', function() {
			app.debug("on btn click: selectFromSavedPhotoAlbum", 2)
			nativeCamera.selectFromSavedPhotoAlbum();
		});
		$('#portfolioEditItem #btnSelectFromPhotoLibrary').on('click', function() {
			app.debug("on btn click: selectFromPhotoLibrary", 2)
			nativeCamera.selectFromPhotoLibrary();
		});
		$('#portfolioEditItem #btnSubmit').on('click', function() {
			var filename = $('#assign #pFilename').text();
			var onlinetext = $('#assign #txtText').val();
			var assignid = window.localStorage.getItem('data-app-contentid');
			assign.saveAssign(assignid, onlinetext, filename);
		});

		$('#portfolioEditItem #btnUpload').on('click', function() {
			portfolioEditItem.uploadPhoto();
			$('#assign #pFilename').text(window.localStorage.getItem('data-app-photofilename'));
		});
	}
};
