

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
		physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
        scene: {
            preload: preload,
            create: create,
            update: update
        },
		audio: {
			disableWebAudio: true
		}
    };
	
	var gameOver = false;//ends game when false
	var cursor;//input
	var platform;//objects for player to jump on
	var player;//player object
    var game = new Phaser.Game(config);//game object
	var firstmove = true;//check for when to start sound
	var lives = 3;//player lives 0 = gameover
	var lifeText;//text displaying lives
	var music;//in game music
	var enemy;//enemy object
	var explode;//explosion animation
	var wasHit = false;
	
    function preload ()
    {
		
		this.load.image('scene1', 'assets/background.png');//https://www.pinclipart.com/pindetail/iToRRR_download-clip-art-comic-explosion-transparent-clipart-comic/
		this.load.image('scene2', 'assets/scene1.png');
		this.load.image('scene3', 'assets/scene2.png');
		this.load.image('scene4', 'assets/encounter.png');
		this.load.image('scene5', 'assets/encounterTtext.png');
	}

    function create ()
    {
		this.continueButton = this.add.button( 350, 300, 'playButton', this.startGame, this);
	}

    function update ()
    {	
		
    }
	
	function hit(){
		

};
