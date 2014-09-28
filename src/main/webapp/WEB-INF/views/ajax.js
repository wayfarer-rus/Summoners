function ajaxPost(url, data) {
	var xhr = (window.ActiveXObject) ? new ActiveXObject("Microsoft.XMLHTTP")
									 : (XMLHttpRequest && new XMLHttpRequest()) || null;

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			try {
				//just nothing
			}
			catch (error) {
				alert('Error...');
			}
		}
	}

	xhr.open('POST', url, false);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	
	xhr.setRequestHeader("Content-length", data.length);
	xhr.send(data);
}

function ajaxGet(url, callback) {
	var xhr = (window.ActiveXObject) ? new ActiveXObject("Microsoft.XMLHTTP")
									 : (XMLHttpRequest && new XMLHttpRequest()) || null;

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			try {
				callback(xhr.responseText);

			}
			catch (error) {
				alert('Error...' + error);
			}
		}
	}

	xhr.open('GET', url, true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.send();
}