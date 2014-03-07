var nativeUpload = {
	uploadPhoto : function(photoUri) {
		var fileName = "mobilePhoto_" + Math.floor((Math.random() * 100000000) + 1) + ".jpg"
		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.fileName = fileName;
		options.mimeType = "image/jpeg";
		var params = {};
		params.token = gtnMoodle.token;
		params.filepath = "/";
		options.params = params;
		var ft = new FileTransfer();
		alert(photoUri);
		ft.upload(photoUri, encodeURI("http://gtn.stygs.com/uploadServer.php"), nativeUpload.uploadPhotoSuccess, nativeUpload.uploadPhotoFail, options);
	},
	uploadPhotoFail : function(fileTransferError) {
		alert("Fail");
		window.localStorage.setItem('data-app-photoupload', 'true');
		alert("An error has occurred: Code = " + fileTransferError.code);
		alert("upload error source " + fileTransferError.source);
		alert("upload error target " + fileTransferError.target);

	},
	uploadPhotoSuccess : function(fileUploadResult) {
		alert("win");
		window.localStorage.setItem('data-app-photoupload', 'false');
		alert("Code = " + fileUploadResult.responseCode);
		alert("Response = " + fileUploadResult.response);
		alert("Sent = " + fileUploadResult.bytesSent);

	}

};