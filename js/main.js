/*
Copyright (c) 2019 SSHF, Sørlandet Sykehus
All rights reserved.

This game uses the Phaser framework. Phaser CE v2.12.0
https://phaser.io/
*/

// This block is to find whether the game is opened on a mobile or not.
var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}


//Retrieves window width of device.
var w = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;
//Retrieves window height of device.
var h = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

var gameWidth = w;
var gameHeight = h;

var game = new Phaser.Game(w, h, Phaser.AUTO, 'game', true);

var landscape = false;


if (w > h) {
	landscape = true;
	console.log('w m thn h');
} else {
	landscape = false;
}



/*
Required global variables

timer = used to avoid issues when changing player name in the first round.
runde = which round it is.
colorchooser = "dice" button
plyNameTxt = txt display: name of who's turn it is
fscrnBtn = fullscreen button
scaleRate = can be used if you wish to scale the game. Currently 1.
turn = whose turn it is.
dice = dice thrown.
playerNumber = how many players there are
players[] = array of Player objects
cardCount[0,0,0,0] = array tracking how many cards have been read. Each index represents one color
ylKort[] = array containing yellow cards
blKort[] = array containing blue cards
reKort[] = array containing red cards
grKort[] = array containing green cards
deck = dictionary/array of the deck retrieved from database
decktrackTxt = text representation of how many cards have been answered
qstAnswrd = how many cards have been answered
emitter1 = emitter (confetti) object. Not used
emitter2 = emitter (confetti) object. Not used
*/
var timer = 0;
var runde = 1;
var colorchooser;
var colorchooserTxt;
var plyNameTxt;
var fscrnBtn;
var scaleRate = 1;
var turn = 0;
var dice;
var playerNumber = window.localStorage.getItem("players");
var players = [];
var cardCount = [0, 0, 0, 0];
var ylKort = [];
var blKort = [];
var reKort = [];
var grKort = [];
var deck = JSON.parse(window.localStorage.getItem('deck'));
var decktrackTxt;
var qstAnswrd = 0;
var emitter1 = null;
var emitter2 = null;
var homeBtn;
var answerSheet;

// 4 for loops pushing cards into respective arrays
for (var a = 0; a < deck["Red"].length; a++){
	reKort.push(deck["Red"][a])
}		
for (var a = 0; a < deck["Blu"].length; a++){
	blKort.push(deck["Blu"][a])
}
for (var a = 0; a < deck["Yel"].length; a++){
	ylKort.push(deck["Yel"][a])
}
for (var a = 0; a < deck["Gre"].length; a++){
	grKort.push(deck["Gre"][a])
}

//function to create player objects
function Player(name, nr) {
	this.name = name;
	this.playerNr = nr;
}



