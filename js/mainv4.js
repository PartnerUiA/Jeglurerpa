function checkPlayers() {
	var plr = getCookie("players");
	if (plr != "") {
		} else {
			plr = prompt("Hvor mange spillere er det?", "");
		 if (plr != "" && plr != null) {
			setPlayers(plr);
		}
	}
}

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}
var timer = 0;
var gameWidth = 1280;
var gameHeight = 720;

var w = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var h = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'game');

var pl1Pos;
var pl2Pos;
var pl3Pos;
var pl4Pos;
var pl5Pos;
var pl6Pos;
var pl7Pos;
var pl8Pos;
var pl9Pos;

var runde = 1;
var colorchooser;
var plyNameTxt;
var fscrnBtn;
var exFscrnBtn;
var scaleRate = 1;
var r = 0;
var turn = 0;
var dieBtn;
var boardParent;
var boardChild;
var dice;
var playerNumber = getCookie("players");
var players = [];
var board;
var cardCount = [0, 0, 0, 0];
var ylKort = [];
var blKort = [];
var reKort = [];
var grKort = [];
var qst;
var tester = JSON.parse(window.localStorage.getItem('deck'));;

for (var a = 0; a < tester["Red"].length; a++){
	reKort.push(tester["Red"][a])
}		
for (var a = 0; a < tester["Blu"].length; a++){
	blKort.push(tester["Blu"][a])
}
for (var a = 0; a < tester["Yel"].length; a++){
	ylKort.push(tester["Yel"][a])
}
for (var a = 0; a < tester["Gre"].length; a++){
	grKort.push(tester["Gre"][a])
}
/*
Groups
*/
var playerGroup;

function Player(name, nr) {
	this.name = name;
	this.playerNr = nr;
	this.position = 0;
}
var emitter1 = null;
var emitter2 = null;



