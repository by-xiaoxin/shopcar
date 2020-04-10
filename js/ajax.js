(function() {
	var xhr;
	if(XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var ajax = {
		get: function(url, callBack) {
			xhr.onreadystatechange = function() {
				if(xhr.status == 200 && xhr.readyState == 4) {
					var str = xhr.responseText;
					var json = JSON.parse(str);
					if(callBack) {
						callBack(json);
					} 
				}
			}
			xhr.open("GET", url, true);
			xhr.send();
		}
	}
	window.zxXhr = ajax;
})();