//Phaser initialization
var GameState = {
	preload: function(){

		/*game.scale.scaleMode = Phaser.ScaleManager.RESIZE ;
	    game.scale.pageAlignHorizontally = true;
	    game.scale.pageAlignVertically = true;
	    game.canvas.style.width = '100%';
	    game.canvas.style.height = '100%';
	    game.scale.refresh();
		*/
		//Asset preloading
		game.load.image('infoBox', 'assets/images/infobox.png');
		game.load.image('bluBox', 'assets/images/bluBox.png');
		game.load.spritesheet('blux', 'assets/images/blueBox.png', 378, 183, 10);
		game.load.spritesheet('redx', 'assets/images/rdBox.png', 378, 183, 10);
		game.load.spritesheet('grnx', 'assets/images/grnBox.png', 378, 183, 10);
		game.load.spritesheet('yelx', 'assets/images/ylwBox.png', 378, 183, 10);
		game.load.image('close', 'assets/images/msgcheck.png');
		game.load.image('facecard', 'assets/images/facecard.png');
		game.load.image('bluBox', 'assets/images/bluBox.png');
		game.load.image('greBox', 'assets/images/greBox.png');
		game.load.image('yelBox', 'assets/images/yelBox.png');
		game.load.image('redBox', 'assets/images/redBox.png');

		game.load.image('redCard', 'assets/images/redCard.png');
		game.load.image('bluCard', 'assets/images/bluCard.png');
		game.load.image('yelCard', 'assets/images/yelCard.png');
		game.load.image('greCard', 'assets/images/greCard.png');

		game.load.image('fasit', 'assets/images/hvorerfasiten.png');
		game.load.image('fasitclick', 'assets/images/hvorerfasitenclick.png');
		game.load.image('home', 'assets/images/tilforsiden.png');
		game.load.image('homeclick', 'assets/images/tilforsidenclick.png');

		game.load.image('brd', 'assets/images/brd2.png');
		game.load.image('fscrn', 'assets/images/fsc.png');
		game.load.image('msgBx', 'assets/images/msgBox.png');
		game.load.image('ylSq', 'assets/images/ylSq.png');
		game.load.image('blSq', 'assets/images/blSq.png');
		game.load.image('grSq', 'assets/images/grSq.png');
		game.load.image('reSq', 'assets/images/reSq.png');
		
		game.load.spritesheet('colorchooser', 'assets/images/colorchooser.png', 188, 92, 2);
		game.load.audio('299', 'assets/audio/299.mp3');

		game.load.image('bluPix', 'assets/images/pixelblue.png');
		game.load.image('redPix', 'assets/images/pixelred.png');
		game.load.image('grePix', 'assets/images/pixelgreen.png');
		game.load.image('yelPix', 'assets/images/pixelyellow.png');
	},
	create: function(){
		//Asset creation. Assets used upon initial game load
		game.stage.backgroundColor = "#FFF";
		//Pushing into array of player objects
		for (var pl = 0; pl < playerNumber ; pl++){
			players[pl] = new Player(window.localStorage.getItem("player"+(1+pl)+"name"), pl+1);
			p = players[pl];
			console.log(players);
		}

		//"Adding game board sprites, buttons and text."
		/*
		cardRe = game.add.sprite(game.world.centerX-250,game.world.centerY-100, 'redBox');
		cardRe.anchor.x = 0.5;
		cardRe.anchor.y = 0.5;
		var cat1 = game.add.text(cardRe.x,cardRe.y, 'Kropp og Seksualitet');
		cat1.anchor.x = 0.5;
		cat1.anchor.y = 0.5;
		cat1.fill = "#FFF";
		cardGr = game.add.sprite(game.world.centerX-250,game.world.centerY+100,'greBox');
		cardGr.anchor.x = 0.5;
		cardGr.anchor.y = 0.5;
		var cat2 = game.add.text(cardGr.x,cardGr.y, 'Venner og Kjærester');
		cat2.anchor.x = 0.5;
		cat2.anchor.y = 0.5;
		cat2.fill = "#FFF";
		cardYe = game.add.sprite(game.world.centerX+250,game.world.centerY-100, 'yelBox');
		cardYe.anchor.x = 0.5;
		cardYe.anchor.y = 0.5;
		var cat3 = game.add.text(cardYe.x,cardYe.y, 'Sosiale Ferdigheter');
		cat3.anchor.x = 0.5;
		cat3.anchor.y = 0.5;
		cat3.fill = "#FFF";
		cardBl = game.add.sprite(game.world.centerX+250,game.world.centerY+100,'bluBox');
		cardBl.anchor.x = 0.5;
		cardBl.anchor.y = 0.5;
		var cat4 = game.add.text(cardBl.x,cardBl.y, 'Hygiene');
		cat4.anchor.x = 0.5;
		cat4.anchor.y = 0.5;
		cat4.fill = "#FFF";
		*/
		

		
		//"Play" button
		colorchooser = game.add.button(game.world.centerX, game.world.centerY+250, 'colorchooser', Play, this,1,2,2);	
		colorchooser.anchor.x = 0.5;
		colorchooser.anchor.y = 0.5;
		colorchooser.input.useHandCursor = true;
		//"Play" button text
		colorchooserTxt = game.add.text(colorchooser.x,colorchooser.y,"Trekk et kort!");
		colorchooserTxt.fill = "#FFF";
		colorchooserTxt.align = 'center';
		colorchooserTxt.anchor.x = 0.5;
		colorchooserTxt.anchor.y = 0.5;

		
		//Player name text display
		plyNameTxt = game.add.text(game.world.centerX, game.world.centerY-250, players[turn].name+'\'s tur!');
		plyNameTxt.anchor.x = 0.5;
		plyNameTxt.anchor.y = 0.5;
		//Deck name text display
		var decktxt = game.add.text(0, 0, deck["D_Name"]);
		decktxt.fontSize = 16;
		//decktrackTxt = game.add.text(0, decktxt.height, (runde - 1) + "av" + deck.length + " kort besvart");
		//decktrackTxt.fontSize = 16;

		var infoBox = game.add.sprite(game.world.centerX - game.world.centerX, game.world.centerY-game.world.centerY+100,'infoBox');
				if (landscape) {
			infoBox.scale.setTo(0.75,0.75);
		}
		game.add.sprite(game.world.centerX-(game.cache.getImage('redCard').width/2)-40,game.world.centerY-(game.cache.getImage('redCard').height/2)-40, 'redCard');
		game.add.sprite(game.world.centerX-(game.cache.getImage('bluCard').width/2)-30,game.world.centerY-(game.cache.getImage('bluCard').height/2)-30, 'bluCard');
		game.add.sprite(game.world.centerX-(game.cache.getImage('yelCard').width/2)-20,game.world.centerY-(game.cache.getImage('yelCard').height/2)-20, 'yelCard');
		game.add.sprite(game.world.centerX-(game.cache.getImage('greCard').width/2)-10,game.world.centerY-(game.cache.getImage('greCard').height/2)-10, 'greCard');
		game.add.sprite(game.world.centerX-(game.cache.getImage('facecard').width/2),game.world.centerY-(game.cache.getImage('facecard').height/2), 'facecard');
				
		//fscrnBtn = game.add.button(game.world.width-game.cache.getImage('fscrn').width, game.world.top, 'fscrn', fullScreener, this);
		fscrnBtn = game.add.button(game.world.centerX+200, game.world.centerY-280, 'fscrn', fullScreener, this);
		console.log(game.world.width);
		fscrnBtn.anchor.x = 0.5;
		homeBtn = game.add.button(infoBox.x, 10+infoBox.y+infoBox.height, 'home', goHome, this);
				if (landscape) {
			homeBtn.scale.setTo(0.75,0.75);
		}

		answerSheet = game.add.button(infoBox.x, infoBox.y+infoBox.height+10+homeBtn.height, 'fasit', openFasit, this)
				if (landscape) {
			answerSheet.scale.setTo(0.75,0.75);
		}
		//All emitter/confetti loads.
		game.physics.startSystem(Phaser.Physics.ARCARDE);
		emitter1 = game.add.emitter(0,0,500);
		emitter2 = game.add.emitter(0,0,500);
		emitter1.makeParticles(['bluPix', 'redPix', 'grePix','yelPix']);
		emitter2.makeParticles(['bluPix', 'redPix', 'grePix','yelPix']);
		emitter1.gravity = 400;
		emitter2.gravity = 400;
		emitter1.x = game.world.centerX-150;
		emitter1.y = game.world.centerY-125;
		emitter2.x = game.world.centerX+150;
		emitter2.y = game.world.centerY-125;

		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

	},
	update: function(){

		//Updating cards answered
		if (!game.input.activePointer.isDown) {
			
		}
		
		if (homeBtn.input.pointerOver()) {
			homeBtn.alpha = 0.5;
		} else
		{ homeBtn.alpha = 1;}
		if (answerSheet.input.pointerOver()) {
			answerSheet.alpha = 0.5;

		} else {
			answerSheet.alpha = 1;
		}
		if (!homeBtn.input.pointerOver()) {
			//console.log('over');
			homeBtn.alpha = 1;
			answerSheet.alpha = 1;	
		}
		//console.log(homeBtn.alpha);
		//decktrackTxt.text = (qstAnswrd) + " av " + (deck["Red"].length+deck["Blu"].length+deck["Yel"].length+deck["Gre"].length) + " Kort besvart";
	}
};


