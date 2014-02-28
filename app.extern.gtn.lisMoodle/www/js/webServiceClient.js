var wsc = {
	timeout : 10000,
	method : "get",
	getJson : function(url, data) {
		app.debug("wsc.getJson(" + url + ", " + data + ")");
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
				rc = -2;
			},
			complete : function(data) {
				;
			}
		});
		return rc;
	},
	getXml : function(url, data) {
		app.debug("wsc.getXml(" + url + ", " + data + ")");
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
				rc = -2;
			},
			complete : function(data) {
				;
			}
		});
		return rc;
	}
};