var GameState = {
	preload: function(){
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		//console.log("GW: ", game.width, "GH:", game.height);



		game.load.image('bluBox', 'assets/images/bluBox.png');
		game.load.spritesheet('blux', 'assets/images/blueBox.png', 378, 183, 10);
		game.load.spritesheet('redx', 'assets/images/rdBox.png', 378, 183, 10);
		game.load.spritesheet('grnx', 'assets/images/grnBox.png', 378, 183, 10);
		game.load.spritesheet('yelx', 'assets/images/ylwBox.png', 378, 183, 10);
		game.load.image('close', 'assets/images/msgcheck.png');

		game.load.image('bluBox', 'assets/images/bluBox.png');
		game.load.image('greBox', 'assets/images/greBox.png');
		game.load.image('yelBox', 'assets/images/yelBox.png');
		game.load.image('redBox', 'assets/images/redBox.png');

		game.load.image('brd', 'assets/images/brd2.png');
		game.load.image('dieBtn', 'assets/images/dicebtn.png');
		game.load.image('fscrn', 'assets/images/fsc.png');
		game.load.image('exfscrn', 'assets/images/nfsc.png');
		game.load.image('msgBx', 'assets/images/msgBox.png');
		game.load.image('ylSq', 'assets/images/ylSq.png');
		game.load.image('blSq', 'assets/images/blSq.png');
		game.load.image('grSq', 'assets/images/grSq.png');
		game.load.image('reSq', 'assets/images/reSq.png');

		game.load.image('bluPix', 'assets/images/pixelblue.png');
		game.load.image('redPix', 'assets/images/pixelred.png');
		game.load.image('grePix', 'assets/images/pixelgreen.png');
		game.load.image('yelPix', 'assets/images/pixelyellow.png');

		game.load.spritesheet('pl1anim', 'assets/images/pl1anim.png', 20,20,14);
		game.load.spritesheet('pl2anim', 'assets/images/pl2anim.png', 20,20,14);
		game.load.spritesheet('pl3anim', 'assets/images/pl3anim.png', 20,20,14);
		game.load.spritesheet('pl4anim', 'assets/images/pl4anim.png', 20,20,14);
		game.load.spritesheet('pl5anim', 'assets/images/pl5anim.png', 20,20,14);
		game.load.spritesheet('pl6anim', 'assets/images/pl6anim.png', 20,20,14);
		game.load.spritesheet('pl7anim', 'assets/images/pl7anim.png', 20,20,14);
		game.load.spritesheet('pl8anim', 'assets/images/pl8anim.png', 20,20,14);
		game.load.spritesheet('pl9anim', 'assets/images/pl9anim.png', 20,20,14);
		game.load.spritesheet('colorchooser', 'assets/images/colorchooser.png', 188, 92, 2);
		
		game.load.audio('299', 'assets/audio/299.mp3');

		
	},
	create: function(){

		parent = game.add.sprite(game.world.centerX,game.world.centerY , 'brd');
		parent.anchor.x = 0.5;
		parent.anchor.y = 0.5;

		initializeSprites();

		cardRe = game.add.sprite(game.world.centerX-300,game.world.centerY, 'redBox');
		cardRe.anchor.x = 0.5;
		cardRe.anchor.y = 0.5;
		cardRe.scale.setTo(0.5,0.5);
		var cat1 = game.add.text(cardRe.x,cardRe.y, 'Kropp og Seksualitet');
		cat1.anchor.x = 0.5;
		cat1.anchor.y = 0.5;
		cat1.scale.setTo(0.75,0.75);
		cat1.wordWrap = true;
		cat1.align = 'center';
		cardGr = game.add.sprite(game.world.centerX-100,game.world.centerY,'greBox');
		cardGr.anchor.x = 0.5;
		cardGr.anchor.y = 0.5;
		cardGr.scale.setTo(0.5,0.5);
		var cat2 = game.add.text(cardGr.x,cardGr.y, 'Venner og Kjærester');
		cat2.anchor.x = 0.5;
		cat2.anchor.y = 0.5;
		cat2.scale.setTo(0.75,0.75);
		cat2.wordWrap = true;
		cat2.align = 'center';
		cardYe = game.add.sprite(game.world.centerX+100,game.world.centerY, 'yelBox');
		cardYe.anchor.x = 0.5;
		cardYe.anchor.y = 0.5;
		cardYe.scale.setTo(0.5,0.5);
		var cat3 = game.add.text(cardYe.x,cardYe.y, 'Sosiale Ferdigheter');
		cat3.anchor.x = 0.5;
		cat3.anchor.y = 0.5;
		cat3.scale.setTo(0.75,0.75);
		cat3.wordWrap = true;
		cat3.align = 'center';
		cardBl = game.add.sprite(game.world.centerX+300,game.world.centerY,'bluBox');
		cardBl.anchor.x = 0.5;
		cardBl.anchor.y = 0.5;
		cardBl.scale.setTo(0.5,0.5);
		var cat4 = game.add.text(cardBl.x,cardBl.y, 'Hygiene');
		cat4.anchor.x = 0.5;
		cat4.anchor.y = 0.5;
		cat4.scale.setTo(0.75,0.75);
		cat4.wordWrap = true;
		cat4.align = 'center';

		game.stage.backgroundColor = "#FFF";
		for (var pl = 0; pl < playerNumber ; pl++){
			players[pl] = new Player(window.localStorage.getItem("player"+(1+pl)+"name"), pl+1);
			p = players[pl];
			console.log(players);
		}		

		switch (players.length) {
			case 2:
			pl1sprite = game.add.sprite(pl1Pos[0][0],pl1Pos[0][1], 'pl1anim');

			pl1sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl1sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl2sprite = game.add.sprite(pl2Pos[0][0],pl2Pos[0][1], 'pl2anim');
			pl2sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl2sprite.animations.add('come', [8,9,10,11,12,13,14]);
			break;
			case 3:

			pl1sprite = game.add.sprite(pl1Pos[0][0],pl1Pos[0][1], 'pl1anim');
			pl1sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl1sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl2sprite = game.add.sprite(pl2Pos[0][0],pl2Pos[0][1], 'pl2anim');
			pl2sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl2sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl3sprite = game.add.sprite(pl3Pos[0][0],pl3Pos[0][1], 'pl3anim');
			pl3sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl3sprite.animations.add('come', [8,9,10,11,12,13,14]);
			break;
			case 4:
			pl1sprite = game.add.sprite(pl1Pos[0][0],pl1Pos[0][1], 'pl1anim');
			pl1sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl1sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl2sprite = game.add.sprite(pl2Pos[0][0],pl2Pos[0][1], 'pl2anim');
			pl2sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl2sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl3sprite = game.add.sprite(pl3Pos[0][0],pl3Pos[0][1], 'pl3anim');
			pl3sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl3sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl4sprite = game.add.sprite(pl4Pos[0][0],pl4Pos[0][1], 'pl4anim');
			pl4sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl4sprite.animations.add('come', [8,9,10,11,12,13,14]);

			break;
			case 5:
			pl1sprite = game.add.sprite(pl1Pos[0][0],pl1Pos[0][1], 'pl1anim');
			pl1sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl1sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl2sprite = game.add.sprite(pl2Pos[0][0],pl2Pos[0][1], 'pl2anim');
			pl2sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl2sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl3sprite = game.add.sprite(pl3Pos[0][0],pl3Pos[0][1], 'pl3anim');
			pl3sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl3sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl4sprite = game.add.sprite(pl4Pos[0][0],pl4Pos[0][1], 'pl4anim');
			pl4sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl4sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl5sprite = game.add.sprite(pl5Pos[0][0],pl5Pos[0][1], 'pl5anim');
			pl5sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl5sprite.animations.add('come', [8,9,10,11,12,13,14]);
			break;
			case 6:
			pl1sprite = game.add.sprite(pl1Pos[0][0],pl1Pos[0][1], 'pl1anim');
			pl1sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl1sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl2sprite = game.add.sprite(pl2Pos[0][0],pl2Pos[0][1], 'pl2anim');
			pl2sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl2sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl3sprite = game.add.sprite(pl3Pos[0][0],pl3Pos[0][1], 'pl3anim');
			pl3sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl3sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl4sprite = game.add.sprite(pl4Pos[0][0],pl4Pos[0][1], 'pl4anim');
			pl4sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl4sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl5sprite = game.add.sprite(pl5Pos[0][0],pl5Pos[0][1], 'pl5anim');
			pl5sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl5sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl6sprite = game.add.sprite(pl6Pos[0][0],pl6Pos[0][1], 'pl6anim');
			pl6sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl6sprite.animations.add('come', [8,9,10,11,12,13,14]);
			break;
			case 7:
			pl1sprite = game.add.sprite(pl1Pos[0][0],pl1Pos[0][1], 'pl1anim');
			pl1sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl1sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl2sprite = game.add.sprite(pl2Pos[0][0],pl2Pos[0][1], 'pl2anim');
			pl2sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl2sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl3sprite = game.add.sprite(pl3Pos[0][0],pl3Pos[0][1], 'pl3anim');
			pl3sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl3sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl4sprite = game.add.sprite(pl4Pos[0][0],pl4Pos[0][1], 'pl4anim');
			pl4sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl4sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl5sprite = game.add.sprite(pl5Pos[0][0],pl5Pos[0][1], 'pl5anim');
			pl5sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl5sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl6sprite = game.add.sprite(pl6Pos[0][0],pl6Pos[0][1], 'pl6anim');
			pl6sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl6sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl7sprite = game.add.sprite(pl7Pos[0][0],pl7Pos[0][1], 'pl7anim');
			pl7sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl7sprite.animations.add('come', [8,9,10,11,12,13,14]);
			break;
			case 8:

			pl1sprite = game.add.sprite(pl1Pos[0][0],pl1Pos[0][1], 'pl1anim');
			pl1sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl1sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl2sprite = game.add.sprite(pl2Pos[0][0],pl2Pos[0][1], 'pl2anim');
			pl2sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl2sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl3sprite = game.add.sprite(pl3Pos[0][0],pl3Pos[0][1], 'pl3anim');
			pl3sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl3sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl4sprite = game.add.sprite(pl4Pos[0][0],pl4Pos[0][1], 'pl4anim');
			pl4sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl4sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl5sprite = game.add.sprite(pl5Pos[0][0],pl5Pos[0][1], 'pl5anim');
			pl5sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl5sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl6sprite = game.add.sprite(pl6Pos[0][0],pl6Pos[0][1], 'pl6anim');
			pl6sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl6sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl7sprite = game.add.sprite(pl7Pos[0][0],pl7Pos[0][1], 'pl7anim');
			pl7sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl7sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl8sprite = game.add.sprite(pl8Pos[0][0],pl8Pos[0][1], 'pl8anim');
			pl8sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl8sprite.animations.add('come', [8,9,10,11,12,13,14]);
			break;
			case 9:
			pl1sprite = game.add.sprite(pl1Pos[0][0],pl1Pos[0][1], 'pl1anim');
			pl1sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl1sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl2sprite = game.add.sprite(pl2Pos[0][0],pl2Pos[0][1], 'pl2anim');
			pl2sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl2sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl3sprite = game.add.sprite(pl3Pos[0][0],pl3Pos[0][1], 'pl3anim');
			pl3sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl3sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl4sprite = game.add.sprite(pl4Pos[0][0],pl4Pos[0][1], 'pl4anim');
			pl4sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl4sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl5sprite = game.add.sprite(pl5Pos[0][0],pl5Pos[0][1], 'pl5anim');
			pl5sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl5sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl6sprite = game.add.sprite(pl6Pos[0][0],pl6Pos[0][1], 'pl6anim');
			pl6sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl6sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl7sprite = game.add.sprite(pl7Pos[0][0],pl7Pos[0][1], 'pl7anim');
			pl7sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl7sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl8sprite = game.add.sprite(pl8Pos[0][0],pl8Pos[0][1], 'pl8anim');
			pl8sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl8sprite.animations.add('come', [8,9,10,11,12,13,14]);
			pl9sprite = game.add.sprite(pl9Pos[0][0],pl9Pos[0][1], 'pl9anim');
			pl9sprite.animations.add('go', [1,2,3,4,5,6,7]);
			pl9sprite.animations.add('come', [8,9,10,11,12,13,14]);
			break;
			default:
			console.log('Default: ', players.length);
			break;
		}

		fscrnBtn = game.add.button(game.world.right-game.cache.getImage('fscrn').width, game.world.top-game.cache.getImage('fscrn').height, 'fscrn', fullScreener, this);
		
		colorchooser = game.add.button(game.world.centerX, game.world.centerY+310, 'colorchooser', Play, this,1,1,2);	
		colorchooser.anchor.x = 0.5;
		colorchooser.anchor.y = 0.5;
		colorchooser.input.useHandCursor = true;
		var colorchooserTxt = game.add.text(colorchooser.x,colorchooser.y,"Få en farge!");
		colorchooserTxt.wordWrap = true;
		colorchooserTxt.anchor.x = 0.5;
		colorchooserTxt.anchor.y = 0.5;
		//dieBtn = game.add.button(game.world.centerX/2, game.world.centerY, 'dieBtn', Play, this);
		//dieBtn.anchor.x = 0.5;
		//dieBtn.anchor.y = 0.5;
		//dieBtn.input.useHandCursor = true;

		

		plyNameTxt = game.add.text(game.world.centerX, 50, players[turn].name+'\'s tur!');
		plyNameTxt.anchor.x = 0.5;
		plyNameTxt.anchor.y = 0.5;

		var decktxt = game.add.text(0, 0, "Tilfeldig kortstokk #1");
		decktxt.fontSize = 16;
		
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

	},
	update: function(){
		
	}
};