function goHome() {
	game.paused = true;
	if (confirm("Dette vil lukke vinduet")) {
		 window.close();
		} else {
			game.paused = false;
		}
		
}

function openFasit() {
	window.open("fasit.html", "_blank");
	answerSheet.alpha = 1;
}

//Starting game
game.state.add('GameState', GameState);
game.state.start('GameState');


//Function to play audio.
/*
function playAudio(card) {
	console.log(audi);
	var audi = game.add.audio(card);
	console.log(audi);
	audi.play();
}
*/
//function to display confetti through emitter
function confetti() {
	emitter1.start(true, 2000, 5, Math.floor(Math.random(5) * 1000));
	emitter2.start(true, 2000, 5, Math.floor(Math.random(5) * 1000));
	
}
//Animating card box and text
//card = card text, pos = die roll
function animateBox(card, pos){
	setTimeout(function(){
	switch (pos) {
		case 0:
		case 4:
		case 8:
		case 12:
		var msgBx = game.add.sprite(game.world.centerX, game.world.centerY, 'blux');

		var txt = game.add.text(0,0,card);
		txt.fill = "#000";
		txt.align = 'center';
		var width = game.cache.getImage('blux').width/10;
		var height = game.cache.getImage('blux').height;
		msgBx.animations.add('go', [1,2,3,4,5]);
		msgBx.animations.add('come', [6,7,8,9,10]);
		msgBx.animations.play('come');
		txt.wordWrap = true;
		txt.wordWrapWidth = width * .9;
		msgBx.x = msgBx.x - width /2;
		msgBx.y = msgBx.y - height/2;
		txt.x = msgBx.x + (width/2) - (txt.width/2);
		txt.y = msgBx.y + (height/2) - (txt.height/2);

		break;
		case 1:
		case 5:
		case 9:
		case 13:
		var msgBx = game.add.sprite(game.world.centerX, game.world.centerY, 'redx');
		var txt = game.add.text(0,0,card);
		txt.fill = "#000";
		txt.align = 'center';
		var width = game.cache.getImage('redx').width/10;
		var height = game.cache.getImage('redx').height;
		msgBx.animations.add('go', [1,2,3,4,5]);
		msgBx.animations.add('come', [6,7,8,9,10]);
		msgBx.animations.play('come');
		txt.wordWrap = true;
		txt.wordWrapWidth = width * .9;
		msgBx.x = msgBx.x - width /2;
		msgBx.y = msgBx.y - height/2;
		txt.x = msgBx.x + (width/2) - (txt.width/2);
		txt.y = msgBx.y + (height/2) - (txt.height/2);
		break;
		case 2:
		case 6:
		case 10:
		case 14:
		var msgBx = game.add.sprite(game.world.centerX, game.world.centerY, 'grnx');
		var txt = game.add.text(0,0,card);
		txt.fill = "#000";
		txt.align = 'center';
		var width = game.cache.getImage('grnx').width/10;
		var height = game.cache.getImage('grnx').height;
		msgBx.animations.add('go', [1,2,3,4,5]);
		msgBx.animations.add('come', [6,7,8,9,10]);
		msgBx.animations.play('come');
		txt.wordWrap = true;
		txt.wordWrapWidth = width * .9;
		msgBx.x = msgBx.x - width /2;
		msgBx.y = msgBx.y - height/2;
		txt.x = msgBx.x + (width/2) - (txt.width/2);
		txt.y = msgBx.y + (height/2) - (txt.height/2);
		break;
		case 3:
		case 7:
		case 11:
		case 15:
		var msgBx = game.add.sprite(game.world.centerX, game.world.centerY, 'yelx');
		var txt = game.add.text(0,0,card);
		txt.fill = "#000";
		txt.align = 'center';
		var width = game.cache.getImage('yelx').width/10;
		var height = game.cache.getImage('yelx').height;
		msgBx.animations.add('go', [1,2,3,4,5]);
		msgBx.animations.add('come', [6,7,8,9,10]);
		msgBx.animations.play('come');
		txt.wordWrap = true;
		txt.wordWrapWidth = width * .9;
		msgBx.x = msgBx.x - width /2;
		msgBx.y = msgBx.y - height/2;
		txt.x = msgBx.x + (width/2) - (txt.width/2);
		txt.y = msgBx.y + (height/2) - (txt.height/2);
		break;

	}

		setTimeout(function(){
			var closeBtn = game.add.button(msgBx.right-40, msgBx.bottom-40, 'close', function fsc(){
			closeBtn.destroy();
			txt.destroy();
			playerNameUpdate();
			qstAnswrd++;
			setTimeout(function () {
			if (runde == 1) {
				for (var er = 0; er < 10; er++) {
					//confetti();
				}
			}
			}, 150);
			
			//dieBtn.input.enabled = true;
			colorchooser.input.enabled = true;
			msgBx.animations.play('go');
		});
		},150);
		}, 2500);
}

