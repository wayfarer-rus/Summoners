function ajaxPost(url, data) {
    var xhr = (window.ActiveXObject) ? new ActiveXObject("Microsoft.XMLHTTP")
        : (XMLHttpRequest && new XMLHttpRequest()) || null;

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            try {
                //just nothing

            }
            catch (error) {
                alert('Что-то пошло не так...');
            }
        }
    }

    xhr.open('POST', url, false);
    //xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Content-type', 'text/html');
    xhr.setRequestHeader("Content-length", data.length > 0?data.length:0);
    xhr.send(data);
};


function ajaxGet(url, callback) {
    var xhr = (window.ActiveXObject) ? new ActiveXObject("Microsoft.XMLHTTP")
        : (XMLHttpRequest && new XMLHttpRequest()) || null;

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            try {
                callback(xhr.responseText);

            }
            catch (error) {
                // alert('Что-то пошло не так...' + error);
            }
        }
    }

    xhr.open('GET', url, false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
};