console.log(game);
game.state.add('GameState', GameState);
game.state.start('GameState');

/*
function playAudio(card) {
	console.log(audi);
	var audi = game.add.audio(card);
	console.log(audi);
	audi.play();
}
*/

function confetti() {
	emitter1.start(true, 2000, 5, Math.floor(Math.random(5) * 1000));
	emitter2.start(true, 2000, 5, Math.floor(Math.random(5) * 1000));
	
}
function animateBox(card, pos){
	setTimeout(function(){
	switch (pos) {
		case 0:
		case 4:
		case 8:
		case 12:
		var msgBx = game.add.sprite(game.world.centerX, game.world.centerY, 'blux');
		var txt = game.add.text(0,0,card);
		txt.fill = "#FFF";
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
		txt.fill = "#FFF";
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
		txt.fill = "#FFF";
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
		txt.fill = "#FFF";
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
		}, 2000);
}

function playerNameUpdate(){
	plyNameTxt.destroy();
		if (turn < players.length){ 
		if (timer != 0) {
			plyNameTxt = game.add.text(game.world.centerX, 50, players[turn].name+'\'s tur!');
			plyNameTxt.anchor.x = 0.5;
			plyNameTxt.anchor.y = 0.5;
		}
		} else { 
			runde++;
			plyNameTxt = game.add.text(game.world.centerX, 50, players[0].name+'\'s tur!');
			plyNameTxt.anchor.x = 0.5;
			plyNameTxt.anchor.y = 0.5;

		}
}

function Play() {
	if (turn >= playerNumber) {
		turn = 0;
	}
	
	dieRoll();

	players[turn].position += dice;
	if (players[turn].position>15) {
		players[turn].position = players[turn].position - 16;
	}
	console.log(dice);
	playAnimTest(turn);
	var card = checkCards(players[turn].position);
	animateBox(card, players[turn].position);
	turn++;	
	timer++;	
}


function cardControl(card) {
	setTimeout(function (){
		qst = game.add.text(game.world.centerX, game.world.centerY, card);
	});
	game.world.remove(qst);

}

function loopDelay(delay, cnt, dice) {
	setTimeout(function () {
		var currDie = (Math.floor(Math.random() * 4));
		var rnClr = ['blSq', 'reSq', 'grSq', 'ylSq'];
		cnt++;
		if (cnt < 10) {
			var sprite = game.add.sprite(game.world.centerX, game.world.centerY, rnClr[currDie]);
			sprite.anchor.x = 0.5;
			sprite.anchor.y = 0.5;
			setTimeout(function(){sprite.destroy()},50);
			loopDelay(50, cnt, dice);

		} else {
			currDie = 'd'+ dice;
			var sprite = game.add.sprite(game.world.centerX, game.world.centerY, rnClr[dice]);
			sprite.anchor.x = 0.5;
			sprite.anchor.y = 0.5;
			setTimeout(function(){sprite.destroy()},1500);
		}
		
	}, delay);

}

function dieRoll(){
	//dieBtn.input.enabled = false;
	colorchooser.input.enabled = false;
	dice = 1 + Math.floor(Math.random() * 6);
	dice = Math.floor(Math.random() * 4);
	var cnt = 0;
	loopDelay(50, cnt, dice);
}

function showMessageBox(text, w, h) {
	}

function fullScreener() {

	if (game.scale.isFullScreen) {
		game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.stopFullScreen();
		}
		else
		{
       	game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.startFullScreen(false);
		}
		
}

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

function playAnimTest(turn){
	//console.log("Turn: ", turn);
	switch (turn){ 
		case 0:
		pl1sprite.animations.play('go');
		setTimeout(function (){
		//console.log("case 0");
			switch (players[turn].position){
				case 0:
				pl1sprite.x = pl1Pos[0][0];
				pl1sprite.y = pl1Pos[0][1];
				pl1sprite.animations.play('come');
				break;
				case 1:
				pl1sprite.x = pl1Pos[1][0];
				pl1sprite.y = pl1Pos[1][1];
				pl1sprite.animations.play('come');
				break;
				case 2:
				pl1sprite.x = pl1Pos[2][0];
				pl1sprite.y = pl1Pos[2][1];
				pl1sprite.animations.play('come');
				break;
				case 3:
				pl1sprite.x = pl1Pos[3][0];
				pl1sprite.y = pl1Pos[3][1];
				pl1sprite.animations.play('come');
				break;
				case 4:
				pl1sprite.x = pl1Pos[4][0];
				pl1sprite.y = pl1Pos[4][1];
				pl1sprite.animations.play('come');
				break;
				case 5:
				pl1sprite.x = pl1Pos[5][0];
				pl1sprite.y = pl1Pos[5][1];
				pl1sprite.animations.play('come');
				break;
				case 6:
				pl1sprite.x = pl1Pos[6][0];
				pl1sprite.y = pl1Pos[6][1];
				pl1sprite.animations.play('come');
				break;
				case 7:
				pl1sprite.x = pl1Pos[7][0];
				pl1sprite.y = pl1Pos[7][1];
				pl1sprite.animations.play('come');
				break;
				case 8:
				pl1sprite.x = pl1Pos[8][0];
				pl1sprite.y = pl1Pos[8][1];
				pl1sprite.animations.play('come');
				break;
				case 9:
				pl1sprite.x = pl1Pos[9][0];
				pl1sprite.y = pl1Pos[9][1];
				pl1sprite.animations.play('come');
				break;
				case 10:
				pl1sprite.x = pl1Pos[10][0];
				pl1sprite.y = pl1Pos[10][1];
				pl1sprite.animations.play('come');
				break;
				case 11:
				pl1sprite.x = pl1Pos[11][0];
				pl1sprite.y = pl1Pos[11][1];
				pl1sprite.animations.play('come');
				break;
				case 12:
				pl1sprite.x = pl1Pos[12][0];
				pl1sprite.y = pl1Pos[12][1];
				pl1sprite.animations.play('come');
				break;
				case 13:
				pl1sprite.x = pl1Pos[13][0];
				pl1sprite.y = pl1Pos[13][1];
				pl1sprite.animations.play('come');
				break;
				case 14:
				pl1sprite.x = pl1Pos[14][0];
				pl1sprite.y = pl1Pos[14][1];
				pl1sprite.animations.play('come');
				break;
				case 15:
				pl1sprite.x = pl1Pos[15][0];
				pl1sprite.y = pl1Pos[15][1];
				pl1sprite.animations.play('come');
				break;
				default:
				break;
		}}, 1000);
		break;
		case 1:
		pl2sprite.animations.play('go');
			setTimeout (function() {
			switch (players[turn].position){
				case 0:
				pl2sprite.x = pl2Pos[0][0];
				pl2sprite.y = pl2Pos[0][1];
				pl2sprite.animations.play('come');
				break;
				case 1:
				pl2sprite.x = pl2Pos[1][0];
				pl2sprite.y = pl2Pos[1][1];
				pl2sprite.animations.play('come');
				break;
				case 2:
				pl2sprite.x = pl2Pos[2][0];
				pl2sprite.y = pl2Pos[2][1];
				pl2sprite.animations.play('come');
				break;
				case 3:
				pl2sprite.x = pl2Pos[3][0];
				pl2sprite.y = pl2Pos[3][1];
				pl2sprite.animations.play('come');
				break;
				case 4:
				pl2sprite.x = pl2Pos[4][0];
				pl2sprite.y = pl2Pos[4][1];
				pl2sprite.animations.play('come');
				break;
				case 5:
				pl2sprite.x = pl2Pos[5][0];
				pl2sprite.y = pl2Pos[5][1];
				pl2sprite.animations.play('come');
				break;
				case 6:
				pl2sprite.x = pl2Pos[6][0];
				pl2sprite.y = pl2Pos[6][1];
				pl2sprite.animations.play('come');
				break;
				case 7:
				pl2sprite.x = pl2Pos[7][0];
				pl2sprite.y = pl2Pos[7][1];
				pl2sprite.animations.play('come');
				break;
				case 8:
				pl2sprite.x = pl2Pos[8][0];
				pl2sprite.y = pl2Pos[8][1];
				pl2sprite.animations.play('come');
				break;
				case 9:
				pl2sprite.x = pl2Pos[9][0];
				pl2sprite.y = pl2Pos[9][1];
				pl2sprite.animations.play('come');
				break;
				case 10:
				pl2sprite.x = pl2Pos[10][0];
				pl2sprite.y = pl2Pos[10][1];
				pl2sprite.animations.play('come');
				break;
				case 11:
				pl2sprite.x = pl2Pos[11][0];
				pl2sprite.y = pl2Pos[11][1];
				pl2sprite.animations.play('come');
				break;
				case 12:
				pl2sprite.x = pl2Pos[12][0];
				pl2sprite.y = pl2Pos[12][1];
				pl2sprite.animations.play('come');
				break;
				case 13:
				pl2sprite.x = pl2Pos[13][0];
				pl2sprite.y = pl2Pos[13][1];
				pl2sprite.animations.play('come');
				break;
				case 14:
				pl2sprite.x = pl2Pos[14][0];
				pl2sprite.y = pl2Pos[14][1];
				pl2sprite.animations.play('come');
				break;
				case 15:
				pl2sprite.x = pl2Pos[15][0];
				pl2sprite.y = pl2Pos[15][1];
				pl2sprite.animations.play('come');
				break;
				default:
				break;
				}
				}, 1000);
			break;
		case 2:
		pl3sprite.animations.play('go');
			setTimeout (function() {
			switch (players[turn].position){
				case 0:
				pl3sprite.x = pl3Pos[0][0];
				pl3sprite.y = pl3Pos[0][1];
				pl3sprite.animations.play('come');
				break;
				case 1:
				pl3sprite.x = pl3Pos[1][0];
				pl3sprite.y = pl3Pos[1][1];
				pl3sprite.animations.play('come');
				break;
				case 2:
				pl3sprite.x = pl3Pos[2][0];
				pl3sprite.y = pl3Pos[2][1];
				pl3sprite.animations.play('come');
				break;
				case 3:
				pl3sprite.x = pl3Pos[3][0];
				pl3sprite.y = pl3Pos[3][1];
				pl3sprite.animations.play('come');
				break;
				case 4:
				pl3sprite.x = pl3Pos[4][0];
				pl3sprite.y = pl3Pos[4][1];
				pl3sprite.animations.play('come');
				break;
				case 5:
				pl3sprite.x = pl3Pos[5][0];
				pl3sprite.y = pl3Pos[5][1];
				pl3sprite.animations.play('come');
				break;
				case 6:
				pl3sprite.x = pl3Pos[6][0];
				pl3sprite.y = pl3Pos[6][1];
				pl3sprite.animations.play('come');
				break;
				case 7:
				pl3sprite.x = pl3Pos[7][0];
				pl3sprite.y = pl3Pos[7][1];
				pl3sprite.animations.play('come');
				break;
				case 8:
				pl3sprite.x = pl3Pos[8][0];
				pl3sprite.y = pl3Pos[8][1];
				pl3sprite.animations.play('come');
				break;
				case 9:
				pl3sprite.x = pl3Pos[9][0];
				pl3sprite.y = pl3Pos[9][1];
				pl3sprite.animations.play('come');
				break;
				case 10:
				pl3sprite.x = pl3Pos[10][0];
				pl3sprite.y = pl3Pos[10][1];
				pl3sprite.animations.play('come');
				break;
				case 11:
				pl3sprite.x = pl3Pos[11][0];
				pl3sprite.y = pl3Pos[11][1];
				pl3sprite.animations.play('come');
				break;
				case 12:
				pl3sprite.x = pl3Pos[12][0];
				pl3sprite.y = pl3Pos[12][1];
				pl3sprite.animations.play('come');
				break;
				case 13:
				pl3sprite.x = pl3Pos[13][0];
				pl3sprite.y = pl3Pos[13][1];
				pl3sprite.animations.play('come');
				break;
				case 14:
				pl3sprite.x = pl3Pos[14][0];
				pl3sprite.y = pl3Pos[14][1];
				pl3sprite.animations.play('come');
				break;
				case 15:
				pl3sprite.x = pl3Pos[15][0];
				pl3sprite.y = pl3Pos[15][1];
				pl3sprite.animations.play('come');
				break;
				default:
				break;
				}
				}, 1000);
			break;
		case 3:
				pl4sprite.animations.play('go');
			setTimeout (function() {
			switch (players[turn].position){
				case 0:
				pl4sprite.x = pl4Pos[0][0];
				pl4sprite.y = pl4Pos[0][1];
				pl4sprite.animations.play('come');
				break;
				case 1:
				pl4sprite.x = pl4Pos[1][0];
				pl4sprite.y = pl4Pos[1][1];
				pl4sprite.animations.play('come');
				break;
				case 2:
				pl4sprite.x = pl4Pos[2][0];
				pl4sprite.y = pl4Pos[2][1];
				pl4sprite.animations.play('come');
				break;
				case 3:
				pl4sprite.x = pl4Pos[3][0];
				pl4sprite.y = pl4Pos[3][1];
				pl4sprite.animations.play('come');
				break;
				case 4:
				pl4sprite.x = pl4Pos[4][0];
				pl4sprite.y = pl4Pos[4][1];
				pl4sprite.animations.play('come');
				break;
				case 5:
				pl4sprite.x = pl4Pos[5][0];
				pl4sprite.y = pl4Pos[5][1];
				pl4sprite.animations.play('come');
				break;
				case 6:
				pl4sprite.x = pl4Pos[6][0];
				pl4sprite.y = pl4Pos[6][1];
				pl4sprite.animations.play('come');
				break;
				case 7:
				pl4sprite.x = pl4Pos[7][0];
				pl4sprite.y = pl4Pos[7][1];
				pl4sprite.animations.play('come');
				break;
				case 8:
				pl4sprite.x = pl4Pos[8][0];
				pl4sprite.y = pl4Pos[8][1];
				pl4sprite.animations.play('come');
				break;
				case 9:
				pl4sprite.x = pl4Pos[9][0];
				pl4sprite.y = pl4Pos[9][1];
				pl4sprite.animations.play('come');
				break;
				case 10:
				pl4sprite.x = pl4Pos[10][0];
				pl4sprite.y = pl4Pos[10][1];
				pl4sprite.animations.play('come');
				break;
				case 11:
				pl4sprite.x = pl4Pos[11][0];
				pl4sprite.y = pl4Pos[11][1];
				pl4sprite.animations.play('come');
				break;
				case 12:
				pl4sprite.x = pl4Pos[12][0];
				pl4sprite.y = pl4Pos[12][1];
				pl4sprite.animations.play('come');
				break;
				case 13:
				pl4sprite.x = pl4Pos[13][0];
				pl4sprite.y = pl4Pos[13][1];
				pl4sprite.animations.play('come');
				break;
				case 14:
				pl4sprite.x = pl4Pos[14][0];
				pl4sprite.y = pl4Pos[14][1];
				pl4sprite.animations.play('come');
				break;
				case 15:
				pl4sprite.x = pl4Pos[15][0];
				pl4sprite.y = pl4Pos[15][1];
				pl4sprite.animations.play('come');
				break;
				default:
				break;
				}
				}, 1000);
			break;
		break;
		case 4:
				pl5sprite.animations.play('go');
			setTimeout (function() {
			switch (players[turn].position){
				case 0:
				pl5sprite.x = pl5Pos[0][0];
				pl5sprite.y = pl5Pos[0][1];
				pl5sprite.animations.play('come');
				break;
				case 1:
				pl5sprite.x = pl5Pos[1][0];
				pl5sprite.y = pl5Pos[1][1];
				pl5sprite.animations.play('come');
				break;
				case 2:
				pl5sprite.x = pl5Pos[2][0];
				pl5sprite.y = pl5Pos[2][1];
				pl5sprite.animations.play('come');
				break;
				case 3:
				pl5sprite.x = pl5Pos[3][0];
				pl5sprite.y = pl5Pos[3][1];
				pl5sprite.animations.play('come');
				break;
				case 4:
				pl5sprite.x = pl5Pos[4][0];
				pl5sprite.y = pl5Pos[4][1];
				pl5sprite.animations.play('come');
				break;
				case 5:
				pl5sprite.x = pl5Pos[5][0];
				pl5sprite.y = pl5Pos[5][1];
				pl5sprite.animations.play('come');
				break;
				case 6:
				pl5sprite.x = pl5Pos[6][0];
				pl5sprite.y = pl5Pos[6][1];
				pl5sprite.animations.play('come');
				break;
				case 7:
				pl5sprite.x = pl5Pos[7][0];
				pl5sprite.y = pl5Pos[7][1];
				pl5sprite.animations.play('come');
				break;
				case 8:
				pl5sprite.x = pl5Pos[8][0];
				pl5sprite.y = pl5Pos[8][1];
				pl5sprite.animations.play('come');
				break;
				case 9:
				pl5sprite.x = pl5Pos[9][0];
				pl5sprite.y = pl5Pos[9][1];
				pl5sprite.animations.play('come');
				break;
				case 10:
				pl5sprite.x = pl5Pos[10][0];
				pl5sprite.y = pl5Pos[10][1];
				pl5sprite.animations.play('come');
				break;
				case 11:
				pl5sprite.x = pl5Pos[11][0];
				pl5sprite.y = pl5Pos[11][1];
				pl5sprite.animations.play('come');
				break;
				case 12:
				pl5sprite.x = pl5Pos[12][0];
				pl5sprite.y = pl5Pos[12][1];
				pl5sprite.animations.play('come');
				break;
				case 13:
				pl5sprite.x = pl5Pos[13][0];
				pl5sprite.y = pl5Pos[13][1];
				pl5sprite.animations.play('come');
				break;
				case 14:
				pl5sprite.x = pl5Pos[14][0];
				pl5sprite.y = pl5Pos[14][1];
				pl5sprite.animations.play('come');
				break;
				case 15:
				pl5sprite.x = pl5Pos[15][0];
				pl5sprite.y = pl5Pos[15][1];
				pl5sprite.animations.play('come');
				break;
				default:
				break;
				}
				}, 1000);
			break;
		break;
		case 5:
			pl6sprite.animations.play('go');
			setTimeout (function() {
			switch (players[turn].position){
				case 0:
				pl6sprite.x = pl6Pos[0][0];
				pl6sprite.y = pl6Pos[0][1];
				pl6sprite.animations.play('come');
				break;
				case 1:
				pl6sprite.x = pl6Pos[1][0];
				pl6sprite.y = pl6Pos[1][1];
				pl6sprite.animations.play('come');
				break;
				case 2:
				pl6sprite.x = pl6Pos[2][0];
				pl6sprite.y = pl6Pos[2][1];
				pl6sprite.animations.play('come');
				break;
				case 3:
				pl6sprite.x = pl6Pos[3][0];
				pl6sprite.y = pl6Pos[3][1];
				pl6sprite.animations.play('come');
				break;
				case 4:
				pl6sprite.x = pl6Pos[4][0];
				pl6sprite.y = pl6Pos[4][1];
				pl6sprite.animations.play('come');
				break;
				case 5:
				pl6sprite.x = pl6Pos[5][0];
				pl6sprite.y = pl6Pos[5][1];
				pl6sprite.animations.play('come');
				break;
				case 6:
				pl6sprite.x = pl6Pos[6][0];
				pl6sprite.y = pl6Pos[6][1];
				pl6sprite.animations.play('come');
				break;
				case 7:
				pl6sprite.x = pl6Pos[7][0];
				pl6sprite.y = pl6Pos[7][1];
				pl6sprite.animations.play('come');
				break;
				case 8:
				pl6sprite.x = pl6Pos[8][0];
				pl6sprite.y = pl6Pos[8][1];
				pl6sprite.animations.play('come');
				break;
				case 9:
				pl6sprite.x = pl6Pos[9][0];
				pl6sprite.y = pl6Pos[9][1];
				pl6sprite.animations.play('come');
				break;
				case 10:
				pl6sprite.x = pl6Pos[10][0];
				pl6sprite.y = pl6Pos[10][1];
				pl6sprite.animations.play('come');
				break;
				case 11:
				pl6sprite.x = pl6Pos[11][0];
				pl6sprite.y = pl6Pos[11][1];
				pl6sprite.animations.play('come');
				break;
				case 12:
				pl6sprite.x = pl6Pos[12][0];
				pl6sprite.y = pl6Pos[12][1];
				pl6sprite.animations.play('come');
				break;
				case 13:
				pl6sprite.x = pl6Pos[13][0];
				pl6sprite.y = pl6Pos[13][1];
				pl6sprite.animations.play('come');
				break;
				case 14:
				pl6sprite.x = pl6Pos[14][0];
				pl6sprite.y = pl6Pos[14][1];
				pl6sprite.animations.play('come');
				break;
				case 15:
				pl6sprite.x = pl6Pos[15][0];
				pl6sprite.y = pl6Pos[15][1];
				pl6sprite.animations.play('come');
				break;
				default:
				break;
				}
				}, 1000);
			break;
		break;
		case 6:
			pl7sprite.animations.play('go');
			setTimeout (function() {
			switch (players[turn].position){
				case 0:
				pl7sprite.x = pl7Pos[0][0];
				pl7sprite.y = pl7Pos[0][1];
				pl7sprite.animations.play('come');
				break;
				case 1:
				pl7sprite.x = pl7Pos[1][0];
				pl7sprite.y = pl7Pos[1][1];
				pl7sprite.animations.play('come');
				break;
				case 2:
				pl7sprite.x = pl7Pos[2][0];
				pl7sprite.y = pl7Pos[2][1];
				pl7sprite.animations.play('come');
				break;
				case 3:
				pl7sprite.x = pl7Pos[3][0];
				pl7sprite.y = pl7Pos[3][1];
				pl7sprite.animations.play('come');
				break;
				case 4:
				pl7sprite.x = pl7Pos[4][0];
				pl7sprite.y = pl7Pos[4][1];
				pl7sprite.animations.play('come');
				break;
				case 5:
				pl7sprite.x = pl7Pos[5][0];
				pl7sprite.y = pl7Pos[5][1];
				pl7sprite.animations.play('come');
				break;
				case 6:
				pl7sprite.x = pl7Pos[6][0];
				pl7sprite.y = pl7Pos[6][1];
				pl7sprite.animations.play('come');
				break;
				case 7:
				pl7sprite.x = pl7Pos[7][0];
				pl7sprite.y = pl7Pos[7][1];
				pl7sprite.animations.play('come');
				break;
				case 8:
				pl7sprite.x = pl7Pos[8][0];
				pl7sprite.y = pl7Pos[8][1];
				pl7sprite.animations.play('come');
				break;
				case 9:
				pl7sprite.x = pl7Pos[9][0];
				pl7sprite.y = pl7Pos[9][1];
				pl7sprite.animations.play('come');
				break;
				case 10:
				pl7sprite.x = pl7Pos[10][0];
				pl7sprite.y = pl7Pos[10][1];
				pl7sprite.animations.play('come');
				break;
				case 11:
				pl7sprite.x = pl7Pos[11][0];
				pl7sprite.y = pl7Pos[11][1];
				pl7sprite.animations.play('come');
				break;
				case 12:
				pl7sprite.x = pl7Pos[12][0];
				pl7sprite.y = pl7Pos[12][1];
				pl7sprite.animations.play('come');
				break;
				case 13:
				pl7sprite.x = pl7Pos[13][0];
				pl7sprite.y = pl7Pos[13][1];
				pl7sprite.animations.play('come');
				break;
				case 14:
				pl7sprite.x = pl7Pos[14][0];
				pl7sprite.y = pl7Pos[14][1];
				pl7sprite.animations.play('come');
				break;
				case 15:
				pl7sprite.x = pl7Pos[15][0];
				pl7sprite.y = pl7Pos[15][1];
				pl7sprite.animations.play('come');
				break;
				default:
				break;
				}
				}, 1000);
			break;
		break;
		case 7:
			pl8sprite.animations.play('go');
			setTimeout (function() {
			switch (players[turn].position){
				case 0:
				pl8sprite.x = pl8Pos[0][0];
				pl8sprite.y = pl8Pos[0][1];
				pl8sprite.animations.play('come');
				break;
				case 1:
				pl8sprite.x = pl8Pos[1][0];
				pl8sprite.y = pl8Pos[1][1];
				pl8sprite.animations.play('come');
				break;
				case 2:
				pl8sprite.x = pl8Pos[2][0];
				pl8sprite.y = pl8Pos[2][1];
				pl8sprite.animations.play('come');
				break;
				case 3:
				pl8sprite.x = pl8Pos[3][0];
				pl8sprite.y = pl8Pos[3][1];
				pl8sprite.animations.play('come');
				break;
				case 4:
				pl8sprite.x = pl8Pos[4][0];
				pl8sprite.y = pl8Pos[4][1];
				pl8sprite.animations.play('come');
				break;
				case 5:
				pl8sprite.x = pl8Pos[5][0];
				pl8sprite.y = pl8Pos[5][1];
				pl8sprite.animations.play('come');
				break;
				case 6:
				pl8sprite.x = pl8Pos[6][0];
				pl8sprite.y = pl8Pos[6][1];
				pl8sprite.animations.play('come');
				break;
				case 7:
				pl8sprite.x = pl8Pos[7][0];
				pl8sprite.y = pl8Pos[7][1];
				pl8sprite.animations.play('come');
				break;
				case 8:
				pl8sprite.x = pl8Pos[8][0];
				pl8sprite.y = pl8Pos[8][1];
				pl8sprite.animations.play('come');
				break;
				case 9:
				pl8sprite.x = pl8Pos[9][0];
				pl8sprite.y = pl8Pos[9][1];
				pl8sprite.animations.play('come');
				break;
				case 10:
				pl8sprite.x = pl8Pos[10][0];
				pl8sprite.y = pl8Pos[10][1];
				pl8sprite.animations.play('come');
				break;
				case 11:
				pl8sprite.x = pl8Pos[11][0];
				pl8sprite.y = pl8Pos[11][1];
				pl8sprite.animations.play('come');
				break;
				case 12:
				pl8sprite.x = pl8Pos[12][0];
				pl8sprite.y = pl8Pos[12][1];
				pl8sprite.animations.play('come');
				break;
				case 13:
				pl8sprite.x = pl8Pos[13][0];
				pl8sprite.y = pl8Pos[13][1];
				pl8sprite.animations.play('come');
				break;
				case 14:
				pl8sprite.x = pl8Pos[14][0];
				pl8sprite.y = pl8Pos[14][1];
				pl8sprite.animations.play('come');
				break;
				case 15:
				pl8sprite.x = pl8Pos[15][0];
				pl8sprite.y = pl8Pos[15][1];
				pl8sprite.animations.play('come');
				break;
				default:
				break;
				}
				}, 1000);
			break;
		break;
		case 8:
			pl9sprite.animations.play('go');
			setTimeout (function() {
			switch (players[turn].position){
				case 0:
				pl9sprite.x = pl9Pos[0][0];
				pl9sprite.y = pl9Pos[0][1];
				pl9sprite.animations.play('come');
				break;
				case 1:
				pl9sprite.x = pl9Pos[1][0];
				pl9sprite.y = pl9Pos[1][1];
				pl9sprite.animations.play('come');
				break;
				case 2:
				pl9sprite.x = pl9Pos[2][0];
				pl9sprite.y = pl9Pos[2][1];
				pl9sprite.animations.play('come');
				break;
				case 3:
				pl9sprite.x = pl9Pos[3][0];
				pl9sprite.y = pl9Pos[3][1];
				pl9sprite.animations.play('come');
				break;
				case 4:
				pl9sprite.x = pl9Pos[4][0];
				pl9sprite.y = pl9Pos[4][1];
				pl9sprite.animations.play('come');
				break;
				case 5:
				pl9sprite.x = pl9Pos[5][0];
				pl9sprite.y = pl9Pos[5][1];
				pl9sprite.animations.play('come');
				break;
				case 6:
				pl9sprite.x = pl9Pos[6][0];
				pl9sprite.y = pl9Pos[6][1];
				pl9sprite.animations.play('come');
				break;
				case 7:
				pl9sprite.x = pl9Pos[7][0];
				pl9sprite.y = pl9Pos[7][1];
				pl9sprite.animations.play('come');
				break;
				case 8:
				pl9sprite.x = pl9Pos[8][0];
				pl9sprite.y = pl9Pos[8][1];
				pl9sprite.animations.play('come');
				break;
				case 9:
				pl9sprite.x = pl9Pos[9][0];
				pl9sprite.y = pl9Pos[9][1];
				pl9sprite.animations.play('come');
				break;
				case 10:
				pl9sprite.x = pl9Pos[10][0];
				pl9sprite.y = pl9Pos[10][1];
				pl9sprite.animations.play('come');
				break;
				case 11:
				pl9sprite.x = pl9Pos[11][0];
				pl9sprite.y = pl9Pos[11][1];
				pl9sprite.animations.play('come');
				break;
				case 12:
				pl9sprite.x = pl9Pos[12][0];
				pl9sprite.y = pl9Pos[12][1];
				pl9sprite.animations.play('come');
				break;
				case 13:
				pl9sprite.x = pl9Pos[13][0];
				pl9sprite.y = pl9Pos[13][1];
				pl9sprite.animations.play('come');
				break;
				case 14:
				pl9sprite.x = pl9Pos[14][0];
				pl9sprite.y = pl9Pos[14][1];
				pl9sprite.animations.play('come');
				break;
				case 15:
				pl9sprite.x = pl9Pos[15][0];
				pl9sprite.y = pl9Pos[15][1];
				pl9sprite.animations.play('come');
				break;
				default:
				break;
				}
				}, 1000);
			break;
		break;
	//console.log('X After: ', pl2sprite.x);
	//console.log('Y After: ', pl2sprite.y);
		}		

}

function initializeSprites() {

 pl1Pos = {
	0: [1100 * scaleRate, 465* scaleRate],
	1: [930* scaleRate, 465* scaleRate],
	2: [750* scaleRate, 465* scaleRate],
	3: [570* scaleRate, 465* scaleRate],
	4: [390* scaleRate, 465* scaleRate],
	5: [210* scaleRate, 465* scaleRate],
	6: [30* scaleRate, 465* scaleRate],
	7: [30* scaleRate, 295* scaleRate],
	8: [30* scaleRate, 110* scaleRate],
	9: [210* scaleRate, 110* scaleRate],
	10: [390* scaleRate, 110* scaleRate],
	11: [570* scaleRate, 110* scaleRate],
	12: [750* scaleRate, 110* scaleRate],
	13: [930* scaleRate, 110* scaleRate],
	14: [1100* scaleRate, 110* scaleRate],
	15: [1100* scaleRate, 295* scaleRate]
	}

 pl2Pos = {
	0: [1100 * scaleRate, 505* scaleRate],
	1: [930* scaleRate, 505* scaleRate],
	2: [750* scaleRate, 505* scaleRate],
	3: [570* scaleRate, 505* scaleRate],
	4: [390* scaleRate, 505* scaleRate],
	5: [210* scaleRate, 505* scaleRate],
	6: [30* scaleRate, 505* scaleRate],
	7: [30* scaleRate, 335* scaleRate],
	8: [30* scaleRate, 150* scaleRate],
	9: [210* scaleRate, 150* scaleRate],
	10: [390* scaleRate, 150* scaleRate],
	11: [570* scaleRate, 150* scaleRate],
	12: [750* scaleRate, 150* scaleRate],
	13: [930* scaleRate, 150* scaleRate],
	14: [1100* scaleRate, 150* scaleRate],
	15: [1100* scaleRate, 335* scaleRate]
}

 pl3Pos = {
	0: [1100 * scaleRate, 545* scaleRate],
	1: [930* scaleRate, 545* scaleRate],
	2: [750* scaleRate, 545* scaleRate],
	3: [570* scaleRate, 545* scaleRate],
	4: [390* scaleRate, 545* scaleRate],
	5: [210* scaleRate, 545* scaleRate],
	6: [30* scaleRate, 545* scaleRate],
	7: [30* scaleRate, 375* scaleRate],
	8: [30* scaleRate, 190* scaleRate],
	9: [210* scaleRate, 190* scaleRate],
	10: [390* scaleRate, 190* scaleRate],
	11: [570* scaleRate, 190* scaleRate],
	12: [750* scaleRate, 190* scaleRate],
	13: [930* scaleRate, 190* scaleRate],
	14: [1100* scaleRate, 190* scaleRate],
	15: [1100* scaleRate, 375 * scaleRate]
}

 pl4Pos = {
	0: [1140 * scaleRate, 465* scaleRate],
	1: [970* scaleRate, 465* scaleRate],
	2: [790* scaleRate, 465* scaleRate],
	3: [610* scaleRate, 465* scaleRate],
	4: [430* scaleRate, 465* scaleRate],
	5: [250* scaleRate, 465* scaleRate],
	6: [80* scaleRate, 465* scaleRate],
	7: [80* scaleRate, 295* scaleRate],
	8: [80* scaleRate, 110* scaleRate],
	9: [250* scaleRate, 110* scaleRate],
	10: [430* scaleRate, 110* scaleRate],
	11: [610* scaleRate, 110* scaleRate],
	12: [790* scaleRate, 110* scaleRate],
	13: [970* scaleRate, 110* scaleRate],
	14: [1140* scaleRate, 110* scaleRate],
	15: [1140* scaleRate, 295* scaleRate]
}

 pl5Pos = {
	0: [1140 * scaleRate, 505* scaleRate],
	1: [970* scaleRate, 505* scaleRate],
	2: [790* scaleRate, 505* scaleRate],
	3: [610* scaleRate, 505* scaleRate],
	4: [430* scaleRate, 505* scaleRate],
	5: [250* scaleRate, 505* scaleRate],
	6: [80* scaleRate, 505* scaleRate],
	7: [80* scaleRate, 335* scaleRate],
	8: [80* scaleRate, 150* scaleRate],
	9: [250* scaleRate, 150* scaleRate],
	10: [430* scaleRate, 150* scaleRate],
	11: [610* scaleRate, 150* scaleRate],
	12: [790* scaleRate, 150* scaleRate],
	13: [970* scaleRate, 150* scaleRate],
	14: [1140* scaleRate, 150* scaleRate],
	15: [1140* scaleRate, 335* scaleRate]
}

 pl6Pos = {
	0: [1140 * scaleRate, 545* scaleRate],
	1: [970* scaleRate, 545* scaleRate],
	2: [790* scaleRate, 545* scaleRate],
	3: [610* scaleRate, 545* scaleRate],
	4: [430* scaleRate, 545* scaleRate],
	5: [250* scaleRate, 545* scaleRate],
	6: [80* scaleRate, 545* scaleRate],
	7: [80* scaleRate, 375* scaleRate],
	8: [80* scaleRate, 190* scaleRate],
	9: [250* scaleRate, 190* scaleRate],
	10: [430* scaleRate, 190* scaleRate],
	11: [610* scaleRate, 190* scaleRate],
	12: [790* scaleRate, 190* scaleRate],
	13: [970* scaleRate, 190* scaleRate],
	14: [1140* scaleRate, 190* scaleRate],
	15: [1140* scaleRate, 375* scaleRate]
}

 pl7Pos = {
	0: [1180 * scaleRate, 465* scaleRate],
	1: [1010* scaleRate, 465* scaleRate],
	2: [830* scaleRate, 465* scaleRate],
	3: [650* scaleRate, 465* scaleRate],
	4: [470* scaleRate, 465* scaleRate],
	5: [290* scaleRate, 465* scaleRate],
	6: [120* scaleRate, 465* scaleRate],
	7: [120* scaleRate, 295* scaleRate],
	8: [120* scaleRate, 110* scaleRate],
	9: [290* scaleRate, 110* scaleRate],
	10: [470* scaleRate, 110* scaleRate],
	11: [650* scaleRate, 110* scaleRate],
	12: [830* scaleRate, 110* scaleRate],
	13: [1010* scaleRate, 110* scaleRate],
	14: [1180* scaleRate, 110* scaleRate],
	15: [1180* scaleRate, 295* scaleRate]
}

 pl8Pos = {
	0: [1180 * scaleRate, 505* scaleRate],
	1: [1010* scaleRate, 505* scaleRate],
	2: [830* scaleRate, 505* scaleRate],
	3: [650* scaleRate, 505* scaleRate],
	4: [470* scaleRate, 505* scaleRate],
	5: [290* scaleRate, 505* scaleRate],
	6: [120* scaleRate, 505* scaleRate],
	7: [120* scaleRate, 335* scaleRate],
	8: [120* scaleRate, 150* scaleRate],
	9: [290* scaleRate, 150* scaleRate],
	10: [470* scaleRate, 150* scaleRate],
	11: [650* scaleRate, 150* scaleRate],
	12: [830* scaleRate, 150* scaleRate],
	13: [1010* scaleRate, 150* scaleRate],
	14: [1180* scaleRate, 150* scaleRate],
	15: [1180* scaleRate, 335* scaleRate]
}

pl9Pos = {
	0: [1180 * scaleRate, 545* scaleRate],
	1: [1010* scaleRate, 545* scaleRate],
	2: [830* scaleRate, 545* scaleRate],
	3: [650* scaleRate, 545* scaleRate],
	4: [470* scaleRate, 545* scaleRate],
	5: [290* scaleRate, 545* scaleRate],
	6: [120* scaleRate, 545* scaleRate],
	7: [120* scaleRate, 375* scaleRate],
	8: [120* scaleRate, 190* scaleRate],
	9: [290* scaleRate, 190* scaleRate],
	10: [470* scaleRate, 190* scaleRate],
	11: [650* scaleRate, 190* scaleRate],
	12: [830* scaleRate, 190* scaleRate],
	13: [1010* scaleRate, 190* scaleRate],
	14: [1180* scaleRate, 190* scaleRate],
	15: [1180* scaleRate, 375* scaleRate]
}
}