$(document).on('pagebeforecreate', '#portfolioEditItem', function(event) {
	app.debug("pagebeforecreate: portfolioEditItem", 3);
	gtnMoodle.init("portfolioEditItem", "portfolioEditItem");

	portfolioEditItem.loadPortfolioEditItem();
	portfolioEditItem.defineEvents();
	page.initPage("portfolioEditItem");
});

var portfolioEditItem = {
	loadPortfolioEditItem : function() {
		app.debug("portfolioEditItem.loadPortfolioEditItem()");
		$("#portfolioEditItem .app-portfolioEditItem").empty();
		if (window.localStorage.getItem('data-app-portfoliotype').trim() == "category") {
			data = "&categoryid=" + window.localStorage.getItem('data-app-portfolioid');
			xml = gtnMoodle.getMoodleXml("block_exaport_get_category", gtnMoodle.tokenExaport, data);
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
				append += '<label for="txtName">Name:</label>';
				append += '<input name="txtName" id="txtName" value="' + values['name'] + '" type="text">';
				append += '<input id="btnSubmit" type="button" value="Update item">';
				$("#portfolioEditItem .app-portfolioEditItem").append(append);
			});
		} else {
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
					append += '<label for="txtName">Name:</label>';
					append += '<input name="txtName" id="txtName" value="' + values['name'] + '" type="text">';
					append += '<label for="txtIntro">Beschreibung:</label>';
					append += '<input name="txtIntro" id="txtIntro" value="' + values['intro'] + '" type="text">';
					append += '';
				}
				if (values['type'].trim() == "file") {
					append += '<label for="txtName">Name:</label>';
					append += '<input name="txtName" id="txtName" value="' + values['name'] + '" type="text">';
					append += '<label for="txtIntro">Beschreibung:</label>';
					append += '<input name="txtIntro" id="txtIntro" value="' + values['intro'] + '" type="text">';
					append += '<h2>Datei:</h2>';
					append += '<p id="pFilename">' + values['filename'] + '</p>';
					append += '<p>' + values['file'] + '</p>';
					append += '<input id="btnSelectFromSavedPhotoAlbum" type="button" value="Foto aus Album">';
					append += '<input id="btnTakePhoto" type="button" value="Foto aufnehmen">';
					append += '<input id="btnSelectFromPhotoLibrary" type="button" value="Foto aus Bibliothek">';
					append += '<input id="btnUpload" type="button" value="Upload Photo">';
				}
				if (values['type'].trim() == "link") {
					append += '<label for="txtName">Name:</label>';
					append += '<input name="txtName" id="txtName" value="' + values['name'] + '" type="text">';
					append += '<label for="txtIntro">Beschreibung:</label>';
					append += '<input name="txtIntro" id="txtIntro" value="' + values['intro'] + '" type="text">';
					append += '<label for="txtLink">Link:</label>';
					append += '<input name="txtLink" id="txtLink" value="' + values['url'] + '" type="text">';
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
		}
	},
	uploadPhoto : function() {
		nativeUpload.uploadPhoto(window.localStorage.getItem('data-app-imageurl'));
	},
	updateItem : function(id, title, url, intro, filename, type) {
		app.debug("portfolioEditItem.updateItem(" + id + ", " + title + ", " + url + ", " + intro + ", " + filename + ", " + type + ")");
		var success = null;
		data = "&id=" + id + "&title=" + title + "&url=" + url + "&intro=" + intro + "&filename=" + filename + "&type=" + type;
		app.debug(data, 2);
		xml = gtnMoodle.getMoodleXml("block_exaport_update_item", gtnMoodle.tokenExaport, data);
		$(xml).find('SINGLE').each(function() {
			app.debug("SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});
			app.debug("Success update portfolioitem: " + values['success'], 2);
			app.notify("Aufgabe", "Item erfolgreich ge�ndert.");
		});
		return success;
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

			var id = window.localStorage.getItem('data-app-portfolioid');
			var title = $('#portfolioEditItem #txtName').val();
			var url = $('#portfolioEditItem #txtLink').val();
			var intro = $('#portfolioEditItem #txtIntro').val();
			var filename = $('#portfolioEditItem #pFilename').text();
			var type = window.localStorage.getItem('data-app-portfoliotype');
			if (type.trim() == "category") {
				app.notify("title", "Noch nicht implementiert f�r Kategorie");
			} else {
				portfolioEditItem.updateItem(id, title, url, intro, filename, type);
			}
		});

		$('#portfolioEditItem #btnUpload').on('click', function() {
			portfolioEditItem.uploadPhoto();
			$('#assign #pFilename').text(window.localStorage.getItem('data-app-photofilename'));
		});
	}
};
