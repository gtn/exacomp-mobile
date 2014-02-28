var webServiceUrl = "http://gtn02.gtn-solutions.com/moodlelis/blocks/exaport/epop.php";

function getToken(username, password) {
	var token = 0;
	var rc = 99;
	var data = "action=login&username=" + username + "&password=" + password;
	$.ajax({
		type : "post",
		url : webServiceUrl,
		async : false,
		data : data,
		timeout : 10000,
		success : function(data) {
			var split = data.split("=");
			token = split[1];
			window.localStorage.setItem("token", token);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			rc = -2;
		},
		complete : function(data) {
			if (token != 0) {
				rc = 1;
			} else {
				rc = -1;
			}
		}
	});
	return rc;
}

function logout(){
	window.localStorage.setItem("token", 0);
	window.location.href = "login.html";
}

function getXML(serviceName, data) {
	var XML = "";
	var token = window.localStorage.getItem("token");
	var rc = 99;

	$.ajax({
		type : "post",
		dataType : "xml",
		url : webServiceUrl,
		async : false,
		data : data,
		timeout : 10000,
		success : function(data) {
			;
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