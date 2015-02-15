var http = require('http');
var fs = require('fs');
// custom imports
var actions = require('./actions.js');

var board = {};
var hands = {};
var phases = { 0: "Draw",
               1: "Summon",
               2: "Play Event Cards",
               3: "Movement",
               4: "Attack",
               5: "Build Magic"
             };
var gameState = { "tocken"     : null,
                  "phasesList" : phases,
                  "roll"       : [],
                  "rollFor"    : {},
                  "players"    : [],
                  "board"      : board,
                  "hands"      : hands,
                  "phase"      : 0,
                  "turn"       : 0
                };

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str){
        return this.slice(0, str.length) == str;
    };
}

// attach the .equals method to Array's prototype to call it on any array
Object.prototype.equals = function(object2) {
    //For the first loop, we only check for types
    for (propName in this) {
        //Check for inherited methods and properties - like .equals itself
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
        //Return false if the return value is different
        if (this.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
            return false;
        }
        //Check instance type
        else if (typeof this[propName] != typeof object2[propName]) {
            //Different types => not equal
            return false;
        }
    }
    //Now a deeper check using other objects property names
    for(propName in object2) {
        //We must check instances anyway, there may be a property that only exists in object2
            //I wonder, if remembering the checked values from the first loop would be faster or not 
        if (this.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
            return false;
        }
        else if (typeof this[propName] != typeof object2[propName]) {
            return false;
        }
        //If the property is inherited, do not check any more (it must be equa if both objects inherit it)
        if(!this.hasOwnProperty(propName))
          continue;

        //Now the detail check and recursion

        //This returns the script back to the array comparing
        /**REQUIRES Array.equals**/
        if (this[propName] instanceof Array && object2[propName] instanceof Array) {
                   // recurse into the nested arrays
           if (!this[propName].equals(object2[propName]))
                        return false;
        }
        else if (this[propName] instanceof Object && object2[propName] instanceof Object) {
                   // recurse into another objects
                   //console.log("Recursing to compare ", this[propName],"with",object2[propName], " both named \""+propName+"\"");
           if (!this[propName].equals(object2[propName]))
                        return false;
        }
        //Normal value comparison for strings and numbers
        else if(this[propName] != object2[propName]) {
           return false;
        }
    }
    //If everything passed, let's say YES
    return true;
}

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
        /**REQUIRES OBJECT COMPARE**/
        else if (this[i] instanceof Object && array[i] instanceof Object) {
        // recurse into another objects
        //console.log("Recursing to compare ", this[propName],"with",object2[propName], " both named \""+propName+"\"");
        if (!this[i].equals(array[i]))
            return false;
        }
        else if (this[i] != array[i]) {
            return false;
        }
    }
    return true;
}

/********************/
/* helper functions */
/********************/
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function buildDeck(deck) {
    var result = [];
    var resourceMap = deck["resourceMap"];
    var startingSetup = deck["position"];
    var deckContent = resourceMap["deck"];

    for (var cardName in deckContent) {
        if (cardName == "equals") continue;
        var amount = deckContent[cardName];
        console.log("buidDeck(): " + cardName + " " + amount);

        for (var i = 0; i < amount; ++i) {
            var logged = false;
            var cardPtr = resourceMap["other"][cardName];

            if (!cardPtr) {
                cardPtr = resourceMap["common"][cardName];
            } else {
                console.log("buidDeck(): card found in 'other' list: " + JSON.stringify(cardPtr));
                logged = true;
            }

            if (!cardPtr) {
                cardPtr = resourceMap["champion"][cardName];
            } else if (!logged) {
                console.log("buidDeck(): card found in 'common' list: " + JSON.stringify(cardPtr));
                logged = true;
            }

            if (!cardPtr) {
                cardPtr = resourceMap["event"][cardName];
            } else if (!logged) {
                console.log("buidDeck(): card found in 'common' list: " + JSON.stringify(cardPtr));
                logged = true;
            }

            if (cardPtr) {
                 if (!logged) console.log("buidDeck(): card found in 'event' list: " + JSON.stringify(cardPtr));
                // deep copy card
                var card = JSON.parse(JSON.stringify(cardPtr));
                result.push(card);
            } else if (!logged) {
                console.log("buidDeck(): card not found : " + cardName + " at " + i + " iteration");
            }
        }
    }

    // remove cards from deck if they are in startingSetup
    var cardsToDelete = [];

    for (var key in startingSetup) {
        var card = startingSetup[key];

        for (var i in result) {
            if (card.equals(result[i]) && cardsToDelete.indexOf(i) === -1) {
                cardsToDelete.push(i);
                break;
            }
        }
    }

    for (var i in cardsToDelete) {
        result.splice(cardsToDelete[i] - i, 1);
    }
    console.log(JSON.stringify(cardsToDelete));
    console.log("########################################");
    console.log("########################################");
    result.forEach(function (card) {
        console.log(JSON.stringify(card));
        console.log("########################################");
    });
    console.log("########################################");
    console.log("########################################");
    // tripple shuffle cards and return
    return shuffle(shuffle(shuffle(result)));
}

function loadDeck(name) {
    var deck = {};
    deck["deckName"] = name;
    deck["position"] = {}; // startup position
    deck["resourceMap"] = JSON.parse(fs.readFileSync("./resources/" + name.toLowerCase() + "/resource_map.json"));

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

    deck["drawCards"] = buildDeck(deck);
    return deck;
}

function rememberUser(uuid) {
    gameState["players"].push(uuid);

    if (gameState["players"].length == 1) {
        board[uuid] = loadDeck("Vargath");
        hands[uuid] = []; // cards on hand
    } else {
        board[uuid] = loadDeck("Benders");
        hands[uuid] = [];
        gameState["tocken"] = gameState["players"][0];
        gameState["turn"] += 1;
    }
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

    if (req.url.startsWith('/action/move')) {
        actions.move(gameState, req.headers["cookie"], data);
    }
    else if (req.url.startsWith('/action/attack')) {
        actions.attack(gameState, req.headers["cookie"], data);
    }
    else if (req.url.startsWith('/action/roll')) {
        actions.roll(gameState, req.headers["cookie"]);
    }
    else if (req.url.startsWith('/action/nextphase')) {
        actions.nextPhase(gameState, req.headers["cookie"]);
    }
    else if (req.url.startsWith('/action/draw')) {
        actions.draw(gameState, req.headers["cookie"]);
    }
    else if (req.url.startsWith('/action/summon')) {
        actions.summon(gameState, req.headers["cookie"], data);
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
        var simpleState = actions.userState(gameState, req.headers["cookie"]);

        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
        res.writeHead(200);
        res.end(JSON.stringify(simpleState));
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
