// Create our 'main' state that will contain the game
function mainState() {}

mainState.prototype = {
  init: function(param) {
    this.meme = 0;
    if (param == "easy") {
      this.gravity = 950;
      this.speed = 2000;
    } else if (param == "hard") {
      this.gravity = 1600;
      this.speed = 1600;
    } else if (param == "meme") {
      this.gravity = -2000;
      this.speed = 1600;
      this.meme = 1;
    }
  },
  preload: function() {
    // Load the bird sprite
    if (this.meme) {
      game.load.image("bird", "assets/geneblock.jpg");
      game.load.image("mid", "assets/trojan.png");
      game.load.image("top", "assets/headtop.png");
      game.load.image("bottom", "assets/headbottom.png");
      game.load.image("background", "assets/royce.jpg");
      game.load.audio("jump", "assets/airhorn.wav");
    } else {
      game.load.image("bird", "assets/bird.png");
      game.load.image("mid", "assets/pipe.png");
      game.load.image("top", "assets/top.png");
      game.load.image("bottom", "assets/bottom.png");
      game.load.image("background", "assets/background.png");
      game.load.audio("jump", "assets/cutejump.wav");
    }
  },

  create: function() {
    game.add.tileSprite(
      0,
      0,
      window.innerWidth,
      window.innerHeight,
      "background"
    );
    game.stage.backgroundColor = "#0099fe";
    // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //   add bird
    this.bird = game.add.sprite(
      window.innerWidth / 2,
      this.meme ? 3 * window.innerHeight/4 : window.innerHeight / 4,
      "bird"
    );
    this.bird.anchor.setTo(-0.2, 0.5);
    //   create pipes
    this.pipes = game.add.group();

    // Add physics to the bird
    // Needed for: movements, gravity, collisions, etc.
    game.physics.arcade.enable(this.bird);

    // Add gravity to the bird
    this.bird.body.gravity.y = this.gravity;

    // Call the 'jump' function on spacekey
    this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.BACKWARD_SLASH);
    this.tabKey = game.input.keyboard.addKey(Phaser.Keyboard.TAB);
    this.tabKey.onDown.add(this.jump, this);
    this.score = 0;
    this.labelScore = game.add.text(window.innerWidth / 2, 50, "0", {
      font: "55px impact",
      fill: "#ffffff"
    });
    this.player1 = game.add.text(
      50,
      50,
      this.meme ? "🔥 Player 1 🔥 \n DAB" : "Player 1 \n TAB",
      {
        font: "30px impact",
        fill: "#ffffff"
      }
    );
    this.player2 = game.add.text(window.innerWidth - 250, 50, "", {
      font: "30px impact",
      fill: "#ffffff"
    });

    this.addRowOfPipes;
    this.timer = game.time.events.loop(this.speed, this.addRowOfPipes, this);

    this.jumpSound = game.add.audio("jump");
  },

  update: function() {
    // If the bird leaves the screen
    if (this.bird.angle < 20) this.bird.angle += 1;
    if (this.bird.y < 0 || this.bird.y > window.innerHeight + 10)
      this.restartGame();

    if (this.tabKey.isDown) {
      this.enterKey.onDown.add(this.jump, this);
      this.tabKey.onDown.remove(this.jump, this);
      this.player2.text = this.meme
        ? "🔥 Player 2 🔥 \n DAB"
        : "Player 2 \n BACKSLASH";
      this.player1.text = "";
    } else if (this.enterKey.isDown) {
      this.tabKey.onDown.add(this.jump, this);
      this.enterKey.onDown.remove(this.jump, this);
      this.player1.text = this.meme
        ? "🔥 Player 1 🔥 \n DAB"
        : "Player 1 \n TAB";
      this.player2.text = "";
    }
    this.score++;
    this.labelScore.text = this.score;
    game.physics.arcade.overlap(
      this.bird,
      this.pipes,
      this.restartGame,
      null,
      this
    );
  },

  jump: function() {
    // Add a vertical velocity to the bird
    this.jumpSound.play();
    this.bird.body.velocity.y = this.meme ? 300 : -300;
    game.add
      .tween(this.bird)
      .to({ angle: -17 }, 100)
      .start();
  },
  addOnePipe: function(x, y, edge) {
    // Create a pipe at the position x and y
    var pipe = game.add.sprite(x, y, edge);

    // Add the pipe to our previously created group
    this.pipes.add(pipe);

    // Enable physics on the pipe
    game.physics.arcade.enable(pipe);

    // Add velocity to the pipe to make it move left
    pipe.body.velocity.x = -200;

    // Automatically kill the pipe when it's no longer visible
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
  },
  addRowOfPipes: function() {
    // Randomly pick a number between 1 and 5
    // This will be the hole position
    var hole = Math.floor(Math.random() * 5) + 4;

    // Add the 6 pipes
    // With one big hole at position 'hole' and 'hole + 1'
    for (var i = 0; i < 20; i++) {
      if (i == hole - 2)
        this.addOnePipe(window.innerWidth - 4, i * 50, "bottom");
      if (i == hole + 2) this.addOnePipe(window.innerWidth - 4, i * 50, "top");
      if (i > hole + 2 || i < hole - 2)
        this.addOnePipe(window.innerWidth, i * 50, "mid");
    }
  },
  // Restart the game
  restartGame: function() {
    game.state.start("end", true, false, this.meme ?"🔥 420 🔥 ": this.score);
  }
};
