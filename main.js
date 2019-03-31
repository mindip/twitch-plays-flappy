// Create our 'main' state that will contain the game
var enterKey;
var tabKey;

var mainState = {
  preload: function() {
    // Load the bird sprite
    game.load.image("bird", "assets/bird.png");
    game.load.image("mid", "assets/pipe.png");
    game.load.image("top", "assets/top.png");
    game.load.image("bottom", "assets/bottom.png");
    game.load.image("background", "assets/background.png");
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
    this.bird = game.add.sprite(120, 300, "bird");
    //   create pipes
    this.pipes = game.add.group();

    // Add physics to the bird
    // Needed for: movements, gravity, collisions, etc.
    game.physics.arcade.enable(this.bird);

    // Add gravity to the bird
    this.bird.body.gravity.y = 950;

    // Call the 'jump' function on spacekey
    enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    tabKey = game.input.keyboard.addKey(Phaser.Keyboard.TAB);
    tabKey.onDown.add(this.jump, this);
    this.score = 0;
    this.labelScore = game.add.text(190, 20, "0", {
      font: "30px Arial",
      fill: "#ffffff"
    });
    this.player1 = game.add.text(20, 20, "Player 1", {
      font: "20px Arial",
      fill: "#ffffff"
    });
    this.player2 = game.add.text(20, 20, "", {
      font: "20px Arial",
      fill: "#ffffff"
    });

    this.addRowOfPipes;
    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
  },

  update: function() {
    // If the bird leaves the screen
    if (this.bird.y < 0 || this.bird.y > window.innerHeight + 10)
      this.restartGame();

    if (tabKey.isDown) {
      enterKey.onDown.add(this.jump, this);
      tabKey.onDown.remove(this.jump, this);
      this.player2.text = "Player 2";
      this.player1.text = "";
    } else if (enterKey.isDown) {
      tabKey.onDown.add(this.jump, this);
      enterKey.onDown.remove(this.jump, this);
      this.player1.text = "Player 1";
      this.player2.text = "";
    }
  },

  jump: function() {
    // Add a vertical velocity to the bird
    this.bird.body.velocity.y = -350;
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
    var hole = Math.floor(Math.random() * 6) + 1;

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
    game.state.start("main");
  }
};

var game = new Phaser.Game(window.innerWidth, window.innerHeight);
game.state.add("main", mainState);
game.state.start("main");
