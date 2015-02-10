var http = require('http');
var fs = require('fs');

var counter = 0;
var users = {};
var benders = {"deckName": "Benders",
               "position":[ //left-bottom 0,0
						["controller",	0, 0], //name, x, y
						["deceiver", 	2, 0],
						["summoner",	3, 0],
						["controller",	3, 1],
						["wall",		3, 2],
						["deceiver",	4, 1]
					]
              };
var vargath = {"deckName": "Vargath",
              "position":[ //left-bottom 0,0
						["warrior", 0, 3], //name, x, y
						["brute", 	1, 1],
						["wall",	2, 2],
						["summoner",3, 1],
						["rusher",	3, 3],
						["warrior", 4, 2]
					]
              };
var state = [benders, vargath];

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
    users[uuid] = counter++;
    console.log("current state: " + users);
}

function processGet(req, res) {
    if (req.url.startsWith('/action')) {
        console.log(JSON.stringify(state));
        console.log("###########");

        var simplestate = [];
        if (users[req.headers["cookie"]]%2 == 0) {
            simplestate = state;
        } else {
            simplestate.push(state[1]);
            simplestate.push(state[0]);
        }

        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
        res.writeHead(200);
        res.end(JSON.stringify(simplestate));
    } else {
        console.log(JSON.stringify(state));
        console.log("###########");

        var newUser;
        if (!req.headers["cookie"]) {
            newUser = newUUID();
            rememberUser(newUser);
            res.setHeader("Set-Cookie", newUser);
        } else {
            newUser = req.headers["cookie"];
        }

        if (state.length < 2) {
            rememberUser(newUser);
        }

        var resource = req.url.length > 1?'.'+req.url:'./index.html' ;
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
}).listen(1337, '0.0.0.0');
console.log('Server running at http://127.0.0.1:1337/');
