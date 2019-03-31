var menuState = {
  create: function() {
    game.stage.backgroundColor = "#09f";
    this.rulesText = game.add.text(
      window.innerWidth / 2 - 400,
      window.innerHeight / 2 - 300,
      "FLAPPY BIRD COOP (TWO PLAYER) \n \n HOW TO PLAY: \n 1. Find partner \n 2. Take turns using 'tab' and 'backslash' to flap bird \n 3. WIN",
      { font: "40px Impact", fill: "#ffffff" }
    );

    this.nextText = game.add.text(
      window.innerWidth / 2 - 150,
      window.innerHeight / 2 + 100,
      "---Press Space to Continue---",
      { font: "40px Impact", fill: "#ffffff" }
    );
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.addOnce(this.start, this);
  },
  start: function() {
    game.state.start("start");
  }
};
