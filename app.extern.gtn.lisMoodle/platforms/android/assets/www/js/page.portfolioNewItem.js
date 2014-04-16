$(document).on('pagebeforecreate', '#portfolioNewItem', function(event) {
	app.debug("pagebeforecreate: portfolioNewItem", 3);
	gtnMoodle.init("portfolioNewItem", L.s("portfolio_new_" + window.localStorage.getItem('data-app-portfoliotype')));

	var vars = [], hash;
	var q = document.URL.split('?')[1];
	if (q != undefined) {
		q = q.split('&');
		for ( var i = 0; i < q.length; i++) {
			hash = q[i].split('=');
			vars[hash[0]] = hash[1];
		}
	}

	//app.doDebuging = "true";
	app.debug("Image: " + vars['image'], 2);
	// alert(vars['image']);
	var isAndroid = false;
	if (vars['image'] != undefined) {
		window.localStorage.setItem('data-app-imageurl', vars['image']);
		window.localStorage.setItem('data-app-imagename', vars['image'].substr(vars['image'].lastIndexOf('/') + 1));
		window.localStorage.setItem('data-app-portfolioid', 0);
		window.localStorage.setItem('data-app-portfoliotype', 'file');
		isAndroid = true;
	}

	if (!window.localStorage.getItem('data-app-portfoliotype')) {
		window.localStorage.setItem('data-app-portfoliotype', 'file');
	}

	portfolioNewItem.loadportfolioNewItem(isAndroid);
	portfolioNewItem.defineEvents();
	page.initPage("portfolioNewItem");
});

