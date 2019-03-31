// Create our 'main' state that will contain the game

var mainState = {
  preload: function() {
    // Load the bird sprite
    game.load.image("bird", "assets/bird.png");
    game.load.image("pipe", "assets/pipe.png");
  },

  create: function() {
    game.stage.backgroundColor = "#09f";
    // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.bird = game.add.sprite(120, 100, "bird");

    // Add physics to the bird
    // Needed for: movements, gravity, collisions, etc.
    game.physics.arcade.enable(this.bird);

    // Add gravity to the bird
    this.bird.body.gravity.y = 900;

    // Call the 'jump' function on spacekey
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);
  },

  update: function() {
    // If the bird leaves the screen
    if (this.bird.y < 0 || this.bird.y > window.innerHeight + 10)
      this.restartGame();
  },

  jump: function() {
    // Add a vertical velocity to the bird
    this.bird.body.velocity.y = -350;
  },

  // Restart the game
  restartGame: function() {
    game.state.start("main");
  }
};

var game = new Phaser.Game(window.innerWidth, window.innerHeight);
game.state.add("main", mainState);
game.state.start("main");
