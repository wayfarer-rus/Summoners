function nextPlayer(gameState, uuid) {
    if (gameState["players"].length > 0 && gameState["players"].indexOf(uuid) !== -1) {
        return gameState["players"][((gameState["players"].indexOf(uuid)+1)%gameState["players"].length)];
    }

    return null;
}


function move(gameState, playerUUID, data) {
    if (data.length == 2 &&
        gameState["phase"] === 3) // current phase should be movement phase
    {
        Object.keys(gameState["board"]).forEach(function(key) {
            var deck = gameState["board"][key];
            for (var posStr in deck['position']) {
                var pos = posStr.split(',');
                var cardInfo = deck['position'][posStr];
                console.log("Checking that '" + JSON.stringify(data[0]) + "' == '" + JSON.stringify(pos) + "':");
                if (key == playerUUID && pos.equals(data[0])) {
                    console.log("equal. Returning " + JSON.stringify(data[1]));
                    var cardInfo = deck['position'][data[1]] = cardInfo;
                    delete deck['position'][posStr];
                }
            }
        });
    }
}

function attack(gameState, playerUUID, data) {
    if (data.length == 2 &&
        gameState["phase"] === 4) // current phase should be attack phase
    {
        var who = null;
        for (var posStr in (gameState["board"][playerUUID]["position"])) {
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
            gameState["roll"].push(playerUUID);
            gameState["rollFor"][playerUUID] = ["attack", who, whom];
        }
    }
}

function roll(gameState, playerUUID) {
    var rollFor = gameState["rollFor"][playerUUID];
    var index = gameState["roll"].indexOf(playerUUID);

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
        delete gameState["rollFor"][playerUUID];
    }
}

function draw(gameState, playerUUID) {
    if (gameState["phase"] === 0) {
        var maxCardsOnHand = 5;
        var hand = gameState["hands"][playerUUID];

        if (!hand) hand = [];

        while (hand && hand.length < maxCardsOnHand) {
            hand.push(gameState["board"][playerUUID]["drawCards"].pop());
        }
    }
}

function summon(gameState, playerUUID, data) {
    if (gameState["phase"] !== 1 || !data || data.length < 2) {
        return;
    }

    var cardIndexOnHand = data[0];
    var pos = data[1];
    var hand = gameState["hands"][playerUUID];

    if (hand && hand[cardIndexOnHand]) {
        var card = hand[cardIndexOnHand];
        hand.splice(cardIndexOnHand,1);
        var deck = gameState["board"][playerUUID];

        if (deck && deck["position"]) {
            deck["position"][pos] = card;
        }
    }
}

function nextPhase(gameState, playerUUID) {
    var phases = gameState["phasesList"];
    if (gameState["phase"] === (Object.keys(phases).length - 1)) {
        // next turn
        gameState["phase"] = 0;
        gameState["tocken"] = nextPlayer(gameState, playerUUID);
    } else {
        gameState["phase"] += 1;
    }
}

function gameStateToUserState(gameState, playerUUID) {
    var phases = gameState["phasesList"];
    console.log(JSON.stringify(gameState));
    console.log("###########");
    var userState = {};
    var simpleBoard = [];

    // push this player's side of the board
    simpleBoard.push(gameState["board"][playerUUID]);
    // push other player's side of the board
    Object.keys(gameState["board"]).forEach(function(key){
        if (key != playerUUID) {
            simpleBoard.push(gameState["board"][key]);
        }
    });

    userState["board"] = simpleBoard;
    userState["phase"] = phases[gameState["phase"]];

    if (playerUUID == gameState["tocken"]) {
        userState["tocken"] = true;
    } else {
        userState["tocken"] = false;
    }

    if (gameState["roll"].indexOf(playerUUID) !== -1) {
        userState["roll"] = true;
    } else {
        userState["roll"] = false;
    }

    userState["hand"] = gameState["hands"][playerUUID];

    if (gameState["hands"][playerUUID])
        userState["drawCount"] = gameState["board"][playerUUID]["drawCards"].length;

    return userState;
}

module.exports = {
    move     : move,
    attack   : attack,
    roll     : roll,
    nextPhase: nextPhase,
    draw     : draw,
    userState: gameStateToUserState,
    summon   : summon
}