var portfolioNewItem = {
	loadportfolioNewItem : function(isAndroid) {
		app.debug("portfolioNewItem.loadportfolioNewItem()");
		$("#portfolioNewItem .app-portfolioNewItem").empty();
		var append = '';
		append += '<h2>Typ: ' + L.s("portfolio_type_" + window.localStorage.getItem('data-app-portfoliotype')) + '</h2>';
		if (window.localStorage.getItem('data-app-portfoliotype').trim() == "note") {
			append += '<label for="txtName">Name:</label>';
			append += '<input name="txtName" id="txtName" value="" type="text">';
			append += '<label for="txtIntro">Beschreibung:</label>';
			append += '<input name="txtIntro" id="txtIntro" value="" type="text">';
			append += '';
		}
		if (window.localStorage.getItem('data-app-portfoliotype').trim() == "file") {
			append += '<label for="txtName">Name:</label>';
			append += '<input name="txtName" id="txtName" value="" type="text">';
			append += '<label for="txtIntro">Beschreibung:</label>';
			append += '<input name="txtIntro" id="txtIntro" value="" type="text">';
			append += '<h2>Datei:</h2>';
			append += '<p id="pFilename"></p>';
			append += '<img style="width:100%;" alt="" id="pFile" src="" />';
			append += '<p>Filename</p>';
			append += '<input id="btnSelectFromSavedPhotoAlbum" type="button" value="Foto aus Album">';
			append += '<input id="btnTakePhoto" type="button" value="Foto aufnehmen">';
			append += '<input id="btnSelectFromPhotoLibrary" type="button" value="Foto aus Bibliothek">';
			// append += '<input id="btnUpload" type="button" value="Upload
			// Photo">';
		}
		if (window.localStorage.getItem('data-app-portfoliotype').trim() == "link") {
			append += '<label for="txtName">Name:</label>';
			append += '<input name="txtName" id="txtName" value="" type="text">';
			append += '<label for="txtIntro">Beschreibung:</label>';
			append += '<input name="txtIntro" id="txtIntro" value="" type="text">';
			append += '<label for="txtLink">Link:</label>';
			append += '<input name="txtLink" id="txtLink" value="" type="text">';
		}
		if (window.localStorage.getItem('data-app-portfoliotype').trim() == "category") {
			append += '<label for="txtName">Name:</label>';
			append += '<input name="txtName" id="txtName" value="" type="text">';
		}
		append += '<input id="btnSubmit" type="button" value="Speichern">';
		$("#portfolioNewItem .app-portfolioNewItem").append(append);

		// has image from android
		if (isAndroid != undefined && isAndroid) {
			$('#pFile').attr("src", window.localStorage.getItem('data-app-imageurl'));
		} else {
			window.localStorage.setItem('data-app-imageurl', false);
			window.localStorage.setItem('data-app-imagename', false);
		}
	},
	uploadPhoto : function() {
		nativeUpload.uploadPhoto(window.localStorage.getItem('data-app-imageurl'));
	},
	addItem : function(title, categoryid, url, intro, filename, type) {
		app.debug("portfolioNewItem.addItem(" + title + ", " + categoryid + ", " + url + ", " + intro + ", " + filename + ", " + type + ")");
		var success = null;
		data = "&title=" + title + "&categoryid=" + categoryid + "&url=" + url + "&intro=" + intro + "&filename=" + filename + "&type=" + type;
		xml = gtnMoodle.getMoodleXml("block_exaport_add_item", gtnMoodle.tokenExaport, data);
		$(xml).find('SINGLE').each(function() {
			app.debug("SINGLE", 1);
			var values = new Array();
			$(this).find('KEY').each(function() {
				app.debug("SINGLE>KEY", 1);
				var name = $(this).attr('name');
				values[name] = $(this).text();
			});
			app.debug("Success add portfolioitem: " + values['success'], 2);
			success = true;
		});
		return success;
	},

	checkupload : function() {
		portfolioNewItem.waitInSeconds--;
		if (portfolioNewItem.waitInSeconds == 0) {
			window.clearInterval(portfolioNewItem.uploadWaiter);
			app.notify("", "Upload failed... timeout");
			$(location).attr('href', 'portfolioNewItem.html');
		}
		if (window.localStorage.getItem('data-app-photoupload') == "true") {
			window.clearInterval(portfolioNewItem.uploadWaiter);
			app.notify("Upload", "Das Foto wurde hochgeladen.");

			$('#portfolioNewItem #pFilename').text(window.localStorage.getItem('data-app-photofilename'));

			var title = $('#portfolioNewItem #txtName').val();
			var categoryid = window.localStorage.getItem('data-app-portfolioid');
			var url = $('#portfolioNewItem #txtLink').val();
			var intro = $('#portfolioNewItem #txtIntro').val();
			var filename = $('#portfolioNewItem #pFilename').text();
			var type = window.localStorage.getItem('data-app-portfoliotype');
			if (portfolioNewItem.addItem(title, categoryid, url, intro, filename, type)) {
				app.notify(L.s("notify_portfolio_item_add_title"), L.s("notify_portfolio_item_add_text"));
				$(location).attr('href', 'portfolioItems.html');
			} else {
				app.notify("New item", "Unknown failure.");
			}
		}
	},
	uploadWaiter : null,
	waitInSeconds : 60,

	defineEvents : function() {
		$('#portfolioNewItem #btnTakePhoto').on('click', function() {
			app.debug("on btn click: upload", 2)
			nativeCamera.takePhoto();
		});
		$('#portfolioNewItem #btnSelectFromSavedPhotoAlbum').on('click', function() {
			app.debug("on btn click: selectFromSavedPhotoAlbum", 2)
			nativeCamera.selectFromSavedPhotoAlbum();
		});
		$('#portfolioNewItem #btnSelectFromPhotoLibrary').on('click', function() {
			app.debug("on btn click: selectFromPhotoLibrary", 2)
			nativeCamera.selectFromPhotoLibrary();
		});
		$('#portfolioNewItem #btnSubmit').on('click', function() {

			if (window.localStorage.getItem('data-app-imagename').trim() != "false") {
				$.mobile.loading("show", {
					text : "Upload Foto...",
					textVisible : true,
					theme : "a",
					html : ""
				});
				portfolioNewItem.uploadWaiter = window.setInterval("portfolioNewItem.checkupload()", 1000);
				window.localStorage.setItem('data-app-photoupload', 'false');
				portfolioNewItem.uploadPhoto();
			}

			else {

				var title = $('#portfolioNewItem #txtName').val();
				var categoryid = window.localStorage.getItem('data-app-portfolioid');
				var url = $('#portfolioNewItem #txtLink').val();
				var intro = $('#portfolioNewItem #txtIntro').val();
				var filename = $('#portfolioNewItem #pFilename').text();
				var type = window.localStorage.getItem('data-app-portfoliotype');
				if (portfolioNewItem.addItem(title, categoryid, url, intro, filename, type)) {
					app.notify(L.s("notify_portfolio_item_add_title"), L.s("notify_portfolio_item_add_text"));
					$(location).attr('href', 'portfolioItems.html');
				} else {
					app.notify("New item", "Unknown failure.");
				}
			}
		});
	}
};
