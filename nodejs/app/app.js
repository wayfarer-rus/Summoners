var http = require('http');
var fs = require('fs');

var state = [];

if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
  };
}

function newUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
}

function processPost(request) {
    var body = '';
    request.on('data', function (data) {
        body += data;

        // Too much POST data, kill the connection!
        if (body.length > 1e6)
            request.connection.destroy();
    });
    request.on('end', function () {
        if (request.url.startsWith('/action')) {
            var data = JSON.parse(body.toString());
            console.log(data);
        }
    });
}

function rememberUser(uuid) {
    state.push(uuid);
    console.log("current state: " + state);
}

function processGet(req, res) {
    if (req.url.startsWith('/action')) {
        console.log("action get");
    } else {
        console.log(req.headers);
        console.log("###########");

        if (!req.headers["cookie"]) {
            var newUser = newUUID();
            rememberUser(newUser);
            res.setHeader("Set-Cookie", newUser);
        }

        var resource = req.url.length > 1?'.'+req.url:'./debug.html' ;
        fs.readFile(resource, function (err, data) {
            if (err) {
                res.writeHead(404);
                res.end('Not found' + err);
            }

            res.end(data);
        });
    }
}

http.createServer(function (req, res) {
    if (req.method == 'POST') {
        console.log("POST request on: " + req.url);
        processPost(req);
        res.writeHead(200);
        res.end("Ok");
    }
    else if (req.method == 'GET') {
        console.log("GET request on: " + req.url);
        processGet(req, res);
    }
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
