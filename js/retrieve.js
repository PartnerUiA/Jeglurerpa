const iPadSafari =
        !!userAgent.match(/iPad/i) &&       // Detect iPad first.
        !!userAgent.match(/WebKit/i) &&     // Filter browsers with webkit engine only
        !userAgent.match(/CriOS/i) &&       // Eliminate Chrome & Brave
        !userAgent.match(/OPiOS/i) &&       // Rule out Opera
        !userAgent.match(/FxiOS/i) &&       // Rule out Firefox
        !userAgent.match(/FocusiOS/i);      // Eliminate Firefox Focus as well!

    const element = document.getElementById('fullScreenButton');

    function iOS() {
        if (userAgent.match(/ipad|iphone|ipod/i)) {
            const iOS = {};
            iOS.majorReleaseNumber = +userAgent.match(/OS (\d)?\d_\d(_\d)?/i)[0].split('_')[0].replace('OS ', '');
            return iOS;
        }
    }

    if (element !== null) {
        if (userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
            element.className += ' hidden';
        } else if (userAgent.match(/iPad/i) && iOS().majorReleaseNumber < 12) {
            element.className += ' hidden';
        } else if (userAgent.match(/iPad/i) && !iPadSafari) {
            element.className += ' hidden';
        } else {
            element.addEventListener('click', _toggleFullScreen, false);
        }
    }


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




 preload: function() {
        game.load.image("closeButton", "images/closeButton.png");
        game.load.image("boxBack", "images/boxBack.png");
        game.load.image("testButton", "images/testButton.png");
    },
    create: function() {
        //create a test button to launch the message box
    	var buttonTest=game.add.sprite(game.width/2,game.height/2,"testButton");
    	buttonTest.anchor.set(0.5,0.5);
    	buttonTest.inputEnabled=true;
    	buttonTest.events.onInputDown.add(this.testMessageBox,this);
    },
    testMessageBox() {
        //call this line of code when you want to show the message box
        //message, width and height
        this.showMessageBox("HELLO THERE! Put Some Text Here!", game.width * .7, game.height * .5);
    },
    //
    //w=width
    //h=height
    //
    showMessageBox(text, w = 300, h = 300) {
    	//just in case the message box already exists
    	//destroy it
        if (this.msgBox) {
            this.msgBox.destroy();
        }
        //make a group to hold all the elements
        var msgBox = game.add.group();
        //make the back of the message box
        var back = game.add.sprite(0, 0, "boxBack");
        //make the close button
        var closeButton = game.add.sprite(0, 0, "closeButton");
        //make a text field
        var text1 = game.add.text(0, 0, text);
        //set the textfeild to wrap if the text is too long
        text1.wordWrap = true;
        //make the width of the wrap 90% of the width 
        //of the message box
        text1.wordWrapWidth = w * .9;
        //
        //
        //set the width and height passed
        //in the parameters
        back.width = w;
        back.height = h;
        //
        //
        //
        //add the elements to the group
        msgBox.add(back);
        msgBox.add(closeButton);
        msgBox.add(text1);
        //
        //set the close button
        //in the center horizontally
        //and near the bottom of the box vertically
        closeButton.x = back.width / 2 - closeButton.width / 2;
        closeButton.y = back.height - closeButton.height;
        //enable the button for input
        closeButton.inputEnabled = true;
        //add a listener to destroy the box when the button is pressed
        closeButton.events.onInputDown.add(this.hideBox, this);
        //
        //
        //set the message box in the center of the screen
        msgBox.x = game.width / 2 - msgBox.width / 2;
        msgBox.y = game.height / 2 - msgBox.height / 2;
        //
        //set the text in the middle of the message box
        text1.x = back.width / 2 - text1.width / 2;
        text1.y = back.height / 2 - text1.height / 2;
        //make a state reference to the messsage box
        this.msgBox = msgBox;
    },
    hideBox() {
    	//destroy the box when the button is pressed
        this.msgBox.destroy();
    },
    update: function() {}
}