//Updating player name (whose turn it is)
function playerNameUpdate(){
	plyNameTxt.destroy();
		if (turn < players.length){ 
		if (timer != 0) {
			plyNameTxt = game.add.text(game.world.centerX, game.world.centerY-250, players[turn].name+'\'s tur!');
			plyNameTxt.anchor.x = 0.5;
			plyNameTxt.anchor.y = 0.5;
		}
		} else { 
			runde++;
			plyNameTxt = game.add.text(game.world.centerX, game.world.centerY-250, players[0].name+'\'s tur!');
			plyNameTxt.anchor.x = 0.5;
			plyNameTxt.anchor.y = 0.5;

		}
}

//Main play function.
function Play() {
	if (turn >= playerNumber) {
		turn = 0;
	}
	
	dieRoll();
	var card = checkCards(dice);
	animateBox(card, dice);
	turn++;	
	timer++;	
}


//Dice display loop
function loopDelay(delay, cnt, dice) {
	setTimeout(function () {
		var currDie = (Math.floor(Math.random() * 4));
		var rnClr = ['blSq', 'reSq', 'grSq', 'ylSq'];
		cnt++;
		if (cnt < 10) {
			var sprite = game.add.sprite(game.world.centerX, game.world.centerY, rnClr[currDie]);
			sprite.anchor.x = 0.5;
			sprite.anchor.y = 0.5;
			sprite.scale.setTo(1.5,1.5);
			setTimeout(function(){sprite.destroy()},150);
			loopDelay(150, cnt, dice);

		} else {
			currDie = 'd'+ dice;
			var sprite = game.add.sprite(game.world.centerX, game.world.centerY, rnClr[dice]);
			sprite.anchor.x = 0.5;
			sprite.anchor.y = 0.5;
			sprite.scale.setTo(1.5,1.5);
			setTimeout(function(){sprite.destroy()},1000);
		}
		
	}, delay);

}
//Die roll function
function dieRoll(){
	//dieBtn.input.enabled = false;
	colorchooser.input.enabled = false;
	dice = 1 + Math.floor(Math.random() * 6);
	dice = Math.floor(Math.random() * 4);
	var cnt = 0;
	loopDelay(100, cnt, dice);
}

