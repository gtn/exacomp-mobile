var wsc = {
	timeout : 10000,
	method : "get",
	getJson : function(url, data) {
		app.debug("wsc.getJson(" + url + ", " + data + ")", 3);
		$.ajax({
			type : this.method,
			dataType : "json",
			url : url,
			async : false,
			data : data,
			timeout : this.timeout,
			success : function(data) {
				rc = data;
			},
			error : function(jqXHR, textStatus, errorThrown) {
				rc = false;
			},
			complete : function(data) {
				;
			}
		});
		return rc;
	},
	getXml : function(url, data) {
		app.debug("wsc.getXml(" + url + ", " + data + ")", 3);
		$.ajax({
			type : this.method,
			dataType : "xml",
			url : url,
			async : false,
			data : data,
			timeout : this.timeout,
			success : function(data) {
				rc = data;
			},
			error : function(jqXHR, textStatus, errorThrown) {
				rc = false;
			},
			complete : function(data) {
				;
			}
		});
		return rc;
	},
	isConnected : function(url) {
		app.debug("wsc.isConnected(" + url + ")", 3);
		var rc = null;
		$.ajax({
			type : this.method,
			dataType : "text",
			url : url,
			async : false,
			timeout : 500,
			success : function(data) {
				rc = true;
			},
			error : function(jqXHR, textStatus, errorThrown) {
				rc = false;
			},
			complete : function(data) {
				;
			}
		});
		return rc;
	}
};