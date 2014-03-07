var nativeUpload = {
	uploadPhoto : function(photoUri) {
		var fileName = "mobilePhoto_" + Math.floor((Math.random() * 100000000) + 1) + ".jpg"
		window.localStorage.setItem('data-app-photofilename', fileName);
		var options = new FileUploadOptions();
		options.fileKey = "file_box";
		options.fileName = fileName;
		options.mimeType = "image/jpeg";
		var params = {};
		params.token = gtnMoodle.token;
		params.filepath = "/";
		options.params = params;
		var ft = new FileTransfer();
		
		// dirty dirty dirty
		if (photoUri.substring(0, 21) == "content://com.android") {
			photo_split = photoUri.split("%3A");
			photoUri = "content://media/external/images/media/" + photo_split[1];
		}
		ft.upload(photoUri, encodeURI(gtnMoodle.moodleUrl + gtnMoodle.uploadUrl), nativeUpload.uploadPhotoSuccess, nativeUpload.uploadPhotoFail, options);
	},
	uploadPhotoFail : function(fileTransferError) {
		alert("Upload failed");
		window.localStorage.setItem('data-app-photoupload', 'true');
		//alert("An error has occurred: Code = " + fileTransferError.code);
		//alert("upload error source " + fileTransferError.source);
		//alert("upload error target " + fileTransferError.target);

	},
	uploadPhotoSuccess : function(fileUploadResult) {
		alert("Photo uploaded");
		window.localStorage.setItem('data-app-photoupload', 'false');
		//alert("Code = " + fileUploadResult.responseCode);
		//alert("Response = " + fileUploadResult.response);
		//alert("Sent = " + fileUploadResult.bytesSent);

	}

};