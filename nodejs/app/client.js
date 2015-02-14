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

    function rerender(data) {
        if (!data || typeof data === 'undefined') return;

        var table = document.querySelector("#table");
        //vargath deck logo
        // var img = document.createElement("img");
        // img.src = "resources/vargath/"+vargath.race.logo_src;
        // img.className = "position-absolute";

        // var x = 171;
        // var y = 675 - cardHEIGHT;

        // var coordinateStyleText = "left:" +x+ "px;top: " +y+ "px;";
        // img.style.cssText =  coordinateStyleText+sizeStyleText;

        // table.appendChild(img);

        //vargath start setup
        if (data[0]) {
            redrawDeck(data[0], getDeckFolder(data[0].deckName));
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

        //benders start setup
        if (data[1]) {
            redrawDeck(data[1], getDeckFolder(data[1].deckName), true);
        }
    }

    function clean() {
        var imgArray = document.getElementsByTagName("canvas");

        for (var i = 0; i < imgArray.length; i++) {
            if (imgArray[i].id === "") {
                imgArray[i].parentNode.removeChild(imgArray[i]);
            }
        }
    }

    function drawTocken(color, roll, phase) {
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        var radius = 45;

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
                    rerender(tmpData["board"]);

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
