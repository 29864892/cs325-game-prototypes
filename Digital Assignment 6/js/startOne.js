"use strict";

BasicGame.startOne = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.startOne.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.music = this.add.audio('lobbyM');
		this.music.play();

		this.add.sprite(0, 0, 'screenOne');
		//this.playButton = this.add.button( 270, 390, 'playButton', this.startGame, this);
		this.time.events.add(Phaser.Timer.SECOND * 8, this.startGame, this);//https://phaser.io/examples/v2/time/basic-timed-event
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},
	
	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.music.stop();

		//	And start the actual game
		this.state.start('BattleOne');
		//this.state.start('Game');

	}

};
