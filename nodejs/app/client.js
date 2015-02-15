window.onload = function() {
    var cardWIDTH = 88, cardHEIGHT = 57;
    var sizeStyleText = "width:"+cardWIDTH+"px; height: "+cardHEIGHT+"px;";

    //listeners
    var sendData = document.querySelector("#sendData");
    document.querySelector("#Move").onclick = function(e) {
        ajaxPost('/action/move', sendData.value);
    }
    document.querySelector("#Attack").onclick = function(e) {
        ajaxPost('/action/attack', sendData.value);
    }
    document.querySelector("#Roll").onclick = function(e) {
        ajaxPost('/action/roll', '');
    }
    document.querySelector("#NextPhase").onclick = function(e) {
        ajaxPost('/action/nextphase', '');
    }
    document.querySelector("#Draw").onclick = function(e) {
        ajaxPost('/action/draw', '');
    }
    document.querySelector("#Summon").onclick = function(e) {
        ajaxPost('/action/summon', sendData.value);
    }

    function getDeckFolder(deckName) {
        if (deckName == "Vargath") {
            return "resources/vargath/";
        }
        else {
            return "resources/benders/";
        }
    }
/*
    function drawCardsOnBoard(positions, deckFolder, deck, rotate) {
        for (var key in positions) {
            var pos = key.split(',');
            var unit = positions[key];
            var img = document.createElement("img");
            img.src = deckFolder+unit.src;
            var x = 163;
            var y = 540;

            if (rotate) {
                img.className = "position-absolute rotate_180";
                x += (5 - pos[0]) * (cardWIDTH + 3);
                y -= (7 - pos[1]) * (cardHEIGHT + 4);
            }
            else {
                img.className = "position-absolute";
                x += pos[0] * (cardWIDTH + 3);
                y -= pos[1] * (cardHEIGHT + 4);
            }

            var coordinateStyleText = "left:" +x+ "px;top: " +y+ "px;";
            img.style.cssText =  coordinateStyleText+sizeStyleText;

            table.appendChild(img);
        }
    }
*/
    function drawDmgTockens(canvas, context, unit) {
        var dmg = unit["dmg"];

        if (!dmg) {
            return;
        }

        for (var i = 0; i < dmg; ++i) {
            var centerX = canvas.width - 20;
            var centerY = 16 * (1+i);
            var radius = 8;

            context.beginPath();
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            context.fillStyle = 'red';
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = '#003300';
            context.stroke();
        }
    }

    function redrawDeck(deck, deckFolder, rotate) {
        rotate = typeof rotate !== 'undefined' ? rotate : false;
        drawCardsOnBoard(deck["position"], deckFolder, deck["resourceMap"], rotate);
    }

    function drawCardsOnBoard(positions, deckFolder, deck, rotate) {
        var table = document.querySelector("#table");

        for (var key in positions) {
            var pos = key.split(',');
            var unit = positions[key];
            var canvas = document.createElement("canvas");
            var context = canvas.getContext('2d');
            var x = 163;
            var y = 540;

            if (rotate) {
                canvas.className = "position-absolute rotate_180";
                x += (5 - pos[0]) * (cardWIDTH + 3);
                y -= (7 - pos[1]) * (cardHEIGHT + 4);
            }
            else {
                canvas.className = "position-absolute";
                x += pos[0] * (cardWIDTH + 3);
                y -= pos[1] * (cardHEIGHT + 4);
            }

            var coordinateStyleText = "left:" +x+ "px;top: " +y+ "px;";
            canvas.style.cssText =  coordinateStyleText+sizeStyleText;

            var img = document.createElement("img");
            img.id = 'card';
            img.src = deckFolder+unit.src;
            context.drawImage(img, 0, 0, canvas.width, canvas.height);

            drawDmgTockens(canvas, context, unit);

            canvas.appendChild(img);
            table.appendChild(canvas);
        }
    }

    function drawHand(hand, deckFolder) {
        if (!hand || hand.length === 0) return;
        var table = document.querySelector("#table");

        for (var i in hand) {
            var img = document.createElement("img");
            img.src = deckFolder + hand[i].src;
            img.className = "position-absolute rotate_90";
            var x = 200 + i*(cardHEIGHT+10);
            var y = 700;
            var coordinateStyleText = "left:" +x+ "px;top: " +y+ "px;";
            img.style.cssText =  coordinateStyleText+sizeStyleText;
            table.appendChild(img);
        }
    }

    function rerender(data) {
        if (!data["board"] || typeof data["board"] === 'undefined') return;

        if (data["board"][0]) {
            var table = document.querySelector("#table");
            var deckFolder = getDeckFolder(data["board"][0].deckName);
            //draw our deck logo
            var img = document.createElement("img");
            img.src = deckFolder + data["board"][0]["resourceMap"].race.logo_src;
            img.className = "position-absolute";
            var x = 171;
            var y = 675 - cardHEIGHT;
            var coordinateStyleText = "left:" +x+ "px;top: " +y+ "px;";
            img.style.cssText =  coordinateStyleText+sizeStyleText;
            table.appendChild(img);
            // draw our side of the board
            redrawDeck(data["board"][0], deckFolder);
            //draw our hand
            drawHand(data["hand"], deckFolder);
        }

        //benders deck logo
        // var img = document.createElement("img");
        // img.src = "resources/benders/"+benders.race.logo_src;
        // img.className = "position-absolute";

        // var x = 613;
        // var y = 91 - cardHEIGHT;

        // var coordinateStyleText = "left:" +x+ "px;top: " +y+ "px;";
        // img.style.cssText =  coordinateStyleText+sizeStyleText;

        // table.appendChild(img);

        // draw opponent's side of the board
        if (data["board"][1]) {
            redrawDeck(data["board"][1], getDeckFolder(data["board"][1].deckName), true);
        }
    }

    function clean() {
        var imageIter = function (nodes) {
            for (var i = 0; i < nodes.length; i++) {
                var item = nodes[i];
                if (item.id === "") {
                    nodes[i].parentNode.removeChild(item);
                }
            }
        };

        imageIter(document.getElementsByTagName("img"));
        imageIter(document.getElementsByTagName("canvas"))
    }

    function drawTocken(color, roll, phase) {
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        var radius = 45;

        context.fillStyle = 'white';
        context.fillRect(0,0,canvas.width,canvas.height);
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = '#003300';
        context.stroke();
        context.font = 'italic 12pt Calibri';
        context.fillStyle = 'black';
        context.fillText(phase, 10, canvas.height - 10);

        if (roll) {
            context.font = 'italic 30pt Calibri';
            context.fillText('Roll!', 10, centerY);
        }
    }

    setInterval(
        function() {
            ajaxGet(
                '/action/state',
                function(data) {
                    var tmpData = JSON.parse(data);

                    clean();
                    console.log(data);
                    rerender(tmpData);

                    if (tmpData["tocken"]) {
                        drawTocken('green', tmpData["roll"], tmpData["phase"]);
                    } else {
                        drawTocken('red', tmpData["roll"], tmpData["phase"]);
                    }
                }
            );
        },
        2000
    );
};
