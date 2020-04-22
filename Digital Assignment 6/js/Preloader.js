"use strict";

BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the Assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the Assets our game needs.
		//	As this is just a Project Template I've not provided these Assets, swap them for your own.
		this.load.image('menu', 'Assets/MainMenu.png');
		this.load.image('playButton', 'Assets/start.png');
		this.load.audio('titleMusic', ['Assets/Ketsa_-_11_-_Slow_Vibing.mp3']); //https://freemusicarchive.org/music/Ketsa/Raising_Frequecy/Slow_Vibing
		this.load.audio('gameMusic', ['Assets/Chad_Crouch_-_Moonrise.mp3']);//https://freemusicarchive.org/music/Chad_Crouch/Arps/Moonrise
		this.load.audio('endMusic', ['Assets/Ketsa_-_10_-_Memories_Renewed.mp3']);// https://freemusicarchive.org/music/Ketsa/Raising_Frequecy/Memories_Renewed
		this.load.audio('winMusic', 'Assets/Ultimate-Victory-WST010901.mp3');
		this.load.image('endScreen', 'Assets/trueGameOver.png');
		this.load.image('continue','Assets/continue.png');
		this.load.image('retry', 'Assets/retry.png');
		this.load.image('win','Assets/victory.png');
		//	+ lots of other required Assets here
		//startOne assets
		this.load.image('screenOne', 'Assets/transitionOne.png');
		this.load.audio('lobbyM','Assets/Dee_Yan-Key_-_14_-_Tranquility.mp3');//https://freemusicarchive.org/music/Dee_Yan-Key
		//BattleOne ui Assets
		this.load.image('ui', 'Assets/ui.png');
		this.load.image('sUi', 'Assets/startUI.png');
		this.load.image('messageUI', 'Assets/message.png');
		this.load.image('attack','Assets/attack.png');
		//attacks
			this.load.image('customerSupp','Assets/customerSupport.png');
			this.load.image('charge','Assets/charge.png');
				this.load.image('charged', 'Assets/chargedPhone.png');
			this.load.image('wrongN','Assets/wrongNumber.png');
			this.load.image('smartP','Assets/smartPunch.png');
		//options
		this.load.image('item', 'Assets/item.png');
		this.load.image('run', 'Assets/run.png');
		this.load.image('click','Assets/click.png');
		
		this.load.image('iFighter','Assets/phone100.png');
		this.load.image('iFighterF','Assets/phone1hp.png');
		
		this.load.image('penciler','Assets/penciler.png');
		this.load.image('pencilerF','Assets/penciler1hp.png');
        //BattleTwo assets
		this.load.image('screenTwo','Assets/transitionTwo.png');
		this.load.image('bBoy','Assets/Bottle boy.png');
		this.load.image('bBoyF','Assets/Bottleboy1.png"');
		this.load.audio('bBoyMusic','Assets/Subterrestrial_-_11_-_Ocean_Beach.mp3');
		//GameWon assets
		this.load.image('end','Assets/TrueEnd.png');
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
