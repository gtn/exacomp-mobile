var nativeCamera = {
	takePhoto : function() {
		navigator.camera.getPicture(nativeCamera.receivedImageUri, nativeCamera.cameraFailed, {
			quality : 50,
			destinationType : Camera.DestinationType.FILE_URI,
			sourceType : Camera.PictureSourceType.CAMERA,
			encodingType : Camera.EncodingType.JPEG,
			saveToPhotoAlbum : true
		});
	},
	selectFromPhotoLibrary : function() {
		navigator.camera.getPicture(nativeCamera.receivedImageUri, nativeCamera.cameraFailed, {
			quality : 50,
			destinationType : Camera.DestinationType.FILE_URI,
			sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
			encodingType : Camera.EncodingType.JPEG,
			saveToPhotoAlbum : true
		});
	},
	selectFromSavedPhotoAlbum : function() {
		navigator.camera.getPicture(nativeCamera.receivedImageUri, nativeCamera.cameraFailed, {
			quality : 50,
			destinationType : Camera.DestinationType.FILE_URI,
			sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM,
			encodingType : Camera.EncodingType.JPEG,
			saveToPhotoAlbum : true
		});
	},
	receivedImageUri : function(imageUri) {
		window.localStorage.setItem('data-app-imageurl', imageUri);
		window.localStorage.setItem('data-app-imagename', imageUri.substr(imageUri.lastIndexOf('/') + 1));
	},
	cameraFailed : function(message) {
		app.notify("Camera", 'Failed because: ' + message);
	}
};
