
BasicGame.GameOver = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.GameOver.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		//this.music = this.add.audio('titleMusic');
		//this.music.play();

		this.add.sprite(0, 0, 'endScreen');
		//this.add.sprite(590, 100, 'washerXL');
		this.add.text(150, 200, "Game Over", { font: "100px Verdana", fill: "#9999ff", align: "center" });
		this.playButton = this.add.button( 350, 400, 'retry', this.startGame, this);
		},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		this.state.start('MainMenu');

	}

};
