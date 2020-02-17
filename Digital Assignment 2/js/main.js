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
	
	var firstmove = true;
	var gameOver = false;//ends game when false
	var cursor;//input
	var player;//player object
    var game = new Phaser.Game(config);//game object
	var firstmove = true;//check for when to start sound
	var lives = 3;//player lives 0 = gameover
	var lifeText;//text displaying lives
	var music;//in game music
	var enemy;//enemy object
	var wasHit = false;
	var timer;
	var lasers;
	var shoot;
	var invincible = false;
	var invincibleTimer;
	var lastShot = 0;
	var score = 0;
	var scoreText;
	var wave = 1;//increases after spawning enemies, buffs speed
	var spawnEnemy = true;
	var spawnDebris = true;
	var enemyHit = false;
	var removeTutorial = false;
	var tutorial;
    function preload ()
    {
		this.load.image('space', 'assets/space.png');//load background
		this.load.image('player', 'assets/ship.png');//load player object
		this.load.image('debris', 'assets/debris.png');//load debris
		this.load.image('laserI', 'assets/lazer.png');
		this.load.image('enemy', 'assets/enemy.png');
		this.load.audio('music', 'assets/Intergalactic Odyssey.ogg'); //https://patrickdearteaga.com/arcade-music/
		this.load.audio('pewpew', 'assets/pewpew.mp3');//https://www.fesliyanstudios.com/royalty-free-sound-effects-download/laser-235
		this.load.audio('b00m', 'assets/ExplosionR.wav');//https://freesound.org/people/cabled_mess/sounds/350978/
	}

    function create ()
    {
		this.add.image(400,300,'space');
		
		player = this.physics.add.sprite(0,300, 'player');//create player copied from phaser tutorial)
		player.body.setAllowGravity(false);//turn off gravity for the ship
		player.setCollideWorldBounds(true);//wont fall out of screen
		cursor = this.input.keyboard.createCursorKeys();//create input check
		shoot = this.input.keyboard.addKey('S'); 
		lifeText = this.add.text(16, 16, 'Lives: 3', { fontSize: '20px', fill: '#FFFFFF' });//create text for lives left
		scoreText = this.add.text(120, 16, 'Score 0', { fontSize: '20px', fill: '#FFFFFF' });//text for score
		timer = this.time.addEvent({//https://rexrainbow.github.io/phaser3-rex-notes/docs/site/timer/ looped timer
			delay: 60000,                // ms
			loop: true
		});
		
		//create enemy objects
		debris = this.physics.add.group({//group for debris
        key: 'debris',
		allowGravity: false,
        repeat: 4,
        setXY: { x: 700, y: 90, stepY: 200, stepX: 30}
		});
		enemy = this.physics.add.group({//enemy group
        key: 'enemy',
		allowGravity: false,
        repeat: 4,
        setXY: { x: 750, y: 90, stepY: 200, }
		});
		this.physics.add.overlap(player, debris, hit, null, this);
		this.physics.add.overlap(player, enemy, hit, null, this);//hit detection
		debris.children.iterate(function (child) {//set random velocity for debris
				child.setVelocityY(Phaser.Math.FloatBetween(-10, 50));	
				child.setVelocityX(Phaser.Math.FloatBetween(-40, -80));	
		});
		enemy.children.iterate(function (child) {	//enemies move right at random speed
				child.setVelocityX(Phaser.Math.FloatBetween(-40, -80));	
		});
		lasers = this.physics.add.group({//projectile group
			defaultKey: 'laserI',
			allowGravity: false,
			setXY: {x: -500, y:-500}
		});
		lasers.createMultiple(20, 'laserI');
		this.physics.add.overlap(lasers, enemy, eHit, null, this);
		this.physics.add.overlap(lasers, debris, dHit, null, this);
		tutorial = this.add.text(175, 200, 'Controls \ns: Shoot\narrow keys: move', {fontSize: '40px', fill: '#FFFFFF'});//print text to alert player
	}

    function update ()
    {	//copied from phaser tutorial
		//console.log(player.y); //debug
		
		if(timer.getElapsedSeconds() > 5 && removeTutorial == false){
			tutorial.setText('');
			removeTutorial = true;
		}
		//console.log(invincible);
		//console.log(timer.getElapsedSeconds());
		if(lives == 0){
			gameOver = true;
			//music.stop();//stop music from playing
			lifeText.setText('GAME OVER');
			scoreText.setText('');
			this.physics.pause();
			this.add.text(175, 200, 'GAME OVER', {fontSize: '80px', fill: '#FFFFFF'});//print text to alert player
			this.add.text(175, 300, 'FINAL SCORE: ' + score,  {fontSize: '40px', fill: '#FFFFFF'});
			player.destroy();//remove object
			return;
		}
		if((shoot.isDown == true && (timer.getElapsedSeconds()-.5>lastShot)) || (lastShot == 0) && enemyHit == false){//fire lazer
			lastShot = timer.getElapsedSeconds();
			fire();
			this.sound.play('pewpew' , {volume: 0.25});
			if(firstmove){//implement sound compatible with chrome (input before audio)
				music = this.sound.add('music' , {volume: 0.5});
				music.play();
				firstmove = false;
			}
		}
		if(cursor.right.isDown && cursor.down.isDown){//diagonal movement
			player.setVelocityY(160);
			player.setVelocityX(160);
			if(firstmove){//implement sound compatible with chrome (input before audio)
				music = this.sound.add('music' , {volume: 0.5});
				music.play();
				firstmove = false;
			}
		}
		else if(cursor.left.isDown && cursor.down.isDown){
			player.setVelocityY(160);
			player.setVelocityX(-160);
			if(firstmove){//implement sound compatible with chrome (input before audio)
				music = this.sound.add('music' , {volume: 0.5});
				music.play();
				firstmove = false;
			}
		}
		else if(cursor.right.isDown && cursor.up.isDown){
			player.setVelocityY(-160);
			player.setVelocityX(160);
			if(firstmove){//implement sound compatible with chrome (input before audio)
				music = this.sound.add('music' , {volume: 0.5});
				music.play();
				firstmove = false;
			}
		}
		else if(cursor.left.isDown && cursor.up.isDown){
			player.setVelocityY(-160);
			player.setVelocityX(-160);
			if(firstmove){//implement sound compatible with chrome (input before audio)
				music = this.sound.add('music' , {volume: 0.5});
				music.play();
				firstmove = false;
			}
		}
		else if (cursor.left.isDown)//left movement
		{
			if(firstmove){//implement sound compatible with chrome (input before audio)
				music = this.sound.add('music' , {volume: 0.5});
				music.play();	
				firstmove = false;
			}
			firstmove = false;
			player.setVelocityX(-160);
			player.setVelocityY(0);
		}
		else if (cursor.right.isDown)//right movement
		{
			if(firstmove){//implement sound compatible with chrome (input before audio)
				music = this.sound.add('music' , {volume: 0.5});
				music.play();
				firstmove = false;
			}
			player.setVelocityX(160);
			player.setVelocityY(0);	
		}
		else if (cursor.up.isDown)
		{
			if(firstmove){//implement sound compatible with chrome (input before audio)
				music = this.sound.add('music' , {volume: 0.5});
				music.play();
				firstmove = false;
			}
			player.setVelocityY(-160);
		}
		else if (cursor.down.isDown)
		{
			if(firstmove){//implement sound compatible with chrome (input before audio)
				music = this.sound.add('music' , {volume: 0.5});
				music.play();
				firstmove = false;
			}
			player.setVelocityY(160);
		}
		else
		{
			player.setVelocityX(0);
			player.setVelocityY(0);
		}
		if (cursor.up.isDown && player.body.touching.down)
		{
			if(firstmove){//implement sound compatible with chrome (input before audio)
				music = this.sound.add('music' , {volume: 0.5});
				music.play();
				firstmove = false;
			}
			
		}
			debris.children.iterate(function (child) {
			if(child.x <= 0){//reset 
				child.setX(800);
				child.setY(Phaser.Math.FloatBetween(100,300));
				child.setVelocityY(Phaser.Math.FloatBetween(-10, 50));	
				child.setVelocityX(Phaser.Math.FloatBetween(-40, -80));		
			}
			if(child.y >= 560){//reset
				child.setX(800);
				child.setY(Phaser.Math.FloatBetween(100,300));
				child.setVelocityY(Phaser.Math.FloatBetween(-10, 50));	
				child.setVelocityX(Phaser.Math.FloatBetween(-40, -80));	
			}
		});
		if(invincible == true && (timer.getElapsedSeconds() >= invincibleTimer + 3)){//remove invicibility after 3 seconds
			invincible = false;
		}
		//https://www.codecaptain.io/blog/game-development/shooting-bullets-using-phaser-groups/518
		  lasers.children.each(function(b) {
            if (b.active) {
                if (b.x > 900) {
                    b.setActive(false);
                }
				else if(b.velocityX == 0){
					b.setActive(false);
				}
            }
        }.bind(this));
		//console.log(timer.getElapsedSeconds());
		//console.log(invincibleTimer);
		
		//add more enemies
		if(spawnEnemy == true){
			enemy.create(800, Phaser.Math.FloatBetween(150,450), 'enemy');
			enemy.setVelocityX(-10*wave);
			wave++;
			spawnEnemy = false;
		}
		if(spawnDebris == true){//spawn more debris
			var newDebris = debris.create(800, Phaser.Math.FloatBetween(150,450), 'debris');
			newDebris.setVelocityY(Phaser.Math.FloatBetween(-10, 50));	
			newDebris.setVelocityX(Phaser.Math.FloatBetween(-40, -80));
			spawnDebris = false;
		}
		//reset non destroyed enemies
		enemy.children.iterate(function (child) {
			if(child.x <= 0){//reset 
				child.setX(800);
				child.setY(Phaser.Math.FloatBetween(100,300));
				child.setVelocityY(Phaser.Math.FloatBetween(-10, 50));	
				child.setVelocityX(Phaser.Math.FloatBetween(-40, -80));		
			}
		})
		enemyHit = false;
    }
	
	function hit(){
		//this.destroy(player.x,player.y,'b00m');
		//this.sound.play('boom');
		if(invincible == false){//decrement lives if player is not invincible
			player.setX(60);//reset player position
			player.setY(300);
			lives--;//decrement lives and update text
			lifeText.setText('Lives: ' + lives);
			invincible = true;
			invincibleTimer = timer.getElapsedSeconds();
		}
	}
	function eHit(laserI, enemy){//enemy ship hit by laser
		enemyHit = true;
		enemy.destroy();
		//laserI.disableBody(true, true);
		laserI.destroy();
		score += 100;
		scoreText.setText('Score: ' + score);
		spawnEnemy = true;
		this.sound.play('b00m');
	}
	function dHit(laserI, debris){//enemy ship hit by laser
		debris.destroy();
		laserI.disableBody(true, true);
		score += 50;
		scoreText.setText('Score: ' + score);
		spawnDebris = true;
		this.sound.play('b00m');
	}
	function fire() {//shoot laser from player position
		//console.log(player.x + ',' + player.y);
        var laser = lasers.get(player.x, player.y);
        if (laser) {
            laser.setActive(true);
            laser.setVisible(true);
            laser.setVelocityX(200);;
        }
    }
};