//Full screen function
function fullScreener() {

	if (game.scale.isFullScreen) {
		game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.transparent = true;
		game.scale.stopFullScreen();
		}
		else
		{
       	game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
       	game.transparent = false;
       	
		game.scale.startFullScreen(false);
		}
		console.log(game.transparent);
}
//Retrieving card text and incrementing card number
function checkCards(pos){
	switch (pos) {
		case 0:
		case 4:
		case 8:
		case 12:
		var currCard = blKort[cardCount[0]]
		cardCount[0]++;
		if (cardCount[0] >= blKort.length) {
			cardCount[0] = 0;
		}
		break;
		case 1:
		case 5:
		case 9:
		case 13:
		var currCard = reKort[cardCount[1]];
		cardCount[1]++;
		if (cardCount[1] >= reKort.length) {
			cardCount[1] = 0;
		}
		break;
		case 2:
		case 6:
		case 10:
		case 14:
		var currCard = grKort[cardCount[2]];
		cardCount[2]++;
		if (cardCount[2] >= grKort.length) {
			cardCount[2] = 0;
		}
		break;
		case 3:
		case 7:
		case 11:
		case 15:
		var currCard = ylKort[cardCount[3]];
		cardCount[3]++;
		if (cardCount[3] >= ylKort.length) {
			cardCount[3] = 0;
		}
		break;

		
	}
	return currCard;
}