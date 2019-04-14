/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// cardCount [Blue, Red, Green, Orange]
var cardCount = [0, 0, 0, 0];
var orKort = [];
var blKort = [];
var reKort = [];
var grKort = [];
for (var q = 0; q <= 10; q++) {
    orKort.push("Orange Card " + (q + 1));
    blKort.push("Blue Card " + (q + 1));
    reKort.push("Red Card " + (q + 1));
    grKort.push("Green Card " + (q + 1));
}
///////// Over er en virtuell kortstokk med 11 kort i hver farge

var player = [];
var turn = 0;
    
    for (var i = 0; i <= 12; i++) {
    player[i] = new Player("","");
    player[i].index = i;
    document.write(player[i].index);
}

function Player(name, color) {
    this.name = name;
    this.color = color;
    this.position = 0;
}


function newGame(players) {
    if (document.getElementById("hist").style.display = "none") {
        document.getElementById("dice").style.display = "block";
        document.getElementById("game").style.display = "block";
        document.getElementById("hist").style.display = "block";
    }
    var loc = 0;
    var p;
    for (var i = 1; i <= players; i++) {
        //alert(i);
        p = player[i-1];
        p.color = document.getElementById("player"+i+"color").value.toLowerCase();
        p.name = document.getElementById("player" + i + "name").value;
        
        //alert(p.name);
        //alert(p.color);
    }
    //document.getElementById("b1").textContent = "[" + loc + "]";
    document.getElementById("setup").style.display = "none";
    play(players);
    
}
// Empties Variables and resets the game.
function endGame() {
    var p;
    turn = 0;
    cardCount[0] = 0;
    cardCount[1] = 0;
    cardCount[2] = 0;
    cardCount[3] = 0;
    for (var i = 0; i < player.length; i++) {
        p = player[i];
        p.color = "";
        p.name = "";
        p.position = 0;
    }
    document.getElementById("setup").style.display = "block";
    document.getElementById("hist").innerHTML = " ";
    document.getElementById("game").style.display = "none";
    document.getElementById("hist").style.display = "none";
    document.getElementById("dice").style.display = "none";
}
/*
 * Game loop.
 */

function play(players) {

    if (turn >= players) {
        turn = 0;
    }
    document.getElementById("hist").innerHTML += "<br>";
    document.getElementById("hist").innerHTML += player[turn].name + "<br>Posisjon: " + player[turn].position;
    var dice = diceThrow();
    player[turn].position += dice;
    var cardReader = cardRead(player[turn].position);    
    if (player[turn].position > 15){
        player[turn].position = player[turn].position - 15;
    }

    document.getElementById("dice").innerHTML = "<button onclick=\"play(" + players + ")\">" + player[turn].name + " sin tur til å kaste</button>";
    document.getElementById("dice").innerHTML += "<button onclick=\"endGame()\">Stans Spillet</button>";
    document.getElementById("hist").innerHTML += "<br>Kast: " + dice + "<br>Ny posisjon: " + player[turn].position + "<br>";
    document.getElementById("hist").innerHTML += "<br>Kort: <br> " + cardReader + "<br>";

    turn++;
    
}


function cardRead(pos) {
    
    if (pos == 0 || pos == 4 || pos == 8 || pos == 12) {
        cardCount[0]++;
        if (cardCount[0] > blKort.length) {
            cardCount[0] = 0;
        }
        return blKort[cardCount[0]];
    }
    else if (pos == 1 || pos == 5 || pos == 9 || pos == 13) {
        cardCount[1]++;
        if (cardCount[1] > blKort.length) {
            cardCount[1] = 0;
        }
        return reKort[cardCount[1]];
    }
    else if (pos == 2 || pos == 6 || pos == 10 || pos == 14) {
        cardCount[2]++;
        if (cardCount[2] > blKort.length) {
            cardCount[2] = 0;
        }
        return grKort[cardCount[2]];
    }
    else if (pos == 3 || pos == 7 || pos == 11 || pos == 15) {
        cardCount[3]++;
        if (cardCount[3] > blKort.length) {
            cardCount[3] = 0;
        }
        return orKort[cardCount[3]];
    }
    else {
        return;
    }
}


Array.prototype.randomize = function(length) {
	length = this.length;
	var num;
	var indexArray = [];

	for (var i = 0; i < length; i++) {
		indexArray[i] = i;
	}

	for (var i = 0; i < length; i++) {
		// Generate random number between 0 and indexArray.length - 1.
		num = Math.floor(Math.random() * indexArray.length);
		this[i] = indexArray[num] + 1;

		indexArray.splice(num, 1);
	}
};