//in create

			/*pl2come.animations.add('go');
			pl2go.animations.add('come');
			pl2come.animations.play('go', 15, false);
			setTimeout (function (){
				pl2come.animations.play('come', 15, false);	
			}, 500);
			*/
		
			
			//pl2sprite.animations.add('go', [1,2,3,4,5,6,7]);
			//pl2sprite.animations.add('come', [8,9,10,11,12]);
			//console.log("Case3");
		//	break;
			//redd = game.add.sprite(1080 * scaleRate, 370 * scaleRate, 'pl1anim');
		/*	
			redd.animations.add('go', [1,2,3,4,5,6,7]);
			redd.animations.add('come', [8,9,10,11,12,13,14]);
			redd.animations.play('go');
			console.log('L: ', players.length);
			break;
			case 3:
			console.log('L: ', players.length);
			pl1sprite = game.add.sprite(game.world.centerX-200,game.world.centerY, 'pl1anim');
			pl2sprite = game.add.sprite(game.world.centerX-300,game.world.centerY, 'pl2anim');
			pl3sprite = game.add.sprite(game.world.centerX-400,game.world.centerY, 'pl3anim');
			pl1sprite.animations.add('go', [0,1,2,3,4,5,6]);
			pl2sprite.animations.add('go', [0,1,2,3,4,5,6]);
			pl3sprite.animations.add('go', [0,1,2,3,4,5,6]);
			pl1sprite.animations.add('come', [7,8,9,10,11,12,13]);
			pl2sprite.animations.add('come', [7,8,9,10,11,12,13]);
			pl3sprite.animations.add('come', [7,8,9,10,11,12,13]);
			break;
			
			case 4:
			console.log('L: ', players.length);
			break;
			case 5:
			console.log('L: ', players.length);
			break;
			case 6:
			console.log('L: ', players.length);
			break;
			case 7:
			console.log('L: ', players.length);
			break;
			case 8:
			console.log('L: ', players.length);
			break;
			case 9:
			console.log('L: ', players.length);
			break;

			/*
		redGo = game.add.sprite(game.world.centerX-200,game.world.centerY, 'redanim');
		redGo.animations.add('walk');
		redCome = game.add.sprite(game.world.centerX-200,game.world.centerY, 'redanim2');
		redCome.animations.add('walk2');
		
		redd = game.add.sprite(1080 * scaleRate, 370 * scaleRate, 'redanima');
		redd.scale.setTo(scaleRate, scaleRate);

		redd.animations.add('go', [1,2,3,4,5,6,7]);
		redd.animations.add('come', [8,9,10,11,12,13, 14]);
		*/

				//fscrnBtn.scale.setTo(0.5,0.5);
		//exFscrnBtn.scale.setTo(0.5,0.5);
		/*
		Adding sprites
		*/
		//var gameBoard = game.add.sprite(game.world.centerX, game.world.centerY, 'gameBoard');
		
		//pl1 = gameBoard.addChild(game.make.sprite(-50,450,'pl1'));
		//pl2 = gameBoard.addChild(game.make.sprite(-50,430,'pl2'));
		//pl3 = gameBoard.addChild(game.make.sprite(-50,410,'pl3'));

		//pl1.scale.setTo(1280/720,1280/720);
		//pl2.scale.setTo(1280/720,1280/720);
		//pl3.scale.setTo(1280/720,1280/720);
		
		/*
		gameBoard.anchor.x = 0.5;
		gameBoard.anchor.y = 0.5;
		gameBoard.scale.setTo(720/1280,720/1280);
*/

		//this.plRed = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'plRed');
		//this.plRed.anchor.setTo(0.5, 0.5);
		// How to Scale this.plRed.scale.setTo(2,2);



		/*
function removeFromMap(location){
	locTrack[location].pop();
}
function addToMap(location) {
	locTrack[location].push(1);
}
*/

		//game.add.text(tester, style);
///		var pl1 = game.add.sprite()
/*
		var ylSq1 = game.add.sprite(game.world.centerX - 250, game.world.centerY - 250, 'ylSq');
		var ylSq2 = game.add.sprite(game.world.centerX - 250, game.world.centerY - 250, 'ylSq');
		var ylSq3 = game.add.sprite(game.world.centerX - 250, game.world.centerY - 250, 'ylSq');
		var ylSq4 = game.add.sprite(game.world.centerX - 250, game.world.centerY - 250, 'ylSq');
		var blSq1 = game.add.sprite(game.world.centerX - 250, game.world.centerY - 250, 'blSq');
		var blSq2 = game.add.sprite(game.world.centerX - 250, game.world.centerY - 250, 'blSq');
		var blSq3 = game.add.sprite(game.world.centerX - 250, game.world.centerY - 250, 'blSq');
		var blSq4 = game.add.sprite(game.world.centerX - 250, game.world.centerY - 250, 'blSq');
		var grSq1 = game.add.sprite(game.world.centerX - 250, game.world.centerY - 250, 'grSq');
		var grSq2 = game.add.sprite(game.world.centerX - 250, game.world.centerY - 250, 'grSq');
		var grSq3 = game.add.sprite(game.world.centerX - 250, game.world.centerY - 250, 'grSq');
		var grSq4 = game.add.sprite(game.world.centerX - 250, game.world.centerY - 250, 'grSq');
		var reSq1 = game.add.sprite(game.world.centerX - 250, game.world.centerY - 250, 'reSq');
		var reSq2 = game.add.sprite(game.world.centerX - 250, game.world.centerY - 250, 'reSq');
		var reSq3 = game.add.sprite(game.world.centerX - 250, game.world.centerY - 250, 'reSq');
		var reSq4 = game.add.sprite(game.world.centerX - 250, game.world.centerY - 250, 'reSq');
		
		*/

		
		/*
		Creating sprite groups for common resizing
		*/

		/*
		All sprites are loaded in here.
		 */