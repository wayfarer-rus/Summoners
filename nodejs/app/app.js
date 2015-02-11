var http = require('http');
var fs = require('fs');

var counter = 0;
var users = {};
var benders = {"deckName": "Benders",
               "position":[ //left-bottom 0,0
                        ["controller",	0, 0], //name, x, y
                        ["deceiver",    2, 0],
                        ["summoner",	3, 0],
                        ["controller",	3, 1],
                        ["wall",		3, 2],
                        ["deceiver",	4, 1]
                    ]
              };
var vargath = {"deckName": "Vargath",
              "position":[ //left-bottom 0,0
                        ["warrior", 0, 3], //name, x, y
                        ["brute",   1, 1],
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

// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}

/********************/
/* helper functions */
/********************/
function rememberUser(uuid) {
    users[uuid] = counter++;
}

function newUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
}

/*****************************/
/* main processing functions */
/*****************************/
function processActionPost(req, data) {
    if (req.url.startsWith('/action/move')) {
        state.forEach(function(player) {
            player['position'].forEach(function(card, i, cards) {
                console.log("Checking that '" + JSON.stringify(data[0]) + "' == '" + JSON.stringify(card) + "':");
                if (card.equals(data[0])) {
                    console.log("equal. Returning " + JSON.stringify(data[1]));
                    cards[i] = data[1];
                }
            });
        });
    }
}

function processPost(request) {
    //get data from post
    var body = '';
    request.on('data', function (data) {
        body += data;

        // Too much POST data, kill the connection!
        if (body.length > 1e6)
            request.connection.destroy();
    });
    request.on('end', function () {
        // data received. continue processing
        if (request.url.startsWith('/action')) {
            // print incoming json
            var data = JSON.parse(body.toString());
            data.forEach(function(elem) {
                console.log(elem);
            });
            processActionPost(request, data);
        }
    });
}

function processActionGet(req, res) {
    if (req.url.startsWith('/action/state')) {
        console.log(JSON.stringify(users));
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
    }
}

function processGet(req, res) {
    if (req.url.startsWith('/action')) {
        processActionGet(req, res);
    } else {
        //check that this is a new user
        var newUser;
        if (!req.headers["cookie"]) {
            newUser = newUUID();
            rememberUser(newUser);
            res.setHeader("Set-Cookie", newUser);
        } else {
            newUser = req.headers["cookie"];
        }

        if (!(newUser in users)) {
            rememberUser(newUser);
        }
        // return file for each other request
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
