"use strict";

BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		this.load.image('menu', 'Assets/MainMenu.png');
		this.load.image('playButton', 'assets/start.png');
		this.load.audio('titleMusic', ['assets/bensound-downtown.mp3']); 
		this.load.audio('gameMusic', ['assets/bensound-dubstep.mp3']);//www.bensound.com
		this.load.audio('endMusic', ['assets/f.mp3']);// https://www.fesliyanstudios.com
		this.load.image('endScreen', 'assets/laundromat.png');
		this.load.image('retry', 'assets/retry.png');
		//	+ lots of other required assets here
		//BattleOne ui Assets
		this.load.image('ui', 'assets/ui.png');
		this.load.image('sUi', 'assets/startUI.png');
		this.load.image('messageUI', 'assets/message.png');
		this.load.image('attack','assets/attack.png');
		//attacks
			this.load.image('customerSupp','assets/customerSupport.png');
			this.load.image('charge','assets/charge.png');
				this.load.image('charged', 'assets/chargedphone.png');
			this.load.image('wrongN','assets/wrongNumber.png');
			this.load.image('smartP','assets/smartPunch.png');
		//options
		this.load.image('item', 'assets/item.png');
		this.load.image('run', 'assets/run.png');
		this.load.image('click','assets/click.png');
		
		this.load.image('iFighter','assets/Phone100%.png');
		this.load.image('iFighterF','assets/phone1hp.png');
		
		this.load.image('penciler','assets/Penciler.png');
		this.load.image('pencilerF','assets/penciler1hp.png');
        //this.load.image( 'logo', 'assets/phaser.png' );
		this.load.spritesheet( 'mydude', 'assets/mydude.png', 18, 40);
		this.load.image('washer','assets/washer.png');
		this.load.image('washerXL','assets/washerXL.png');
		this.load.image('laundromat','assets/laundromat2.png');
		this.load.image('sock','assets/sock.png');
		this.load.image('shirt','assets/shirt.png');
		this.load.image('pants','assets/pants.png');
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};
