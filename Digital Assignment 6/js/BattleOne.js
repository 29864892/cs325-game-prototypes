"use strict"

BasicGame.BattleOne = function (game) {

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

BasicGame.BattleOne.prototype = {

    create: function () {
		this.music = this.add.audio('gameMusic');
		this.music.play();
        
		this.add.sprite(0, 0, 'ui');
		//buttons
		this.messageScreen = this.add.sprite(0,0,'messageUI');
		this.playButton = this.add.button( 720, 480, 'click', this.startBattle, this);
		this.continueButton = this.add.button(720,480, 'click', this.hideMessageUI, this);
		this.continueButton.visible = false;
		this.messageScreen.visible = false;
		this.itemButton;
		this.attackButton;
		this.runButton;
		this.EncounterText = this.add.text(50, 370, "A Penciler wants to fight!",{ font: "bold 32px Impact", fill: "#8215C8", boundsAlignH: "center", boundsAlignV: "middle" });
		//player
		this.player = this.add.sprite(60,230,'iFighter');
		this.playerName = new String("Bapple iFighter");
		this.pHealth = 100;
		this.playerName = this.add.text(50,40,"Bapple Ifighter",{font: "16px Comic Sans MS", fill: "#8215C8", boundsAlignH: "center", boundsAlignV: "middle" });
		this.healthText = this.add.text(50, 60, "Health: 100",{font: "16px Comic Sans MS", fill: "#8215C8", boundsAlignH: "center", boundsAlignV: "middle" });
		this.isLow = false;
		this.isTurn = true; 
		this.lowSprite = this.add.sprite(60,230,'iFighterF');
		this.lowSprite.visible = false;
		//charge attack
		this.chargeSprite = this.add.sprite(60,180,'charged');
		this.chargeSprite.visible = false;
		this.chargeVal = 0;//charge = 6 -> battle won instantly
		//attacks
		this.customerSupportButton;
		this.healPunish = 0;
		this.smartPunchButton;
		this.wrongNumberButton;
		this.chargeButton;//boost attack multiplier by .25
		this.attackM = 1.00;
		
		//enemy
		this.enemy = this.add.sprite(590, 135, 'penciler');
		this.eHealth = 200;
		this.enemyName = this.add.text(600,40,"Penciler",{font: "16px Comic Sans MS", fill: "#8215C8", boundsAlignH: "center", boundsAlignV: "middle" });
		this.eHealthText = this.add.text(600,60, "Health: 200",{font: "16px Comic Sans MS", fill: "#8215C8", boundsAlignH: "center", boundsAlignV: "middle" });
		this.isLowE = false;
		this.isTurnE = false;
		this.damageM = 1.00;
		this.eLowSprite = this.add.sprite(590, 135, 'pencilerF');
		this.eLowSprite.visible = false;
		//attacks
		this.leadShot;
		this.battling = false;
		this.mainUIVisible = false;
		console.log('battle begin!');
		this.chargedUp = false;
		this.end = false;
		this.won = true;
		this.lowPrompt = true;
	},

    update: function () {
		if(this.continueButton.visible == false && this.end == true){
			if(!this.won){
				this.quitGame();
			}
			else{
				this.gameWon();
			}
		}
		if(this.chargeVal >= 6){
			this.chargedUp = true;
		}
		this.healthText.setText("Health: " + this.pHealth);
		this.eHealthText.setText("Health: " + this.eHealth);
		//health conditions
		if(this.pHealth < 50 && this.isLow == false){
			//change sprite
			this.player.visible = false;
			this.chargeSprite.visible = false;
			this.lowSprite.visible = true;
			this.isLow = true;
		}
		if(this.pHealth > 50 && this.isLow == true){
			//change sprite
			this.player.visible = true;
			this.lowSprite.visible = false;
			this.isLow = false;
		}
		if(this.eHealth < 50 && this.isLowE == false){
			//change sprite
			this.eLowSprite.visible = true;
			this.enemy.visible = false;
			this.isLowE = true;
		}
		if(this.pHealth <= 0 && this.continueButton.visible == false){
			if(this.end == false){
				this.EncounterText.setText('Bapple Ifighter shut down!' ,{ font: "bold 32px Impact", fill: "#8215C8", boundsAlignH: "center", boundsAlignV: "middle" });
				this.messageUI();
				this.end = true;
			}
		}
		if(this.eHealth <= 0 && !this.chargedUp && this.continueButton.visible == false){
			this.eHealth = 0;
			if(this.end == false){
				this.EncounterText.setText('Penciler ran out of lead!' ,{ font: "bold 32px Impact", fill: "#8215C8", boundsAlignH: "center", boundsAlignV: "middle" });
				this.messageUI();
				this.end = true;
				this.won = true;
			}
		}
		//charge condition
		if(this.chargeVal >= 10){
			if(!this.isLow){
				this.chargedUp = true;
				this.eHealth = 0;
				this.EncounterText.setText('Bapple Ifighter released its energy!' ,{ font: "bold 32px Impact", fill: "#8215C8", boundsAlignH: "center", boundsAlignV: "middle" });
				this.messageUI();
				this.continueButton.input.stop();
				this.endButton = this.add.button(720,480, 'click', this.gameWon, this);
			}
			else if(this.lowPrompt){
				this.EncounterText.setText('Bapple Ifighter cant release its energy!' ,{ font: "bold 32px Impact", fill: "#8215C8", boundsAlignH: "center", boundsAlignV: "middle" });
				this.messageUI();
				this.resetUI();
				this.lowPrompt = false;
			}
		}
		if(this.continueButton.visible == true){//stop overlapping buttons
			this.hideUI();
			this.hideAttackUI();
		}
		if(this.isTurn == false && this.continueButton.visible == false){
			this.enemyTurn();
		}
    },
	
	startBattle: function() {
		this.playButton.input.stop();
		this.playButton.visible = false;
		this.EncounterText.visible = false;
		this.setUpUI();
		this.battling = true;
	},
	
	//item, attack, run (no items for the first battle)
	setUpUI: function() {
		
		this.customerSupportButton = this.add.button( 40, 380, 'customerSupp', this.customerSupportAttack, this);
		this.customerSupportButton.visible = false;
		this.customerSupportButton.input.stop();
		this.smartPunchButton = this.add.button( 410, 490, 'smartP', this.smartPunchAttack, this);
		this.smartPunchButton.visible = false;
		this.smartPunchButton.input.stop();
		this.wrongNumberButton = this.add.button( 15, 480, 'wrongN', this.wrongNumberAttack, this);
		this.wrongNumberButton.visible = false;
		this.wrongNumberButton.input.stop();
		this.chargeButton = this.add.button( 410, 370, 'charge', this.chargeAttack, this);
		this.chargeButton.visible = false;
		this.chargeButton.input.stop();
		
		this.add.sprite(0,0,'sUi');
		this.itemButton = this.add.button( 40, 380, 'item', this.itemUI, this);
		this.attackButton = this.add.button( 410, 380, 'attack', this.attackUI, this);
		this.runButton = this.add.button( 410, 480, 'run', this.quitGame, this);
		this.mainUIVisible = true;
	},
	
	showUI: function(){
		this.itemButton.bringToTop();
		this.itemButton.visible = true;
		this.itemButton.input.start();
		this.attackButton.bringToTop();
		this.attackButton.visible = true;
		this.attackButton.input.start();
		this.runButton.bringToTop();
		this.runButton.visible = true;
		this.runButton.input.start();
		this.mainUIVisible = true;
	},
	
	hideUI: function(){
		//remove old button temporarily
		this.itemButton.visible = false;
		this.itemButton.input.stop();
		this.attackButton.visible = false;
		this.attackButton.input.stop();
		this.runButton.visible = false;
		this.runButton.input.stop();
		this.mainUIVisible = false;
	},
	
	resetUI: function() {
		//make options visible again
		this.itemButton.visible = true;
		this.itemButton.input.start();
		this.attackButton.visible = true;
		this.attackButton.input.start();
		this.runButton.visible = true;
		this.runButton.input.start();
	},
	
	itemUI: function(){
			//no items for 1st battle
		this.EncounterText.setText('You have no items!' ,{ font: "bold 32px Impact", fill: "#8215C8", boundsAlignH: "center", boundsAlignV: "middle" });
		this.messageUI();
		console.log('!');
	},
	
	attackUI: function(){
		//this.hideUI();
		//new buttons
		this.customerSupportButton.bringToTop();
		this.customerSupportButton.visible = true;
		this.customerSupportButton.input.start();
		this.smartPunchButton.bringToTop();
		this.smartPunchButton.visible = true;
		this.smartPunchButton.input.start();
		this.wrongNumberButton.bringToTop();
		this.wrongNumberButton.visible = true;
		this.wrongNumberButton.input.start();
		this.chargeButton.bringToTop();
		this.chargeButton.visible = true;
		this.chargeButton.input.start();
		
	},
	
	hideAttackUI: function(){
		this.customerSupportButton.visible = false;
		this.customerSupportButton.input.stop();
		this.smartPunchButton.visible = false;
		this.smartPunchButton.input.stop();
		this.wrongNumberButton.visible = false;
		this.wrongNumberButton.input.stop();
		this.chargeButton.visible = false;
		this.chargeButton.input.stop();
	},
	
	//Restore health
	customerSupportAttack: function(){
		this.hideAttackUI();
		if(this.healPunish == 0){
			this.healed = 100 - this.pHealth;
			this.pHealth = 100;//fully heal if first use
		}
		else{
			this.healLoss = 15*this.healPunish;
			this.healed = 100 - this.healLoss;
			if(this.healed < 0){
				this.healed = 0;
			}
			this.pHealth += this.healed;
			if(this.pHealth > 100){//player health is capped
				this.pHealth = 100;
			}
			
		}
		this.healPunish++;
		this.EncounterText.setText('Bapple Ifighter fixed a bug, restoring\n' + this.healed + ' health!' ,{ font: "bold 32px Impact", fill: "#8215C8", boundsAlignH: "center", boundsAlignV: "middle" });
		this.messageUI();
		this.resetUI();
		this.isTurn = false;
	},
	
	//Attack with random damage
	smartPunchAttack: function(){
		this.sPDamage = this.rnd.integerInRange(12, 20);
		this.sPDamage *= this.attackM;
		this.hideAttackUI();
		this.EncounterText.setText('Bapple Ifighter unleashed the power of its OS,\n dealing ' + this.sPDamage + ' damage!' ,{ font: "bold 32px Impact", fill: "#8215C8", boundsAlignH: "center", boundsAlignV: "middle" });
		this.eHealth -= this.sPDamage;
		this.messageUI();
		this.resetUI();
		this.isTurn = false;
	},
	
	//decrease enemy attack by 10%
	wrongNumberAttack: function(){
		this.damageM -= 0.25;
		this.EncounterText.setText('Bapple Ifighter called Papa Johns by accident\n confusing penciler.' ,{ font: "bold 32px Impact", fill: "#8215C8", boundsAlignH: "center", boundsAlignV: "middle" });
		this.hideAttackUI();
		this.messageUI();
		this.resetUI();
	},
	
	//Increase attack
	chargeAttack: function(){
		this.hideAttackUI();
		this.EncounterText.setText('Bapple Ifighter is approaching its final form!' ,{ font: "bold 32px Impact", fill: "#8215C8", boundsAlignH: "center", boundsAlignV: "middle" });
		this.messageUI();
		//attack animation
		this.chargeAttackImage();
		this.resetUI();
		this.chargeVal++;
		this.attackM += 0.25;
		this.isTurn = false;
	},
	
	chargeAttackImage: function(){
		//this.player.visible = false;
		if(!this.isLow){
			this.chargeSprite.visible = true;
		}
	},
	
	enemyTurn: function(){
		this.isTurnE = true;
		this.damage = this.rnd.integerInRange(12, 20);
		this.EncounterText.setText('Penciler used leadShot, dealing ' + this.damage + 'damage!');
		this.pHealth -= this.damage;
		this.messageUI();
		this.isTurn = true;
		this.damageM += .10//increase damage dealt by 10% after each turn
		if(this.pHealth < 0){
			this.pHealth = 0;
		}
	},
	
	messageUI: function(){
		this.messageScreen.bringToTop();
		this.messageScreen.visible = true;
		this.continueButton.bringToTop();
		this.EncounterText.bringToTop();
		//this.hideAttackUI();
		//this.hideUI();
		this.EncounterText.visible = true;
		this.continueButton.visible = true;
		this.continueButton.input.start();
	},
	
	hideMessageUI: function(){
		this.EncounterText.visible = false;
		this.continueButton.visible = false;
		this.messageScreen.visible = false;
		this.continueButton.input.stop();
		this.showUI();
	},
		
	//end game
    quitGame: function () {
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
		//this.music.stop();
        //  Then let's go back to the main menu.
		this.music.stop();
		this.state.start('GameOver');

    },
	//victory, go onto the next match
	gameWon: function(){
		this.music.stop();
		if(this.pHealth <= 0){
			this.state.start('GameOver');
		}
		else{
			this.state.start('BattleWon');
		}
	}
};