"use strict";

BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    /*
    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
    
    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    */
    
    // For optional clarity, you can initialize
    // member variables here. Otherwise, you will do it in create().

	
};

BasicGame.Game.prototype = {

    create: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        
        // Create a sprite at the center of the screen using the 'logo' image.
        //this.bouncy = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'logo' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        //this.bouncy.anchor.setTo( 0.5, 0.5 );
        //this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'mydude');
        // Turn on the arcade physics engine for this sprite.
        //this.game.physics.enable( this.bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        //this.bouncy.body.collideWorldBounds = true;
        //this.player.collideWorldBounds = true;
		this.add.image(0,0, 'laundromat');
		//this.machineOne = this.add.sprite( 50, 400, 'washer' );
		this.machineOne = this.add.sprite( 100, 400, 'washerXL' );
		this.machineTwo = this.add.sprite(250, 400, 'washerXL' );
		this.machineThree = this.add.sprite(400, 400, 'washerXL' );
		this.machineFour = this.add.sprite(550, 400, 'washerXL' );
		this.add.image(650, 20, 'sock');
		this.music = this.add.audio('gameMusic');
		this.music.play();
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#153BC8", align: "center" };
		var socks;
		var pants;
		var shirts;
        this.tutText = this.add.text( this.game.world.centerX, 45, "Collect the matching clothes!", style );
        this.tutText.anchor.setTo( 0.5, 0.0 );
		this.timeText = this.add.text( this.game.world.centerX, 15, "", style );
        this.timeText.anchor.setTo(0.5, 0.0);
		this.socks = this.add.sprite(100, 200, 'sock');
		this.pants = this.add.sprite(300, 200, 'pants');
		this.shirts = this.add.sprite(500, 200, 'shirt');
		this.lives = 3;
		var timeText;
		var grabbing = 1;//1 sock 2 pants 3 shirt
		this.score = 0;
		this.scoreText = this.add.text(25,50, "Score: 0",{ font: "bold 32px Arial", fill: "#8215C8", boundsAlignH: "center", boundsAlignV: "middle" });
		this.lifeText = this.add.text(25,25, "Lives: 3", { font: "bold 32px Arial", fill: "#8215C8", boundsAlignH: "center", boundsAlignV: "middle" });
		//this.game.physics.enable(this.socks, Phaser.Physics.ARCADE);
		//this.socks.create(100, 200, 'sock');
		this.socks.inputEnabled = true;
		this.pants.inputEnabled = true;
		this.shirts.inputEnabled = true;
		this.socks.events.onInputDown.add(checkSock, this);
		this.pants.events.onInputDown.add(checkPants, this);
		this.shirts.events.onInputDown.add(checkShirts, this);
		//this.timer = this.time.create(false);
		//this.timer.loop(60000, updateTime(), this);
		//this.timer.start;
		this.time.events.add(60000, this.update(), this);
		this.currentTime = 60000;
        // When you click on the sprite, you go back to the MainMenu.
        //this.bouncy.inputEnabled = true;
        //this.bouncy.events.onInputDown.add( function() { this.quitGame(); }, this );
    },

    update: function () {
		
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.lifeText.setText("Lives: "+this.lives);
		if(this.score != 0 || this.lives != 3){
			this.tutText.setText("");
			this.timeText.setText("Time: 60");
		}
		//console.log( this.time.events.duration);
		//console.log(this.time.totalElapsedSeconds);
		console.log(this.currentTime);
		if(this.currentTime >= 56600){
				//console.log("halfway");
				this.currentTime--;
		}
		this.timeText.setText("Time: "+ this.time.events.duration);
		this.scoreText.setText("Score: "+this.score);
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //this.bouncy.rotation = this.game.physics.arcade.accelerateToPointer( this.bouncy, this.game.input.activePointer, 500, 500, 500 );
		if(this.lives == 0){
			this.quitGame();
		}
		if(this.currentTime < 56600){
			this.quitGame();
		}
    },
	
    quitGame: function () {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
		this.music.stop();
        //  Then let's go back to the main menu.
        this.state.start('GameOver');

    }
	
};
function checkSock(grabbing){
			this.score ++;
			moveSprites(this);
	}
function checkPants(grabbing){
		console.log('check');
		if(grabbing != 2){
			this.lives--;
		}
		else{
			this.score += 100;
		}
			moveSprites(this);
	}
function checkShirts(grabbing){
		console.log('check');
		if(grabbing != 3){
			this.lives--;
		}
		else{
			this.score += 100;
		}
		moveSprites(this);
	}
function moveSprites(game){
	console.log("move sprites");
	game.grabbing = game.rnd.integerInRange(1, 3);
	console.log(game.grabbing);
	//100 300 500
	if(game.grabbing == 1){
		game.pants.x = 100;
	}
	else if(game.grabbing == 2){
		game.pants.x = 300;
	}
	else{
		game.pants.x = 500;
	}
	var pos1 = game.grabbing;
		do{
			game.grabbing = game.rnd.integerInRange(1,3);
		}
		while(pos1 == game.grabbing);//end when different value
	console.log(game.grabbing);
	if(game.grabbing == 1){
		game.socks.x = 100;
	}
	else if(game.grabbing == 2){
		game.socks.x = 300;
	}
	else{
		game.socks.x = 500;
	}	
	var pos2 = game.grabbing;
	game.grabbing = 0;
	do{
		game.grabbing++;
	}
	while(game.grabbing == pos1 || game.grabbing == pos2);//get last pos
	if(game.grabbing == 1){
		game.shirts.x = 100;
	}
	else if(game.grabbing == 2){
		game.shirts.x = 300;
	}
	else{
		game.shirts.x = 500;
	}	
	game.grabbing == 1;
			
		
}	
function updateTime(game){
	game.currentTime++;
}




