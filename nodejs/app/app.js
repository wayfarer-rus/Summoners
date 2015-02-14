var http = require('http');
var fs = require('fs');

var board = {};
var phases = { 0: "pullCarsd",
               1: "eventPhase",
               2: "movementPhase",
               3: "attackPhase",
               4: "buildMagic"
             };
var gameState = { "tocken" : null,
                  "roll"   : [],
                  "rollFor": {},
                  "players": [],
                  "board"  : board,
                  "phase"  : 2
                };

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
function loadDeck(name) {
    var deck = {};
    deck["deckName"] = name;
    deck["position"] = {};
    deck["resourceMap"] =JSON.parse(fs.readFileSync("./resources/" + name.toLowerCase() + "/resource_map.json"));

    for (var i in deck["resourceMap"]["start_setup"]["position"]) {
        console.log("iterating over " + JSON.stringify(elem));
        var elem = deck["resourceMap"]["start_setup"]["position"][i];
        var cardPos =  elem[1];
        var cardInfo = deck["resourceMap"]["common"][elem[0]];
        console.log("card in common " + JSON.stringify(cardInfo));

        if (!cardInfo) {
            cardInfo = deck["resourceMap"]["other"][elem[0]];
            console.log("card in other " + JSON.stringify(cardInfo));
        }

        if (cardInfo) {
            // deep cloning card info
            cardInfo = JSON.parse(JSON.stringify(cardInfo));
            deck["position"][cardPos] = cardInfo;
        }
    }
    return deck;
}

function rememberUser(uuid) {
    gameState["players"].push(uuid);

    if (gameState["players"].length == 1) {
        board[uuid] = loadDeck("Vargath");
    } else {
        board[uuid] = loadDeck("Benders");
        gameState["tocken"] = gameState["players"][0];
    }
}

function nextPlayer(uuid) {
    if (gameState["players"].length > 0 && gameState["players"].indexOf(uuid) !== -1) {
        return gameState["players"][((gameState["players"].indexOf(uuid)+1)%gameState["players"].length)];
    }

    return null;
}

function newUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
}

function inDictValues(dict, value) {
    for (key in Object.keys(dict)) {
        if (dict[key] == value) {
            return true;
        }
    }

    return false;
}

/*****************************/
/* main processing functions */
/*****************************/
function processActionPost(req, data) {
    if (gameState["tocken"] === null || gameState["tocken"] !== req.headers["cookie"]) {
        return;
    }

    if (req.url.startsWith('/action/move') && data.length == 2) {
        Object.keys(gameState["board"]).forEach(function(key) {
            var deck = gameState["board"][key];
            for (var posStr in deck['position']) {
                var pos = posStr.split(',');
                var cardInfo = deck['position'][posStr];
                console.log("Checking that '" + JSON.stringify(data[0]) + "' == '" + JSON.stringify(pos) + "':");
                if (key == req.headers["cookie"] && pos.equals(data[0])) {
                    console.log("equal. Returning " + JSON.stringify(data[1]));
                    var cardInfo = deck['position'][data[1]] = cardInfo;
                    delete deck['position'][posStr];
                }
            }
        });
    }
    else if (req.url.startsWith('/action/attack') && data.length == 2) {
        var who = null;
        for (var posStr in (gameState["board"][req.headers["cookie"]]["position"])) {
            var pos = posStr.split(',');

            if (pos.equals(data[0])) {
                who = pos;
                break;
            }
        }

        var whom = null;
        for (var key in gameState["board"]) {
            var deck = gameState["board"][key];
            console.log(JSON.stringify(deck));
            for (var posStr in deck["position"]) {
                var pos = posStr.split(',');
                console.log(JSON.stringify(pos));
                if (data[1].equals(pos)) {
                    whom = pos;
                }
            }
        }

        if (who != null && whom != null && !who.equals(whom)) {
            console.log(JSON.stringify(who) + " attacks " + JSON.stringify(whom));
            gameState["roll"].push(req.headers["cookie"]);
            gameState["rollFor"][req.headers["cookie"]] = ["attack", who, whom];
        }
    }
    else if (req.url.startsWith('/action/roll')) {
        var rollFor = gameState["rollFor"][req.headers["cookie"]];
        var index = gameState["roll"].indexOf(req.headers["cookie"]);
        if (rollFor && index !== -1) {
            if (rollFor[0] === "attack") {
                for (var key in gameState["board"]) {
                    var deck = gameState["board"][key];

                    for (var posStr in deck["position"]) {
                        var pos = posStr.split(',');

                        if (rollFor[2].equals(pos)) {
                            if (deck["position"][posStr]["dmg"]) {
                                deck["position"][posStr]["dmg"] += 1;
                            } else {
                                deck["position"][posStr]["dmg"] = 1;
                            }

                            if (deck["position"][posStr]["dmg"] >= deck["position"][posStr]["hits"]) {
                                delete deck["position"][posStr];
                            }
                        }
                    }
                }
            }

            gameState["roll"].splice(index, 1);
            delete gameState["rollFor"][req.headers["cookie"]];
        }
    }
    else if (req.url.startsWith('/action/nextphase')) {
        if (gameState["phase"] === 4) {
            // next turn
            gameState["phase"] = 0;
            gameState["tocken"] = nextPlayer(req.headers["cookie"]);
        } else {
            gameState["phase"] += 1;
        }
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
            var data = null;

            if (body.length > 0) {
                data = JSON.parse(body.toString());
                data.forEach(function(elem) {
                    console.log(elem);
                });

            }

            processActionPost(request, data);
        }
    });
}

function processActionGet(req, res) {
    if (req.url.startsWith('/action/state')) {
        console.log(JSON.stringify(gameState));
        console.log("###########");

        var simpleBoard = [];
        simpleBoard.push(gameState["board"][req.headers["cookie"]]);
        Object.keys(gameState["board"]).forEach(function(key){
            if (key != req.headers["cookie"]) {
                simpleBoard.push(gameState["board"][key]);
            }
        });

        var simplestate = {};
        simplestate["board"] = simpleBoard;
        simplestate["phase"] = phases[gameState["phase"]];

        if (req.headers["cookie"] == gameState["tocken"]) {
            simplestate["tocken"] = true;
        } else {
            simplestate["tocken"] = false;
        }

        if (gameState["roll"].indexOf(req.headers["cookie"]) !== -1) {
            simplestate["roll"] = true;
        } else {
            simplestate["roll"] = false;
        }
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
        res.writeHead(200);
        res.end(JSON.stringify(simplestate));
    }
    else {
        res.end();
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
            res.setHeader("Set-Cookie", newUser);
        } else {
            newUser = req.headers["cookie"];
        }

        if (gameState["players"].length < 2 &&
            gameState["players"].indexOf(newUser) == -1)
        {
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
